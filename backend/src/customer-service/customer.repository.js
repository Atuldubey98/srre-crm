import Customer from "./customer.model.js";
import {
  CustomerBodySchema,
  UpdateCustomerBody,
} from "./customer.validation.js";
import addressRepository from "./address.repository.js";
import Report from "../report-service/report.model.js";
const { createAddressList, deleteAddressUsingIds } = addressRepository();
export function getDateBeforeDays(days) {
  const today = new Date();
  const previousDate = new Date(today);
  previousDate.setDate(today.getDate() - days);
  const year = previousDate.getFullYear();
  const month = previousDate.getMonth() + 1;
  const day = previousDate.getDate();
  return `${year}-${month}-${day}`;
}

export default function customerRepository() {
  async function getCountReportforCustomerByIdForLast30Days() {
    return Report.aggregate([
      {
        $match: {
          serviceDate: {
            $gte: new Date(getDateBeforeDays(15)),
          },
        },
      },
      {
        $group: {
          _id: "$customer",
          count: {
            $sum: 1,
          },
        },
      },
      {
        $lookup: {
          from: "customers",
          localField: "_id",
          foreignField: "_id",
          as: "customer",
        },
      },
      {
        $unwind: "$customer",
      },
      {
        $project: {
          name: "$customer.name",
          count: "$count",
        },
      },
    ]);
  }
  async function getCountOfCustomers() {
    return Customer.count({});
  }
  async function getCustomerById(customerId) {
    return Customer.findById(customerId)
      .populate("createdBy", "email name role _id")
      .populate("address");
  }
  async function getAddressListByCustomerId(customerId) {
    return Customer.findById(customerId).select("address").populate("address");
  }
  async function createCustomer(customerBody) {
    try {
      const newCustomer = await CustomerBodySchema.validateAsync(customerBody);
      const { address, ...restCustomer } = newCustomer;
      const addressList = await createAddressList(address);
      const customer = new Customer({
        ...restCustomer,
        address: addressList.map((add) => add._id),
      });
      await customer.save();
      return customer.populate("address");
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
        .populate("address")
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
      const { address, ...restCustomer } = customer;
      const addressList = await createAddressList(address);
      const alreadyCustomer = await Customer.findById(id).select("address");
      const updatedCustomer = await Customer.findByIdAndUpdate(
        id,
        { ...restCustomer, address: addressList.map((add) => add._id) },
        {
          new: true,
        }
      )
        .populate("address")
        .populate("createdBy", "name email _id");
      await deleteAddressUsingIds(alreadyCustomer.address);
      return updatedCustomer;
    } catch (error) {
      throw error;
    }
  }
  async function deleteCustomerById(id) {
    try {
      const deletedCustomer = await Customer.findByIdAndDelete(id);
      return deletedCustomer;
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
    getCountOfCustomers,
    getAddressListByCustomerId,
    getCustomerById,
    deleteCustomerById,
    getCountReportforCustomerByIdForLast30Days,
  });
}
