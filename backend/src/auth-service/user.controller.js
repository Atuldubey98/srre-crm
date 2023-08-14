import { SECRET_ADMIN_KEY } from "../config.js";
import { UnauthorizedError } from "../middlewares/authorization.middleware.js";
import userRepository from "./user.repository.js";
import {
  AdminBodySchema,
  LoginBodySchema,
  UserBodySchema,
} from "./user.validation.js";
const { createUser, loginUser } = userRepository();
export async function registerUserController(req, res, next) {
  try {
    const validatedUser = await UserBodySchema.validateAsync(req.body);
    await createUser(validatedUser);
    return res.status(201).json({ status: true, message: "user created" });
  } catch (error) {
    next(error);
  }
}
export async function loginUserController(req, res, next) {
  try {
    const user = await LoginBodySchema.validateAsync(req.body);
    const loginCredentials = await loginUser(user);
    return res.status(200).json({ status: true, data: loginCredentials });
  } catch (error) {
    next(error);
  }
}

export async function currentUserController(req, res, next) {
  return res.status(200).json({
    status: true,
    data: req.user,
  });
}
/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
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
