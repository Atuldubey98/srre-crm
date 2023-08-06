import { ListSection } from "../../common/PageLeftRight";
import CustomerItem from "./CustomerItem";
import "./CustomersList.css";
import FilterCustomers from "./FilterCustomers";
import { PlainCustomer } from "./interfaces";
export type CustomersListProps = {
  customers: PlainCustomer[];
};

export default function CustomersList(props: CustomersListProps) {
  return (
    <ListSection>
      <FilterCustomers />
      <ul className="customers__list">
        {props.customers.map((customer) => (
          <CustomerItem {...customer} key={customer._id} />
        ))}
      </ul>
    </ListSection>
  );
}
