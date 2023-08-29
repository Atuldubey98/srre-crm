import mongoose, { isValidObjectId } from "mongoose";
import reportRepository from "../report-service/report.repository.js";
import { generateCSVForCustomerServicesCount } from "./customer.csvgeneration.js";
import customerRepository from "./customer.repository.js";
import csvParser from "csv-parser";
import {
  CustomerIdSchema,
  CustomerNameContactSchema,
} from "./customer.validation.js";
import { CustomerBeingUsedByReportError, CustomerNotFound } from "./errors.js";
import addressRepository from "./address.repository.js";
const { createAddressList } = addressRepository();
const {
  createCustomer,
  getAllCustomers,
  updateCustomerById,
  getCustomerById,
  deleteCustomerById,
  updateCustomerByCustomerIdByAddingAddress,
  getAddressListByCustomerId,
  findUniqueServicesUsedByCustomer,
} = customerRepository();
const { getServiceReportsByCustomerId, getCountNumberOfReportsOfCustomer } =
  reportRepository();
/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function createCustomerEntityController(req, res, next) {
  try {
    const customerBody = await CustomerNameContactSchema.validateAsync(
      req.body
    );
    const customer = await createCustomer(customerBody);
    const fullCustomer = await customer.populate("createdBy");
    return res.status(200).json({ status: true, data: fullCustomer });
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
export async function createCustomerAddressesByCustomerIdController(
  req,
  res,
  next
) {
  const csvFile = req.file;
  const customerId = req.params.customerId;
  if (!csvFile || !isValidObjectId(customerId)) {
    throw new CustomerNotFound();
  }
  const results = [];
  const stream = csvParser()
    .on("data", (data) => results.push(data))
    .on("end", async () => {
      try {
        const addressList = await createAddressList(results);
        await updateCustomerByCustomerIdByAddingAddress(
          customerId,
          addressList.map((address) => address._id)
        );
        return res
          .status(201)
          .json({ status: true, message: "Customer address list updated" });
      } catch (error) {
        next(error);
      }
    })
    .on("error", (err) => {
      next(err);
    });
  stream.write(csvFile.buffer.toString("utf-8"));
  stream.end();
}
/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function downloadTemplateForCustomerAddressUploadController(
  req,
  res
) {
  const csvData = "location";
  res.setHeader("Content-Disposition", "attachment; filename=data.csv");
  res.setHeader("Content-Type", "text/csv");
  res.send(csvData);
}
export async function getCustomerServicesUsedController(req, res, next) {
  try {
    const addressListWithIds =
      typeof req.query.address === "string"
        ? req.query.address
            .split(",")
            .filter((addressItem) => isValidObjectId(addressItem))
            .map((addressItem) => new mongoose.Types.ObjectId(addressItem))
        : [];
    const customer =
      typeof req.params.customerId === "string" &&
      isValidObjectId(req.params.customerId)
        ? new mongoose.Types.ObjectId(req.params.customerId)
        : undefined;
    const fromDate = isNaN(new Date(req.query.fromDate))
      ? undefined
      : new Date(req.query.fromDate);
    const toDate = isNaN(new Date(req.query.toDate))
      ? undefined
      : new Date(req.query.toDate);
    const filter = {};
    if (addressListWithIds.length > 0) {
      filter.address = { $in: addressListWithIds };
    }

    if (customer) {
      filter.customer = customer;
    }
    if (fromDate) {
      filter.serviceDate = { ...filter.serviceDate, $gte: fromDate };
    }

    if (toDate) {
      filter.serviceDate = { ...filter.serviceDate, $lte: toDate };
    }
    const servicesGivenWithCount = await findUniqueServicesUsedByCustomer(
      filter
    );
    return res.status(200).json({ status: true, data: servicesGivenWithCount });
  } catch (error) {
    next(error);
  }
}
export async function getUniqueServicesUsedByCustomerController(
  req,
  res,
  next
) {
  try {
    const addressListWithIds =
      typeof req.query.address === "string"
        ? req.query.address
            .split(",")
            .filter((addressItem) => isValidObjectId(addressItem))
            .map((addressItem) => new mongoose.Types.ObjectId(addressItem))
        : [];
    const customer =
      typeof req.params.customerId === "string" &&
      isValidObjectId(req.params.customerId)
        ? new mongoose.Types.ObjectId(req.params.customerId)
        : undefined;
    const fromDate = isNaN(new Date(req.query.fromDate))
      ? undefined
      : new Date(req.query.fromDate);
    const toDate = isNaN(new Date(req.query.toDate))
      ? undefined
      : new Date(req.query.toDate);
    const filter = {};
    if (addressListWithIds.length > 0) {
      filter.address = { $in: addressListWithIds };
    }

    if (customer) {
      filter.customer = customer;
    }
    const customerServiceReport = customer
      ? await getCustomerById(customer)
      : null;
    if (fromDate) {
      filter.serviceDate = { ...filter.serviceDate, $gte: fromDate };
    }

    if (toDate) {
      filter.serviceDate = { ...filter.serviceDate, $lte: toDate };
    }
    const servicesGivenWithCount = await findUniqueServicesUsedByCustomer(
      filter
    );
    const csvData = generateCSVForCustomerServicesCount(
      servicesGivenWithCount,
      customerServiceReport,
      fromDate,
      toDate
    );
    res.setHeader("Content-Disposition", "attachment; filename=data.csv");
    res.setHeader("Content-Type", "text/csv");
    res.send(csvData);
  } catch (error) {
    next(error);
  }
}
export async function createCustomerController(req, res, next) {
  try {
    const newCustomer = await createCustomer({
      ...req.body,
      createdBy: req.user._id,
    });
    return res.status(201).json({
      status: true,
      data: newCustomer,
      message: "new customer created !",
    });
  } catch (error) {
    next(error);
  }
}
export async function getAllCustomersController(req, res, next) {
  try {
    const select = req.query.select || "";
    const query = typeof req.query.q === "string" ? req.query.q : "";
    const customers = await getAllCustomers(select, query);
    return res.status(200).json({ status: true, data: customers });
  } catch (error) {
    next(error);
  }
}
export async function updateCustomerByIdController(req, res, next) {
  try {
    const customerId = await CustomerIdSchema.validateAsync(
      req.params.customerId
    );
    const newCustomer = { ...req.body, updatedBy: req.user._id };
    const customer = await updateCustomerById(customerId, newCustomer);
    return res.status(200).json({ status: true, data: customer });
  } catch (error) {
    next(error);
  }
}

export async function deleteCustomerByIdController(req, res, next) {
  try {
    const customerId = req.params.customerId;
    if (!isValidObjectId(customerId)) {
      throw new CustomerNotFound();
    }
    const countOfReportsForCustomer = await getCountNumberOfReportsOfCustomer(
      customerId
    );
    const doesReportExist = countOfReportsForCustomer > 0;
    if (doesReportExist) {
      throw new CustomerBeingUsedByReportError();
    }
    await deleteCustomerById(customerId);
    return res.status(200).json({ status: true, message: "customer deleted" });
  } catch (error) {
    next(error);
  }
}

export async function getCustomerByIdController(req, res, next) {
  try {
    const customerId = await CustomerIdSchema.validateAsync(
      req.params.customerId
    );
    const customer = await getCustomerById(customerId);
    return res.status(200).json({ status: true, data: customer });
  } catch (error) {
    next(error);
  }
}
export async function getCustomerAddresssListByController(req, res, next) {
  try {
    if (!isValidObjectId(req.params.customerId)) {
      throw new CustomerNotFound();
    }
    const customer = await getAddressListByCustomerId(req.params.customerId);
    return res.status(200).json({ status: true, data: customer });
  } catch (error) {
    next(error);
  }
}

export async function getReportsOfCustomerByCustomerIdController(
  req,
  res,
  next
) {
  try {
    const customerId = req.params.customerId;
    if (!isValidObjectId(customerId)) {
      throw new CustomerNotFound();
    }
    const limit = isNaN(Number(req.query.limit)) ? 10 : Number(req.query.limit);
    const skip = isNaN(Number(req.query.skip)) ? 10 : Number(req.query.skip);
    const reportsOfCustomers = await getServiceReportsByCustomerId(
      customerId,
      limit,
      skip
    );
    return res.status(200).json({ status: true, data: reportsOfCustomers });
  } catch (error) {
    next(error);
  }
}
