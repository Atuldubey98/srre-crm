import { Router } from "express";
import authenticationMiddleware from "../middlewares/authentication.middleware.js";
import {
  createServiceController,
  deleteServiceByIdController,
  getAllAirConditonerServicesByType,
  downloadAcServicesUploadTemplateController,
  uploadAcServicesTemplateController,
  getServiceByIdController,
} from "./acServices.controller.js";
import multerUpload from "../middlewares/multer.middleware.js";
const acServicesRouter = Router();

acServicesRouter.post("/", authenticationMiddleware, createServiceController);

acServicesRouter.get(
  "/template/download",
  authenticationMiddleware,
  downloadAcServicesUploadTemplateController
);
acServicesRouter.post(
  "/template/download",
  authenticationMiddleware,
  multerUpload.single("services"),
  uploadAcServicesTemplateController
);
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
