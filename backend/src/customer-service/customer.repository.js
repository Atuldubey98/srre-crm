import Customer from "./customer.model.js";
import {
  CustomerNameContactSchema,
  UpdateCustomerBody,
} from "./customer.validation.js";
import addressRepository from "./address.repository.js";
import Report from "../report-service/report.model.js";
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
  async function updateCustomerByDeletingCustomerAddress(
    customerId,
    addressId
  ) {
    return Customer.findByIdAndUpdate(customerId, {
      $pull: { address: addressId },
    });
  }
  async function updateCustomerByCustomerIdByAddingAddress(
    customerId,
    addressIdsList
  ) {
    return Customer.updateOne(
      { _id: customerId },
      { $push: { address: { $each: addressIdsList } } }
    );
  }
  async function updateCustomerByAddingNewAddress(customerId, addressId) {
    return Customer.findByIdAndUpdate(customerId, {
      $push: { address: addressId },
    });
  }
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
  async function getCustomerById(customerId, select = "") {
    const query = Customer.findById(customerId);
    if (select) {
      query.select(select);
    }
    if (!select || select.indexOf("createdBy") !== -1) {
      query.populate("createdBy", "email name role _id");
    }
    if (!select || select.indexOf("address") !== -1) {
      query.populate("address");
    }
    return query.exec();
  }
  async function getAddressListByCustomerId(customerId) {
    return Customer.findById(customerId).select("address").populate("address");
  }
  async function createCustomer(customerBody) {
    try {
      const newCustomer = await CustomerNameContactSchema.validateAsync(
        customerBody
      );
      const customer = new Customer(newCustomer);
      await customer.save();
      return (await customer.populate("address")).populate(
        "createdBy",
        "name email _id"
      );
    } catch (error) {
      throw error;
    }
  }
  async function getAllCustomers({
    select = "",
    query = "",
    limit = 10,
    skip = 0,
  }) {
    try {
      const filter = query ? { $text: { $search: query } } : {};
      console.log(skip, limit);
      const customers = await Customer.find(filter)
        .select(select)
        .skip(skip)
        .limit(limit)
        .populate("createdBy", "email name _id role")
        .populate("address");
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
      })
        .populate("address")
        .populate("createdBy", "name email _id");
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
    updateCustomerByAddingNewAddress,
    getAddressListByCustomerId,
    getCustomerById,
    updateCustomerByDeletingCustomerAddress,
    deleteCustomerById,
    updateCustomerByCustomerIdByAddingAddress,
    getCountReportforCustomerByIdForLast30Days,
  });
}
