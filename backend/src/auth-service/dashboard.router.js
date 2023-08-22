import { Router } from "express";
import authenticationMiddleware from "../middlewares/authentication.middleware.js";
import { getDashboardContentController } from "./dashboard.controller.js";

const dashboardRouter = Router();

dashboardRouter.get(
  "/",
  authenticationMiddleware,
  getDashboardContentController
);
export default dashboardRouter;
