import { useEffect, useState } from "react";
import AsyncSelect from "react-select/async";
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
  const promiseOptions = (value: string) => {
    return new Promise<Customer[]>(async (resolve) => {
      if (!value) {
        resolve([]);
      } else {
        const { data } = await getAllCustomerNames(value);
        setCustomers(data.data);
        resolve(data.data);
      }
    });
  };
  return customers ? (
    <div className="form__labelField d-grid">
      <label htmlFor="customer">Customer Name :*</label>
      <AsyncSelect
        defaultOptions={[]}
        isDisabled={props.customerFieldDisabled}
        loadOptions={promiseOptions}
        onChange={props.onChangeCustomerField}
        value={
          customers.find((customerItem) => customer === customerItem._id) ||
          null
        }
        getOptionLabel={(customerItem: Customer) => customerItem.name}
        getOptionValue={(customerItem: Customer) => customerItem._id}
      />
    </div>
  ) : null;
}
