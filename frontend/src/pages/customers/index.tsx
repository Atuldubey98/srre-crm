import { lazy } from "react";
import Container from "../../common/Container";
import { PageLeftRight } from "../../common/PageLeftRight";
import PrivateRoute from "../../common/PrivateRoute";
import CustomersList from "./CustomersList";
import useCustomers from "./useCustomers";
import CustomerForm from "./CustomerForm";
const AboutCustomer = lazy(() => import("./AboutCustomer"));

export default function CustomerPage() {
  const { customers, showNewCustomerPage, showEditCustomerPage } =
    useCustomers();
  return (
    <PrivateRoute>
      <Container>
        <PageLeftRight>
          <CustomersList customers={customers} />
          {showNewCustomerPage || showEditCustomerPage ? (
            <CustomerForm />
          ) : (
            <AboutCustomer />
          )}
        </PageLeftRight>
      </Container>
    </PrivateRoute>
  );
}
