import { Suspense, lazy } from "react";
import Container from "../../common/Container";
import { PageLeftRight } from "../../common/PageLeftRight";
import PrivateRoute from "../../common/PrivateRoute";
import CustomersList from "./CustomersList";
import useCustomers from "./useCustomers";
import { useParams } from "react-router-dom";
import LoadingIndicatorAbout from "../../common/LoadingIndicatorAbout";
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
          {showNewCustomerPage ? (
            <Suspense fallback={<LoadingIndicatorAbout loading={true} />}>
              <CustomerForm />
            </Suspense>
          ) : null}
          {showNewCustomerPage || !customerId ? null : (
            <Suspense fallback={<LoadingIndicatorAbout loading={true} />}>
              <AboutCustomer />
            </Suspense>
          )}
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
