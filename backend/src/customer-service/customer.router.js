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
  downloadTemplateForCustomerAddressUploadController,
  createCustomerAddressesByCustomerIdController,
} from "./customer.controller.js";
import authenticationMiddleware from "../middlewares/authentication.middleware.js";
import multerUpload from "../middlewares/multer.middleware.js";
import {
  createAddressController,
  deleteAddressByIdController,
  updateAddressByAddressIdController,
} from "./address.controller.js";

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
  .get("/services", authenticationMiddleware, getCustomerServicesUsedController)
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
customerRouter.post(
  "/:customerId/address",
  authenticationMiddleware,
  createAddressController
);
customerRouter.patch(
  "/:customerId/address/:addressId",
  authenticationMiddleware,
  updateAddressByAddressIdController
);
customerRouter.delete(
  "/:customerId/address/:addressId",
  authenticationMiddleware,
  deleteAddressByIdController
);
customerRouter.post(
  "/:customerId/address/template",
  authenticationMiddleware,
  multerUpload.single("addressList"),
  createCustomerAddressesByCustomerIdController
);
customerRouter.get(
  "/address/template",
  authenticationMiddleware,
  downloadTemplateForCustomerAddressUploadController
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
