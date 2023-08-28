import { Router } from "express";
import authenticationMiddleware from "../middlewares/authentication.middleware.js";
import { countNumberOfReportsForAddressById } from "./address.controller.js";

const addressRouter = Router();

addressRouter.get(
  "/:addressId/reports",
  authenticationMiddleware,
  countNumberOfReportsForAddressById
);
export default addressRouter;
