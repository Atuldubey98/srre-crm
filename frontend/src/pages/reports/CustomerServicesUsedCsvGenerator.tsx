import { lazy } from "react";
import SummaryDetailsWrapper from "../../common/SummaryDetailsWrapper";
const CustomerServicesUsedCsvGeneratorForm = lazy(
  () => import("./CustomerServicesUsedCsvGeneratorForm")
);
import "./CustomerServicesUsedCsvGenerator.css";
export type CustomerServicesUsedCsvGeneratorFormFields = {
  customer: string;
  fromDate: string;
  toDate: string;
  allCustomers: boolean;
};
export default function CustomerServicesUsedCsvGenerator() {
  return (
    <SummaryDetailsWrapper summaryText="Services being used by Customer">
      <CustomerServicesUsedCsvGeneratorForm />
    </SummaryDetailsWrapper>
  );
}
