import { User } from "../login/interfaces";

export interface Address {
  location: string;
  _id: string;
}

export interface Contact {
  name: string;
  phoneNumber: string;
}

export interface Customer {
  _id: string;
  name: string;
  address: Address[];
  contact?: Contact;
  createdBy?: User;
  updatedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PlainCustomer {
  _id: string;
  name: string;
  createdBy: User;
  createdAt: string;
  updatedAt: string;
}
export interface CustomerBody {
  _id?: string;
  name: string;
  address: Address[];
  contact: Contact;
}

export interface UpdateCustomerBody {
  name: string;
  address: Address[];
  contact?: Contact;
}
export interface CreateCustomeBody extends UpdateCustomerBody {}
