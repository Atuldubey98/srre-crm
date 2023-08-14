import { lazy } from "react";
import Container from "../../common/Container";
import { PageLeftRight } from "../../common/PageLeftRight";
import PrivateRoute from "../../common/PrivateRoute";
import CustomersList from "./CustomersList";
import useCustomers from "./useCustomers";
const AboutCustomer = lazy(() => import("./AboutCustomer"));
const CustomerForm = lazy(() => import("./CustomerForm"));

export default function CustomerPage() {
  const {
    customers,
    customer,
    showNewCustomerPage,
    showEditCustomerPage,
    onSetCustomer,
    customerLoading,
    message,
  } = useCustomers();

  return (
    <PrivateRoute>
      <Container>
        <PageLeftRight>
          <CustomersList customers={customers} />
          {showNewCustomerPage ? (
            <CustomerForm onSetCustomer={onSetCustomer} />
          ) : null}
          {showNewCustomerPage ? null : (
            <AboutCustomer
              customer={customer}
              customerLoading={customerLoading}
              message={message}
            />
          )}
          {showEditCustomerPage ? (
            <CustomerForm customer={customer} onSetCustomer={onSetCustomer} />
          ) : null}
        </PageLeftRight>
      </Container>
    </PrivateRoute>
  );
}
