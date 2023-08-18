import { Router } from "express";
import authenticationMiddleware from "../middlewares/authentication.middleware.js";
import {
  createServiceReportController,
  downloadServiceReportsByFilterController,
  getServiceReportsController,
  getServicesReportByIdController,
  updateServiceReportController,
  deleteReportByIdController,
  downloadServiceReportByReportId,
} from "./report.controller.js";

const reportRouter = Router();
reportRouter
  .get(
    "/download",
    authenticationMiddleware,
    downloadServiceReportsByFilterController
  )
  .post("/", authenticationMiddleware, createServiceReportController)
  .get("/", authenticationMiddleware, getServiceReportsController)
  .get("/:reportId", authenticationMiddleware, getServicesReportByIdController)
  .get("/:reportId/download", authenticationMiddleware, downloadServiceReportByReportId)
  .delete("/:reportId", authenticationMiddleware, deleteReportByIdController)
  .patch("/:reportId", authenticationMiddleware, updateServiceReportController);
export default reportRouter;
