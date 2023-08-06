import { Router } from "express";
import { currentUserController, loginUserController, registerUserController } from "./user.controller.js";
import authenticationMiddleware from "../middlewares/authentication.middleware.js";
const userRouter = Router();

userRouter.post("/register", registerUserController);
userRouter.post("/login", loginUserController);
userRouter.get("/",authenticationMiddleware, currentUserController )
export default userRouter;
