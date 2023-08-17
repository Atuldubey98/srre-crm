import { EditSection } from "../../common/PageLeftRight";
import CustomerServicesUsedCsvGenerator from "./CustomerServicesUsedCsvGenerator";
import "./ReportGenerationUtilities.css";
import ServiceReportCsvGenerationForm from "./ServiceReportCsvGenerationForm";
export default function ReportGenerationUtilities() {
  return (
    <EditSection>
      <div className="report__generationWrapper">
        <ServiceReportCsvGenerationForm />
        <CustomerServicesUsedCsvGenerator />
      </div>
    </EditSection>
  );
}
