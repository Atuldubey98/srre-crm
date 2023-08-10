import { ChangeEventHandler, useEffect, useState } from "react";
import SelectOptions from "../../common/SelectOptions";
import {
  getAddressByCustomerId,
  getAllCustomerNames,
} from "../customers/customersApi";
import { Address } from "../customers/interfaces";
import "./CustomerFields.css";
import { Customer, SiteContactPerson } from "./interfaces";
import FormLabelField from "../../common/FormLabelField";
export type CustomerFieldsProps = {
  onChangeCustomerField: ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  >;
  customer: string;
  onChangeContactField: ChangeEventHandler<HTMLInputElement>;
  siteContactPerson: SiteContactPerson;
  customerAddress: string;
};
export default function CustomerFields(props: CustomerFieldsProps) {
  const { customer, onChangeCustomerField, customerAddress } = props;
  const [customers, setCustomers] = useState<Customer[] | null>(null);
  const [addressList, setAddressList] = useState<Address[] | null>(null);
  useEffect(() => {
    (async () => {
      const { data } = await getAllCustomerNames();
      setCustomers(data.data);
    })();
  }, []);
  useEffect(() => {
    (() => {
      (async () => {
        setAddressList(null);
        if (customer) {
          const { data } = await getAddressByCustomerId(customer);
          setAddressList(data.data.address);
        }
      })();
    })();
  }, [customer]);
  return (
    <fieldset className="field__section">
      <legend>Customer</legend>
      {customers ? (
        <div className="form__labelField d-grid">
          <label htmlFor="customer">Customer Name :</label>
          <SelectOptions
            required
            value={customer}
            onChange={onChangeCustomerField}
            name="customer"
          >
            <option value="">Please select a customer</option>
            {customers.map((customer) => (
              <option key={customer._id} value={customer._id}>
                {customer.name}
              </option>
            ))}
          </SelectOptions>
        </div>
      ) : null}
      {customer && addressList ? (
        <div className="form__labelField">
          <label htmlFor="customerAddress">Customer Address :</label>
          <SelectOptions
            required
            value={customerAddress}
            onChange={onChangeCustomerField}
            name="customerAddress"
          >
            <option value="">Please choose a address</option>
            {addressList.map((add) => (
              <option title={add.location} key={add._id} value={add._id}>
                {add.location}
              </option>
            ))}
          </SelectOptions>
        </div>
      ) : null}
      <FormLabelField
        input={{
          name: "identification",
          value: props.siteContactPerson.identification,
          onChange: props.onChangeContactField,
        }}
        label="Site Contact Person ID or Name"
      />
      <FormLabelField
        input={{
          name: "contactNumber",
          value: props.siteContactPerson.contactNumber,
          onChange: props.onChangeContactField,
        }}
        label="Site Contact Person Phone number"
      />
    </fieldset>
  );
}
