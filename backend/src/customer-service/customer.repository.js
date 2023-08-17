import Customer from "./customer.model.js";
import {
  CustomerBodySchema,
  UpdateCustomerBody,
} from "./customer.validation.js";
import Report from "../report-service/report.model.js";
export default function customerRepository() {
  async function getCustomerById(customerId) {
    return Customer.findById(customerId).populate(
      "createdBy",
      "email name role _id"
    );
  }
  async function getAddressListByCustomerId(customerId) {
    return Customer.findById(customerId).select("address");
  }
  async function createCustomer(customerBody) {
    try {
      const newCustomer = await CustomerBodySchema.validateAsync(customerBody);
      const customer = new Customer(newCustomer);
      await customer.save();
      return customer;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async function getAllCustomers(select = "", query = "") {
    try {
      const filter = query ? { $text: { $search: query } } : {};
      const customers = await Customer.find(filter)
        .populate("createdBy", "email name _id role")
        .select(select)
        .sort({ createdAt: -1 });
      return customers;
    } catch (error) {
      throw error;
    }
  }
  async function updateCustomerById(id, customerBody) {
    try {
      const customer = await UpdateCustomerBody.validateAsync(customerBody);
      const updatedCustomer = await Customer.findByIdAndUpdate(id, customer, {
        new: true,
      });
      return updatedCustomer;
    } catch (error) {
      throw error;
    }
  }
  async function deleteCustomerById(id) {
    try {
      const updatedCustomer = await Customer.findByIdAndDelete(id);
      return updatedCustomer;
    } catch (error) {
      throw error;
    }
  }
  async function findUniqueServicesUsedByCustomer(filter) {
    return Report.aggregate([
      {
        $match: filter,
      },
      {
        $unwind: "$acMetaInfo",
      },
      {
        $unwind: "$acMetaInfo.services",
      },
      {
        $group: {
          _id: "$acMetaInfo.services",
          count: {
            $sum: 1,
          },
        },
      },
      {
        $lookup: {
          from: "acservices",
          localField: "_id",
          foreignField: "_id",
          as: "_id",
        },
      },
      {
        $unwind: "$_id",
      },
      {
        $project: {
          _id: "$_id._id",
          serviceName: "$_id.serviceName",
          typeOfAC: "$_id.typeOfAC",
          createdAt: "$_id.createdAt",
          updatedAt: "$_id.updatedAt",
          noOfTimesServiceUsed: "$count",
        },
      },
    ]);
  }
  return Object.freeze({
    createCustomer,
    getAllCustomers,
    findUniqueServicesUsedByCustomer,
    updateCustomerById,
    getAddressListByCustomerId,
    getCustomerById,
    deleteCustomerById,
  });
}
