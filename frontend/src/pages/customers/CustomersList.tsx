import { IoBusinessSharp } from "react-icons/io5";
import { ListSection } from "../../common/PageLeftRight";
import CustomerItem from "./CustomerItem";
import "./CustomersList.css";
import FilterCustomers from "./FilterCustomers";
import { PlainCustomer } from "./interfaces";
import NotfoundItem from "../../common/NotfoundItem";
export type CustomersListProps = {
  customers: PlainCustomer[];
};

export default function CustomersList(props: CustomersListProps) {
  return (
    <ListSection>
      <FilterCustomers />
      {props.customers.length ? (
        <ul className="customers__list">
          {props.customers.map((customer) => (
            <CustomerItem {...customer} key={customer._id} />
          ))}
        </ul>
      ) : (
        <NotfoundItem Icon={IoBusinessSharp} message="No customers found" />
      )}
    </ListSection>
  );
}
