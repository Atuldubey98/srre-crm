import { Suspense, lazy, memo } from "react";
import { useParams } from "react-router-dom";
import LoadingIndicatorAbout from "../../common/LoadingIndicatorAbout";
import { AboutSection } from "../../common/PageLeftRight";
import "./AboutCustomer.css";
import OperationBtnsGroup from "./OperationBtnsGroup";
import useSingleCustomer from "./useSingleCustomer";
const CustomerNotFound = lazy(() => import("./CustomerNotFound"));
const CustomerDetails = lazy(() => import("./CustomerDetails"));

export const CustomerReportByPieChart = lazy(
  () => import("./CustomerReportByPieChart")
);

function AboutCustomerElement() {
  const { customer, customerLoading, messageBody: error } = useSingleCustomer();
  const { customerId } = useParams();
  return (
    <AboutSection>
      <OperationBtnsGroup
        navigationUrl="/customers/new"
        operationLabel="Add new Customer"
        searchPlaceHolder="Search customer by id"
        searchUrl="/customers"
      />
      {customerLoading ? (
        <LoadingIndicatorAbout loading={customerLoading} />
      ) : customer && customer._id ? (
        <Suspense fallback={<LoadingIndicatorAbout loading={true} />}>
          <CustomerDetails customer={customer} error={error} />
        </Suspense>
      ) : customerId ? (
        <Suspense fallback={<LoadingIndicatorAbout loading={true} />}>
          <CustomerNotFound />
        </Suspense>
      ) : null}
    </AboutSection>
  );
}
const AboutCustomer = memo(AboutCustomerElement);
export default AboutCustomer;
