import instance from "../../instance";
import { CreateServiceBody } from "./interfaces";

export const getAllServices = (typeOfAC: string) => {
  return instance.get(`/api/v1/services`, {
    params: {
      typeOfAC,
    },
  });
};

export const getServiceById = (serviceId: string) => {
  return instance.get(`/api/v1/services/${serviceId}`);
};
export const deleteServiceById = (serviceIds: string) => {
  return instance.delete(`/api/v1/services`, {
    params: {
      serviceIds,
    },
  });
};

export const createNewService = (service: CreateServiceBody) => {
  return instance.post("/api/v1/services", service);
};
