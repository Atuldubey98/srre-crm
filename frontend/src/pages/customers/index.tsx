import { Suspense, lazy } from "react";
import Container from "../../common/Container";
import LoadingIndicatorAbout from "../../common/LoadingIndicatorAbout";
import { PageLeftRight } from "../../common/PageLeftRight";
import PrivateRoute from "../../common/PrivateRoute";
import CustomersList from "./CustomersList";
import useCustomers from "./useCustomers";
const AboutCustomer = lazy(() => import("./AboutCustomer"));
const CustomerForm = lazy(() => import("./CustomerForm"));

export default function CustomerPage() {
  const { customers, showNewCustomerPage, showEditCustomerPage } =
    useCustomers();
  return (
    <PrivateRoute>
      <Container>
        <PageLeftRight>
          <CustomersList customers={customers} />
          {showNewCustomerPage ? (
            <Suspense fallback={<LoadingIndicatorAbout loading={true} />}>
              <CustomerForm />
            </Suspense>
          ) : null}
          <AboutCustomer />
          {showNewCustomerPage ? <AboutCustomer /> : null}
          {showEditCustomerPage ? (
            <Suspense fallback={<LoadingIndicatorAbout loading={true} />}>
              <CustomerForm />
            </Suspense>
          ) : null}
        </PageLeftRight>
      </Container>
    </PrivateRoute>
  );
}
