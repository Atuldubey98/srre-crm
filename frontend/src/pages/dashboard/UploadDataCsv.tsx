import { EditSection } from "../../common/PageLeftRight";
import AddNewEntitiesListSidebar from "./AddNewEntitiesListSidebar";
import UploadCustomerAddress from "./UploadCustomerAddress";
import "./UploadDataCsv.css";
import UploadServices from "./UploadServices";

export default function UploadDataCsv() {
  return (
    <EditSection>
      <section className="upload__dataCsv">
        <UploadCustomerAddress />
        <UploadServices />
        <AddNewEntitiesListSidebar />
      </section>
    </EditSection>
  );
}
