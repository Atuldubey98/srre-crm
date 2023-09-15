import { useEffect, useState } from "react";
import ReportField from "./ReportField";
import { getCustomerById } from "../customers/customersApi";
export type CustomerNameId = {
  name: string;
  _id: string;
};
export type CurrentCustomerProps = {
  customerId: string;
};
export default function CurrentCustomer(props: CurrentCustomerProps) {
  const [customer, setCustomer] = useState<CustomerNameId | null>(null);
  const { customerId } = props;

  useEffect(() => {
    (async () => {
      if (!customerId) {
        setCustomer(null);
        return;
      }
      const { data } = await getCustomerById(customerId, "name _id");
      setCustomer(data.data);
    })();
    setCustomer(null);
  }, [customerId]);
  return customer ? (
    <div className="current__customer">
      <ReportField value={customer.name} fieldName="Name" />
      <ReportField value={customer._id} fieldName="Selected Customer id" />
    </div>
  ) : null;
}
