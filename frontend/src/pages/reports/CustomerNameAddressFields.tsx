import { useEffect, useState } from "react";
import Select from "react-select";
import { getAddressByCustomerId } from "../customers/customersApi";
import { Address } from "../customers/interfaces";
import SelectCustomers from "./SelectCustomers";
import { Customer } from "./interfaces";
export type CustomerNameAddressFieldsProps = {
  customer: string;
  onChangeCustomerField: (customerItem: Customer | null) => void;
  customerAddress: string;
  customerFieldDisabled?: boolean;
  onAddressChange: (address: Address | null) => void;
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
          <Select
            options={addressList}
            onChange={props.onAddressChange}
            getOptionLabel={(option: Address) => option.location}
            getOptionValue={(option: Address) => option._id}
            value={
              addressList.find((address) => address._id === customerAddress) ||
              null
            }
          />
        </div>
      ) : null}
    </>
  );
}
