import { lazy } from "react";
import { EditSection } from "../../common/PageLeftRight";
import './UploadDataCsv.css'
const UploadServices = lazy(() => import("./UploadServices"));
const UploadCustomerAddress = lazy(() => import("./UploadCustomerAddress"));
export default function UploadDataCsv() {
  return (
    <EditSection>
      <section className="upload__dataCsv">
        <UploadCustomerAddress />
        <UploadServices />
      </section>
    </EditSection>
  );
}
