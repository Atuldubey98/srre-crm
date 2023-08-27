import { lazy } from "react";
import SummaryDetailsWrapper from "../../common/SummaryDetailsWrapper";
const ServiceReportGeneratorDownloaderForm = lazy(
  () => import("./ServiceReportGeneratorDownloaderForm")
);
export type ServiceReportListFormFields = {
  customer: string;
  customerAddress: string;
  customerFieldDisabled: boolean;
  fromDate: "";
  toDate: "";
};
export default function ServiceReportCsvGenerationForm() {
  return (
    <SummaryDetailsWrapper summaryText="Generate service report list">
      <ServiceReportGeneratorDownloaderForm />
    </SummaryDetailsWrapper>
  );
}
