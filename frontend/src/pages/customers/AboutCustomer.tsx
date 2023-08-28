import { Suspense, lazy, memo } from "react";
import LoadingIndicatorAbout from "../../common/LoadingIndicatorAbout";
import { AboutSection } from "../../common/PageLeftRight";
import SmallLoading from "../dashboard/SmallLoading";
import "./AboutCustomer.css";
import OperationBtnsGroup from "./OperationBtnsGroup";
import useSingleCustomer from "./useSingleCustomer";
import { useParams } from "react-router-dom";
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
        <Suspense fallback={<SmallLoading />}>
          <CustomerNotFound />
        </Suspense>
      ) : null}
    </AboutSection>
  );
}
const AboutCustomer = memo(AboutCustomerElement);
export default AboutCustomer;
