import { Router } from "express";
import authenticationMiddleware from "../middlewares/authentication.middleware.js";
import {
  currentUserController,
  loginUserController,
  registerAdminController
} from "./user.controller.js";
const userRouter = Router();

userRouter.post("/register-su", registerAdminController);
userRouter.post("/login", loginUserController);
userRouter.get("/", authenticationMiddleware, currentUserController);
export default userRouter;
