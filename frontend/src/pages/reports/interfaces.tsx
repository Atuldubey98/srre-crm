import { Address, Contact } from "../customers/interfaces";
import { Service } from "../services/interfaces";
import { Technician } from "../technicians/interfaces";

export type ServiceReportStatus =
  | "Complete"
  | "Incomplete"
  | "Material Pending";

export type TypeOfCall = "R&S" | "PMS";

export interface ReportFormFields {
  _id?: string;
  customer: string;
  serviceDate: string;
  customerAddress: string;
  description: string;
  status: ServiceReportStatus;
  typeOfCall: TypeOfCall;
  technician: string;
  siteContactPerson: SiteContactPerson;
  acMetaInfo: AcMetaInfo[];
}
export type SiteContactPerson = {
  identification: string;
  contactNumber: string;
};
export interface ServiceReport {
  _id?: string;
  customer: Customer;
  serviceDate: string;
  description: string;
  typeOfCall: TypeOfCall;
  customerAddress: Address;
  acMetaInfo?: AcMetaInfo[] | null;
  technician: Technician;
  siteContactPerson?: SiteContactPerson;
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
