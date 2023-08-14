import { Router } from "express";
import {
  currentUserController,
  loginUserController,
  registerAdminController,
  registerUserController,
} from "./user.controller.js";
import authenticationMiddleware from "../middlewares/authentication.middleware.js";
import authorizationMiddleware from "../middlewares/authorization.middleware.js";
const userRouter = Router();

userRouter.post("/register-su", registerAdminController);
userRouter.post(
  "/register",
  authenticationMiddleware,
  authorizationMiddleware,
  registerUserController
);
userRouter.post("/login", loginUserController);
userRouter.get("/", authenticationMiddleware, currentUserController);
export default userRouter;
