import { Router } from "express";
import authenticationMiddleware from "../middlewares/authentication.middleware.js";
import {
  createServiceController,
  deleteServiceByIdController,
  getAllAirConditonerServicesByType,
  getServiceByIdController,
} from "./acServices.controller.js";
const acServicesRouter = Router();

acServicesRouter.post("/", authenticationMiddleware, createServiceController);
acServicesRouter.get(
  "/:serviceId",
  authenticationMiddleware,
  getServiceByIdController
);
acServicesRouter.delete(
  "/",
  authenticationMiddleware,
  deleteServiceByIdController
);
acServicesRouter.get(
  "/",
  authenticationMiddleware,
  getAllAirConditonerServicesByType
);
export default acServicesRouter;
