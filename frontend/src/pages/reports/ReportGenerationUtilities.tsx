import { EditSection } from "../../common/PageLeftRight";
import "./ReportGenerationUtilities.css";
import ServiceReportCsvGenerationForm from "./ServiceReportCsvGenerationForm";
export default function ReportGenerationUtilities() {
  return (
    <EditSection>
      <div className="report__generationWrapper">
        <ServiceReportCsvGenerationForm />
      </div>
    </EditSection>
  );
}
