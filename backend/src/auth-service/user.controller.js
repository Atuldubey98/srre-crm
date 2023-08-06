import { LoginBodySchema, UserBodySchema } from "./user.validation.js";
import userRepository from "./user.repository.js";
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
