import { isValidObjectId } from "mongoose";
import reportRepository from "../report-service/report.repository.js";
import addressRepository from "./address.repository.js";
import { AddressNotFound } from "./errors.js";
const { getAddressById } = addressRepository();
const { getCountNumberOfReportsOfCustomerByAddressId } = reportRepository();

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function countNumberOfReportsForAddressById(req, res, next) {
  try {
    const customerAddressId = req.params.addressId;
    if (!isValidObjectId(customerAddressId)) {
      return res
        .status(200)
        .json({ status: true, data: { canBeDeleted: true, count: 0 } });
    }
    const address = await getAddressById(customerAddressId);
    if (!address) {
      throw new AddressNotFound();
    }
    const count = await getCountNumberOfReportsOfCustomerByAddressId(
      customerAddressId
    );
    return res
      .status(200)
      .json({ status: true, data: { canBeDeleted: count === 0, count } });
  } catch (error) {
    next(error);
  }
}
