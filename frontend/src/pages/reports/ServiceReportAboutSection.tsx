import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AboutSection } from "../../common/PageLeftRight";
import { getDateByCustomerCreationDate } from "../../utils/dateUtils";
import OperationBtnsGroup from "../customers/OperationBtnsGroup";
import ReportACList from "./ReportACList";
import ReportField from "./ReportField";
import "./ServiceReportAboutSection.css";
import { ServiceReport } from "./interfaces";
import { getServiceReportById } from "./serviceReportsApi";
import Button from "../../common/Button";
import ReportnotFound from "./ReportnotFound";
export default function ServiceReportAboutSection() {
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
        const { data } = await getServiceReportById(reportId);
        setServiceReport(data.data);
      } catch (error) {}
    })();
  }, [reportId]);
  const navigate = useNavigate();
  return (
    <AboutSection>
      <div className="reports__aboutWrapper">
        <OperationBtnsGroup
          navigationUrl="/reports/new"
          operationLabel="Add new report"
        />
        {serviceReport ? (
          <>
            <div className="report__customer">
              <h1>{serviceReport.customer.name}</h1>
              <address>{serviceReport.customerAddress.location}</address>
              <ReportField
                value={getDateByCustomerCreationDate(serviceReport.serviceDate)}
                fieldName="Service Date"
              />
            </div>
            <div className="report__meta">
              <ReportField
                fieldName="Report Status"
                value={serviceReport.status}
              />
              {serviceReport.acMetaInfo ? (
                <div className="report__acs">
                  {serviceReport.acMetaInfo ? (
                    <h4>ACs Services Description :</h4>
                  ) : null}
                  <ReportACList acMetaInfo={serviceReport.acMetaInfo} />
                </div>
              ) : null}
            </div>
            {serviceReport.technician ? (
              <div className="report__techy">
                <ReportField
                  value={serviceReport.technician.name}
                  fieldName="Technician Name"
                />
                <ReportField
                  value={serviceReport.technician.contactNumber}
                  fieldName="Technician Phone number"
                />
                <ReportField
                  value={serviceReport.technician.currentlyActive}
                  fieldName="Current Active"
                />
                <ReportField
                  value={serviceReport.description}
                  fieldName="Description"
                />
              </div>
            ) : null}
            <div className="btn-group d-flex-center">
              <Button
                label="Edit Report"
                className="btn btn-info"
                onClick={() => {
                  navigate(`/reports/${serviceReport?._id}/edit`);
                }}
              />
            </div>
          </>
        ) : reportId ? (
          <ReportnotFound />
        ) : null}
      </div>
    </AboutSection>
  );
}
