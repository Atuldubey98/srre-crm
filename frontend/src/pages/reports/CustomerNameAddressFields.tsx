import { ChangeEventHandler, useEffect, useState } from "react";
import SelectOptions from "../../common/SelectOptions";
import {
  getAddressByCustomerId
} from "../customers/customersApi";
import { Address } from "../customers/interfaces";
import SelectCustomers from "./SelectCustomers";
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
  const [addressList, setAddressList] = useState<Address[] | null>(null);
 
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
      <SelectCustomers
        customer={customer}
        onChangeCustomerField={onChangeCustomerField}
        customerFieldDisabled={props.customerFieldDisabled}
      />
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
