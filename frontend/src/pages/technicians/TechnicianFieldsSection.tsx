import { useNavigate, useParams } from "react-router-dom";
import Button from "../../common/Button";
import ReportField from "../reports/ReportField";
import ReportTechnician from "../reports/ReportTechnician";
import { Technician } from "./interfaces";

export type TechnicianFieldsSectionProps = {
  technician: Technician;
};
export default function TechnicianFieldsSection(
  props: TechnicianFieldsSectionProps
) {
  const { technician } = props;
  const navigate = useNavigate();
  const { technicianId = "" } = useParams();

  const onTechyEdit = () => {
    navigate(`/technicians/${technicianId}/edit`);
  };
  return (
    <div className="technician__about d-grid">
      <ReportTechnician technician={technician} />
      <ReportField value={technician.email} fieldName="Technician Email" />
      <ReportField value={technician._id} fieldName="Technician Id" />
      <div className="btn-group d-flex-center">
        <Button
          label="Edit Technician"
          className="btn btn-info"
          onClick={onTechyEdit}
        />
      </div>
    </div>
  );
}