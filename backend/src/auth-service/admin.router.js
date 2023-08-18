import { Router } from "express";
import authorizationMiddleware from "../middlewares/authorization.middleware.js";
import {
  deleteEmployeeByIdController,
  getAllEmployeesController,
  getEmployeeByIdController,
  registerUserController,
} from "./user.controller.js";
import authenticationMiddleware from "../middlewares/authentication.middleware.js";

const adminRouter = Router();
adminRouter.get(
  "/users",
  authenticationMiddleware,
  authorizationMiddleware,
  getAllEmployeesController
);
adminRouter.post(
  "/users/register",
  authenticationMiddleware,
  authorizationMiddleware,
  registerUserController
);
adminRouter.get(
  "/users/:userId",
  authenticationMiddleware,
  authorizationMiddleware,
  getEmployeeByIdController
);
adminRouter.delete(
  "/users/:userId",
  authenticationMiddleware,
  authorizationMiddleware,
  deleteEmployeeByIdController
);
export default adminRouter;
