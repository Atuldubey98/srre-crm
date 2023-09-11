import { IoBusinessSharp } from "react-icons/io5";
import { ListSection } from "../../common/PageLeftRight";
import CustomerItem from "./CustomerItem";
import "./CustomersList.css";
import FilterCustomers from "./FilterCustomers";
import { PlainCustomer } from "./interfaces";
import NotfoundItem from "../../common/NotfoundItem";
import Button from "../../common/Button";
import { AiOutlineDown } from "react-icons/ai";
export type CustomersListProps = {
  customers: PlainCustomer[];
  onIncrementSkip: () => void;
  hasMore: boolean;
  loading: boolean;
};

export default function CustomersList(props: CustomersListProps) {
  const showMoreClassName = `btn btn-small d-flex-center ${
    props.loading ? "btn-loading" : ""
  }`;
  return (
    <ListSection>
      <FilterCustomers />
      <div className="customers__wrapper">
        {props.customers.length ? (
          <ul className="customers__list">
            {props.customers.map((customer) => (
              <CustomerItem {...customer} key={customer._id} />
            ))}
          </ul>
        ) : (
          <NotfoundItem Icon={IoBusinessSharp} message="No customers found" />
        )}
      </div>
      {props.hasMore ? (
        <div className="d-flex-center">
          <Button
            children={<AiOutlineDown />}
            disabled={props.loading}
            className={showMoreClassName}
            label="Show more"
            onClick={props.onIncrementSkip}
          />
        </div>
      ) : null}
    </ListSection>
  );
}
