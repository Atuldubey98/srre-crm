export interface Customer {
  _id?: string;
  name: string;
  address: Address[];
  contact?: Contact;
  createdBy?: User;
  updatedBy?: string;
  createdAt: string;
  updatedAt: string;
}
export interface User {
  email: string;
  _id: string;
  name: string;
  role: "EMPLOYEE" | "ADMIN";
}
export interface Address {
  location: string;
  _id: string;
}
export interface Contact {
  name: string;
  phoneNumber: string;
}
