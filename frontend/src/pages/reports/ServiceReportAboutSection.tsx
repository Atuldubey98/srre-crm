import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingIndicatorAbout from "../../common/LoadingIndicatorAbout";
import { AboutSection } from "../../common/PageLeftRight";
import ReportButtonsGroup from "./ReportButtonsGroup";
import ReportCustomer from "./ReportCustomer";
import ReportField from "./ReportField";
import ReportMetaInformation from "./ReportMetaInformation";
import ReportTechnician from "./ReportTechnician";
import ReportnotFound from "./ReportnotFound";
import SearchReportForm from "./SearchReportForm";
import "./ServiceReportAboutSection.css";
import { ServiceReport } from "./interfaces";
import { getServiceReportById } from "./serviceReportsApi";
export type ServiceReportAboutSectionProps = {
  onRemoveService: (serviceReportId: string) => void;
};
export default function ServiceReportAboutSection(
  props: ServiceReportAboutSectionProps
) {
  const { onRemoveService } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const { reportId = "" } = useParams();
  const [serviceReport, setServiceReport] = useState<ServiceReport | null>(
    null
  );
  useEffect(() => {
    if (!reportId) {
      return;
    }
    (async () => {
      try {
        setLoading(true);
        const { data } = await getServiceReportById(reportId);
        setServiceReport(data.data);
      } catch (error) {
        setServiceReport(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [reportId]);

  return (
    <AboutSection>
      <div className="reports__aboutWrapper">
        <SearchReportForm />
        {loading ? (
          <LoadingIndicatorAbout loading={loading} />
        ) : serviceReport && reportId ? (
          <div className="reports__aboutSection">
            <ReportCustomer
              customerAddress={serviceReport.customerAddress.location}
              customerName={serviceReport.customer.name}
              reportId={serviceReport?._id || ""}
              serviceDate={serviceReport.serviceDate}
            />
            <ReportField
              fieldName="Customer Contact Identification"
              value={serviceReport.siteContactPerson?.identification}
            />
            {serviceReport.acMetaInfo ? (
              <ReportMetaInformation
                typeOfCall={serviceReport.typeOfCall}
                acMetaInfo={serviceReport.acMetaInfo}
                status={serviceReport.status}
              />
            ) : null}
            {serviceReport.technician ? (
              <ReportTechnician technician={serviceReport.technician} />
            ) : null}
            <ReportField
              value={serviceReport.description}
              fieldName="Description"
            />
            <ReportButtonsGroup onRemoveService={onRemoveService} />
          </div>
        ) : reportId ? (
          <ReportnotFound />
        ) : null}
      </div>
    </AboutSection>
  );
}
