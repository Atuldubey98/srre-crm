import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AboutSection } from "../../common/PageLeftRight";
import { getDateByCustomerCreationDate } from "../../utils/dateUtils";
import OperationBtnsGroup from "../customers/OperationBtnsGroup";
import ReportACList from "./ReportACList";
import ReportField from "./ReportField";
import "./ServiceReportAboutSection.css";
import { ServiceReport } from "./interfaces";
import { getServiceReportById } from "./serviceReportsApi";
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
  const statusClassname = `report__statusBig ${
    serviceReport?.status === "Complete"
      ? "report__statusComplete"
      : serviceReport?.status === "Incomplete"
      ? "report__statusIncomplete"
      : serviceReport?.status === "Material Pending"
      ? "report__statusPending"
      : ""
  }`;
  return serviceReport ? (
    <AboutSection>
      <OperationBtnsGroup
        navigationUrl="/reports/new"
        operationLabel="Add new report"
      />
      <div className="report__customer">
        <h1>{serviceReport.customer.name}</h1>
        <address>{serviceReport.customerAddress.location}</address>
        <h5>
          <span>Service Date : </span>
          <span>
            {getDateByCustomerCreationDate(serviceReport.serviceDate)}
          </span>
        </h5>
      </div>
      <div className="report__meta">
        <div className="report__currentStatus">
          <span>Current Status : </span>
          <span className={statusClassname}>{serviceReport.status}</span>
        </div>
        {serviceReport.acMetaInfo ? (
          <div className="report__acs">
            <h4>ACs Services Description :</h4>
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
        </div>
      ) : null}
    </AboutSection>
  ) : null;
}
