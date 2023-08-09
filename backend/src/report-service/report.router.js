import { Router } from "express";
import authenticationMiddleware from "../middlewares/authentication.middleware.js";
import {
  createServiceReportController,
  getServiceReportsController,
  getServicesReportByIdController,
} from "./report.controller.js";

const reportRouter = Router();
reportRouter.post("/", authenticationMiddleware, createServiceReportController);
reportRouter.get("/", authenticationMiddleware, getServiceReportsController);
reportRouter.get(
  "/:reportId",
  authenticationMiddleware,
  getServicesReportByIdController
);
export default reportRouter;
