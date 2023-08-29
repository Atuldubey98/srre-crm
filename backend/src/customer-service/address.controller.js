import { isValidObjectId } from "mongoose";
import reportRepository from "../report-service/report.repository.js";
import addressRepository from "./address.repository.js";
import customerRepository from "./customer.repository.js";
import { AddressNotFound, CustomerNotFound } from "./errors.js";
import { CustomerAddressSchema } from "./customer.validation.js";
const { getAddressById, updateAddressById, deleteAddressById, createAddress } =
  addressRepository();
const {
  updateCustomerByDeletingCustomerAddress,
  updateCustomerByAddingNewAddress,
} = customerRepository();
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

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function updateAddressByAddressIdController(req, res, next) {
  try {
    const customerAddress = await CustomerAddressSchema.validateAsync(req.body);
    const addressId = req.params.addressId;
    if (!isValidObjectId(addressId)) {
      throw new AddressNotFound();
    }
    const updatedCustomerAddress = await updateAddressById(
      addressId,
      customerAddress
    );
    console.log(updatedCustomerAddress);
    if (!updatedCustomerAddress) {
      throw new AddressNotFound();
    }
    return res.status(200).json({ status: true, data: updatedCustomerAddress });
  } catch (error) {
    next(error);
  }
}

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function deleteAddressByIdController(req, res, next) {
  try {
    const customerId = req.params.customerId;
    const addressId = req.params.addressId;
    if (!customerId) {
      throw new CustomerNotFound();
    }
    if (!addressId) {
      throw new AddressNotFound();
    }
    const updatedCustomer = await updateCustomerByDeletingCustomerAddress(
      customerId,
      addressId
    );
    if (!updatedCustomer) {
      throw new CustomerNotFound();
    }

    const deletedCustomerAddress = await deleteAddressById(addressId);
    if (!deletedCustomerAddress) {
      throw new AddressNotFound();
    }
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
}

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */

export async function createAddressController(req, res, next) {
  try {
    const customerAddress = await CustomerAddressSchema.validateAsync(req.body);
    const customerId = req.params.customerId;
    if (!isValidObjectId(customerId)) {
      throw new CustomerNotFound();
    }
    const newAddress = await createAddress(customerAddress);
    const updatedCustomer = await updateCustomerByAddingNewAddress(
      customerId,
      newAddress._id
    );

    if (!updatedCustomer) {
      throw new CustomerNotFound();
    }
    return res
      .status(201)
      .json({ status: true, message: "New address created", data: newAddress });
  } catch (error) {
    next(error);
  }
}
