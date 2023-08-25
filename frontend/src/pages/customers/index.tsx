import { lazy } from "react";
import Container from "../../common/Container";
import { PageLeftRight } from "../../common/PageLeftRight";
import PrivateRoute from "../../common/PrivateRoute";
import CustomersList from "./CustomersList";
import useCustomers from "./useCustomers";
import { useParams } from "react-router-dom";
const AboutCustomer = lazy(() => import("./AboutCustomer"));
const CustomerForm = lazy(() => import("./CustomerForm"));

export default function CustomerPage() {
  const { customers, showNewCustomerPage, showEditCustomerPage } =
    useCustomers();
  const { customerId } = useParams();
  return (
    <PrivateRoute>
      <Container>
        <PageLeftRight>
          <CustomersList customers={customers} />
          {showNewCustomerPage ? <CustomerForm /> : null}
          {showNewCustomerPage || !customerId ? null : <AboutCustomer />}
          {showEditCustomerPage ? <CustomerForm /> : null}
        </PageLeftRight>
      </Container>
    </PrivateRoute>
  );
}
