import { Technician } from "../technicians/interfaces";
import ReportField from "./ReportField";
export type ReportTechnicianProps = {
  technician: Technician;
};
export default function ReportTechnician(props: ReportTechnicianProps) {
  const { technician } = props;
  return (
    <div className="report__techy">
      <ReportField value={technician.name} fieldName="Technician Name" />
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
