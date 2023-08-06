import { Router } from "express";
import authenticationMiddleware from "../middlewares/authentication.middleware.js";
import {
  getAllTechniciansController,
  getTechnicianByIdController,
  updateTechnicianByIdController,
  createTechnicianController,
} from "./technician.controller.js";

const technicianRouter = Router();
technicianRouter
  .get("/", authenticationMiddleware, getAllTechniciansController)
  .get("/:technicianId", authenticationMiddleware, getTechnicianByIdController)
  .patch(
    "/:technicianId",
    authenticationMiddleware,
    updateTechnicianByIdController
  )
  .post("/", authenticationMiddleware, createTechnicianController);
export default technicianRouter;
