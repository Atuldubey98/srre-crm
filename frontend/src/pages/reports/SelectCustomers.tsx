import { useEffect, useState } from "react";
import Select from "react-select";
import { getAllCustomerNames } from "../customers/customersApi";
import { Customer } from "./interfaces";
export type SelectCustomersProps = {
  customerFieldDisabled?: boolean;
  customer: string;
  onChangeCustomerField: (customerItem: Customer | null) => void;
};
export default function SelectCustomers(props: SelectCustomersProps) {
  const [customers, setCustomers] = useState<Customer[] | null>(null);
  const { customer } = props;
  useEffect(() => {
    (async () => {
      const { data } = await getAllCustomerNames();
      setCustomers(data.data);
    })();
  }, []);
  return customers ? (
    <div className="form__labelField d-grid">
      <label htmlFor="customer">Customer Name :*</label>
      <Select
        name="customer"
        isDisabled={props.customerFieldDisabled}
        value={
          customers.find((customerItem) => customer === customerItem._id) ||
          null
        }
        onChange={props.onChangeCustomerField}
        getOptionLabel={(customerItem: Customer) => customerItem.name}
        getOptionValue={(customerItem: Customer) => customerItem._id}
        options={customers}
      />
    </div>
  ) : null;
}
