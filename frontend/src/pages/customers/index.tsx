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
  const {
    customers,
    showNewCustomerPage,
    showEditCustomerPage,
    hasMore,
    loading,
    onIncrementSkip,
    onCustomerAdd,
  } = useCustomers();
  return (
    <PrivateRoute>
      <Container>
        <PageLeftRight>
          <CustomersList
            loading={loading}
            customers={customers}
            onIncrementSkip={onIncrementSkip}
            hasMore={hasMore}
          />
          {showNewCustomerPage || showEditCustomerPage ? (
            <Suspense fallback={<LoadingIndicatorAbout loading={true} />}>
              <CustomerForm onCustomerAdd={onCustomerAdd} />
            </Suspense>
          ) : (
            <AboutCustomer />
          )}
        </PageLeftRight>
      </Container>
    </PrivateRoute>
  );
}
