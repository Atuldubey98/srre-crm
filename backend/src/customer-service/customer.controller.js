import customerRepository from "./customer.repository.js";
import { CustomerIdSchema } from "./customer.validation.js";
const {
  createCustomer,
  getAllCustomers,
  updateCustomerById,
  getCustomerById,
  deleteCustomerById,
} = customerRepository();
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
    const customerId = await CustomerIdSchema.validateAsync(
      req.params.customerId
    );
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
