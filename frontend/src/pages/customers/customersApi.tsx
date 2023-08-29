import instance from "../../instance";
import { CustomerServicesUsedCsvGeneratorFormFields } from "../reports/CustomerServicesUsedCsvGenerator";
import { CustomerNameContact } from "./CustomerForm";
import { Address } from "./interfaces";

export function getCustomerServicesCount(
  fields: CustomerServicesUsedCsvGeneratorFormFields
) {
  const { customer, ...params } = fields;
  const url = customer
    ? `/api/v1/customers/${customer}/services`
    : `/api/v1/customers/services`;
  return instance.get(url, {
    params,
  });
}

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
export const updateAddressOfCustomerByAddressId = (
  addressId: string,
  customerId: string,
  address: Address
) => {
  return instance.patch(
    `/api/v1/customers/${customerId}/address/${addressId}`,
    { location: address.location }
  );
};
export const getCustomerById = (customerId: string) => {
  return instance.get(`/api/v1/customers/${customerId}`);
};
export const getAddressByCustomerId = (customerId: string) => {
  return instance.get(`/api/v1/customers/${customerId}/address`);
};
export const addCustomerAddressByCustomerId = (
  customerId: string,
  address: Address
) => {
  return instance.post(`/api/v1/customers/${customerId}/address`, {
    location: address.location,
  });
};
export const deleteCustomerById = (customerId: string) => {
  return instance.delete(`/api/v1/customers/${customerId}`);
};
export const updateCustomerById = (
  customerId: string,
  customerNameContact: CustomerNameContact
) => {
  return instance.patch(`/api/v1/customers/${customerId}`, {
    name: customerNameContact.name,
    contact: {
      name: customerNameContact.contactName,
      phoneNumber: customerNameContact.contactPhoneNumber,
    },
  });
};
export const deleteCustomerAddressById = (
  customerId: string,
  addressId: string
) => {
  return instance.delete(
    `/api/v1/customers/${customerId}/address/${addressId}`
  );
};
export const addNewCustomer = (customerNameContact: CustomerNameContact) => {
  return instance.post(`/api/v1/customers`, {
    name: customerNameContact.name,
    contact: {
      name: customerNameContact.contactName,
      phoneNumber: customerNameContact.contactPhoneNumber,
    },
  });
};

export const getCountOfReportsByAddressId = (addressId: string) => {
  return instance.get(`/api/v1/address/${addressId}/reports`);
};
