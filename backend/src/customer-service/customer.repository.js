import Customer from "./customer.model.js";
import {
  CustomerBodySchema,
  UpdateCustomerBody,
} from "./customer.validation.js";
export default function customerRepository() {
  async function getCustomerById(customerId) {
    return Customer.findById(customerId).populate(
      "createdBy",
      "email name role _id"
    );
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
        .select(select);
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
  return Object.freeze({
    createCustomer,
    getAllCustomers,
    updateCustomerById,
    getCustomerById,
    deleteCustomerById,
  });
}
