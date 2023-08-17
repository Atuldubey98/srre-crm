import { ChangeEventHandler, useEffect, useState } from "react";
import SelectOptions from "../../common/SelectOptions";
import { Customer } from "./interfaces";
import { getAllCustomerNames } from "../customers/customersApi";
export type SelectCustomersProps = {
  customerFieldDisabled?: boolean;
  customer: string;
  onChangeCustomerField: ChangeEventHandler<HTMLSelectElement>;
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
      <SelectOptions
        disabled={props.customerFieldDisabled}
        required
        value={customer}
        onChange={props.onChangeCustomerField}
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
  ) : null;
}
