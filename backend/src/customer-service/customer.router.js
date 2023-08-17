import { Router } from "express";
import {
  createCustomerController,
  deleteCustomerByIdController,
  getAllCustomersController,
  getCustomerAddresssListByController,
  getUniqueServicesUsedByCustomerController,
  getCustomerByIdController,
  getCustomerServicesUsedController,
  updateCustomerByIdController,
  getReportsOfCustomerByCustomerIdController,
} from "./customer.controller.js";
import authenticationMiddleware from "../middlewares/authentication.middleware.js";

const customerRouter = Router();

customerRouter.post("/", authenticationMiddleware, createCustomerController);
customerRouter.get("/", authenticationMiddleware, getAllCustomersController);
customerRouter
  .get(
    "/:customerId/services",
    authenticationMiddleware,
    getCustomerServicesUsedController
  )
  .get(
    "/:customerId/services/download",
    authenticationMiddleware,
    getUniqueServicesUsedByCustomerController
  );
customerRouter
  .get(
    "/services",
    authenticationMiddleware,
    getCustomerServicesUsedController
  )
  .get(
    "/services/download",
    authenticationMiddleware,
    getUniqueServicesUsedByCustomerController
  );
customerRouter.get(
  "/:customerId/address",
  authenticationMiddleware,
  getCustomerAddresssListByController
);

customerRouter.get(
  "/:customerId/service-reports",
  authenticationMiddleware,
  getReportsOfCustomerByCustomerIdController
);
customerRouter.get(
  "/:customerId",
  authenticationMiddleware,
  getCustomerByIdController
);

customerRouter.patch(
  "/:customerId",
  authenticationMiddleware,
  updateCustomerByIdController
);
customerRouter.delete(
  "/:customerId",
  authenticationMiddleware,
  deleteCustomerByIdController
);

export default customerRouter;
