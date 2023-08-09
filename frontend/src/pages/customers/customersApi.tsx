import instance from "../../instance";
import { CreateCustomeBody, UpdateCustomerBody } from "./interfaces";

export const getAllCustomers = (search = "") => {
  return instance.get("/api/v1/customers", {
    params: {
      select: "address name createdAt createdBy updatedAt",
      q: search,
    },
  });
};
export const getAllCustomerNames = (search = "") => {
  return instance.get("/api/v1/customers", {
    params: {
      select: "name",
      q: search,
    },
  });
};
export const getCustomerById = (customerId: string) => {
  return instance.get(`/api/v1/customers/${customerId}`);
};
export const getAddressByCustomerId = (customerId: string) => {
  return instance.get(`/api/v1/customers/${customerId}/address`);
};
export const deleteCustomerById = (customerId: string) => {
  return instance.delete(`/api/v1/customers/${customerId}`);
};
export const updateCustomerById = (
  customerId: string,
  customerBody: UpdateCustomerBody
) => {
  return instance.patch(`/api/v1/customers/${customerId}`, {
    ...customerBody,
    address: customerBody.address.map((add) => ({
      location: add.location,
    })),
    contact:
      customerBody.contact?.name || customerBody.contact?.phoneNumber
        ? customerBody.contact
        : undefined,
  });
};
export const addNewCustomer = (customer: CreateCustomeBody) => {
  return instance.post(`/api/v1/customers`, {
    ...customer,
    address: customer.address.map((add) => ({
      location: add.location,
    })),
    contact:
      customer.contact?.name || customer.contact?.phoneNumber
        ? customer.contact
        : undefined,
  });
};
