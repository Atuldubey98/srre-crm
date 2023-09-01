import { useEffect, useState } from "react";
import Select from "react-select";
import { getAddressByCustomerId } from "../customers/customersApi";
import { Address } from "../customers/interfaces";
import SelectCustomers from "./SelectCustomers";
import { Customer } from "./interfaces";
import { Link } from "react-router-dom";
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
      {!customer || !addressList ? null : addressList.length ? (
        <div className="form__labelField">
          <label htmlFor="customerAddress">Customer Address :</label>
          <Select
            required
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
      ) : (
        <Link to={`/customers/${customer}/edit`}>
          Add address for this customer
        </Link>
      )}
    </>
  );
}
