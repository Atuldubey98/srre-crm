import { useState, useEffect, ChangeEventHandler } from "react";
import {
  getAllCustomerNames,
  getAddressByCustomerId,
} from "../customers/customersApi";
import { Address } from "../customers/interfaces";
import { Customer } from "./interfaces";
import SelectOptions from "../../common/SelectOptions";
export type CustomerNameAddressFieldsProps = {
  customer: string;
  onChangeCustomerField: ChangeEventHandler<HTMLSelectElement>;
  customerAddress: string;
  customerFieldDisabled?: boolean;
  customeAddressFieldRequired?: boolean;
};
export default function CustomerNameAddressFields(
  props: CustomerNameAddressFieldsProps
) {
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
    <>
      {customers ? (
        <div className="form__labelField d-grid">
          <label htmlFor="customer">Customer Name :</label>
          <SelectOptions
            disabled={props.customerFieldDisabled}
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
            required={props.customeAddressFieldRequired}
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
    </>
  );
}
