import { lazy } from "react";
import SummaryDetailsWrapper from "../../common/SummaryDetailsWrapper";
const UploadServicesSteps = lazy(() => import("./UploadServicesSteps"));
export default function UploadServices() {
  return (
    <SummaryDetailsWrapper summaryText="Upload services offered (csv file)">
      <UploadServicesSteps />
    </SummaryDetailsWrapper>
  );
}
