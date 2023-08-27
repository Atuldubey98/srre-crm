import { Technician } from "../technicians/interfaces";
import ReportField from "./ReportField";
import ReportLinkField from "./ReportLinkField";
export type ReportTechnicianProps = {
  technician: Technician;
};
export default function ReportTechnician(props: ReportTechnicianProps) {
  const { technician } = props;
  return (
    <div className="report__techy">
      <ReportLinkField
        fieldName="Technician Name"
        linkLabel={technician.name}
        to={`/technicians/${technician._id}`}
      />
      <ReportField
        value={technician.contactNumber}
        fieldName="Technician Phone number"
      />
      <ReportField
        value={technician.currentlyActive}
        fieldName="Current Active"
      />
    </div>
  );
}
