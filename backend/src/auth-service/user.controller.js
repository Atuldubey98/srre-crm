import { isValidObjectId } from "mongoose";
import { SECRET_ADMIN_KEY } from "../config.js";
import { UnauthorizedError } from "../middlewares/authorization.middleware.js";
import userRepository from "./user.repository.js";
import {
  AdminBodySchema,
  LoginBodySchema,
  UserBodySchema,
} from "./user.validation.js";
import { EmployeeNotFound } from "./errors.js";
const {
  createUser,
  loginUser,
  getAllEmployees,
  getEmployeeById,
  deleteEmployeeById,
} = userRepository();

/**
 * register user controller
 * @type {import("express").Handler}
 */
export async function registerUserController(req, res, next) {
  try {
    const validatedUser = await UserBodySchema.validateAsync(req.body);
    const { email, name, role, _id } = await createUser(validatedUser);
    return res.status(201).json({
      status: true,
      message: "User registerd successfully",
      data: {
        email,
        name,
        role,
        _id,
      },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * login user controller
 * @type {import("express").Handler}
 */
export async function loginUserController(req, res, next) {
  try {
    const user = await LoginBodySchema.validateAsync(req.body);
    const loginCredentials = await loginUser(user);
    return res.status(200).json({ status: true, data: loginCredentials });
  } catch (error) {
    next(error);
  }
}

/**
 * getting the logged in user
 * @type {import("express").Handler}
 */
export async function currentUserController(req, res, next) {
  return res.status(200).json({
    status: true,
    data: req.user,
  });
}
/**
 * registering the admin controller
 * @type {import("express").Handler}
 */
export async function registerAdminController(req, res, next) {
  try {
    const adminCreds = await AdminBodySchema.validateAsync(req.body);
    const { secretKey, ...user } = adminCreds;
    if (secretKey !== SECRET_ADMIN_KEY) {
      throw new UnauthorizedError();
    }
    await createUser({ ...user, role: "ADMIN" });
    return res
      .status(201)
      .json({ status: true, data: `Admin registered successfully` });
  } catch (error) {
    next(error);
  }
}

/**
 * getting all the employees controller
 * @type {import("express").Handler}
 */
export async function getAllEmployeesController(req, res, next) {
  try {
    const employees = await getAllEmployees();
    return res.status(200).json({ status: true, data: employees });
  } catch (error) {
    next(error);
  }
}

/**
 * getting employee by id controller
 * @type {import("express").Handler}
 */
export async function getEmployeeByIdController(req, res, next) {
  try {
    if (!isValidObjectId(req.params.userId)) {
      throw new EmployeeNotFound();
    }
    const employee = await getEmployeeById(req.params.userId);
    return res.status(200).json({ status: true, data: employee });
  } catch (error) {
    next(error);
  }
}
/**
 * delete employee by id controller
 * @type {import("express").Handler}
 */
export async function deleteEmployeeByIdController(req, res, next) {
  try {
    if (!isValidObjectId(req.params.userId)) {
      throw new EmployeeNotFound();
    }
    const employee = await deleteEmployeeById(req.params.userId);
    if (!employee) {
      throw new EmployeeNotFound();
    }
    return res.status(200).json({ status: true, data: employee });
  } catch (error) {
    next(error);
  }
}
