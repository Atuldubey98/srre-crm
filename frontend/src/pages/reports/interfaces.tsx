import { Address, Contact } from "../customers/interfaces";
import { Service } from "../services/interfaces";
import { Technician } from "../technicians/interfaces";

export type ServiceReportStatus =
  | "Complete"
  | "Incomplete"
  | "Material Pending";

export interface ServiceReport {
  _id?: string;
  customer: Customer;
  serviceDate: string;
  customerAddress: Address;
  acMetaInfo?: AcMetaInfo[] | null;
  technician: Technician;
  siteContact?: Contact;
  status: ServiceReportStatus;
}
export interface Customer {
  _id: string;
  name: string;
  contact: Contact;
}

export interface AcMetaInfo {
  tonnage: string;
  _id?: string;
  modelNumber: string;
  typeOfAC: string;
  services?: Service[] | null;
}
