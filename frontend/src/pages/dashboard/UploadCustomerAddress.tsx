import { lazy } from "react";
import SummaryDetailsWrapper from "../../common/SummaryDetailsWrapper";
import "./UploadCustomerAddress.css";
const UploadCustomerAddressSteps = lazy(
  () => import("./UploadCustomerAddressSteps")
);
export default function UploadCustomerAddress() {
  return (
    <SummaryDetailsWrapper summaryText="Upload customer address (csv file)">
      <UploadCustomerAddressSteps />
    </SummaryDetailsWrapper>
  );
}
