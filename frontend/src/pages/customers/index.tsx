import Container from "../../common/Container";
import { PageLeftRight } from "../../common/PageLeftRight";
import AboutCustomer from "./AboutCustomer";
import CustomersList from "./CustomersList";
import CustomerForm from "./CustomerForm";
import useCustomers from "./useCustomers";
import PrivateRoute from "../../common/PrivateRoute";

export default function CustomerPage() {
  const {
    customers,
    customer,
    showNewCustomerPage,
    showEditCustomerPage,
    onSetCustomer,
  } = useCustomers();

  return (
    <PrivateRoute>
      <Container>
        <PageLeftRight>
          <CustomersList customers={customers} />
          {showNewCustomerPage ? (
            <CustomerForm onSetCustomer={onSetCustomer} />
          ) : null}
          {showNewCustomerPage ? null : <AboutCustomer customer={customer} />}
          {showEditCustomerPage || typeof showEditCustomerPage === undefined ? (
            <CustomerForm customer={customer} onSetCustomer={onSetCustomer} />
          ) : null}
        </PageLeftRight>
      </Container>
    </PrivateRoute>
  );
}
