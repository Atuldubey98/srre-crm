import instance from "../../instance";
import { TechnicianBody } from "./interfaces";

export const getAllTechnicials = () => {
  return instance.get("/api/v1/technicians");
};
export const getAllTechnicianById = (technicianId: string) => {
  return instance.get(`/api/v1/technicians/${technicianId}`);
};

export const createNewTechnician = (technician: TechnicianBody) => {
  return instance.post("/api/v1/technicians", technician);
};

export const udpateNewTechnician = (
  technician: TechnicianBody,
  technicianId: string
) => {
  return instance.patch(`/api/v1/technicians/${technicianId}`, technician);
};
