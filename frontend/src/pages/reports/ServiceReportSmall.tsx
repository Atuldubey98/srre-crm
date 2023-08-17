import { useParams } from "react-router-dom";
import useNavigateWithQuery from "../../common/useNavigateWithQuery";
import { getDateByCustomerCreationDate } from "../../utils/dateUtils";
import ReportStatus from "./ReportStatus";
import "./ServiceReportSmall.css";
import TypeofService from "./TypeofService";
import { ServiceReport } from "./interfaces";
import { deleteServiceReportById } from "./serviceReportsApi";
export type ServiceReportSmallProps = {
  serviceReport: ServiceReport;
  onRemoveService: (serviceReportId: string) => void;
};
export default function ServiceReportSmall(props: ServiceReportSmallProps) {
  const { reportId = "" } = useParams();
  const { onNavigate } = useNavigateWithQuery();
  const classname = `service__reportSmall ${
    reportId === props.serviceReport._id ? "selected__service__reportSmall" : ""
  }`;
  const onDeleteReportById = async () => {
    try {
      if (confirm("Do you want to delete ?")) {
        await deleteServiceReportById(reportId);
        props.onRemoveService(reportId);
        onNavigate("/reports");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <li
      onClick={() => onNavigate(`/reports/${props.serviceReport._id}`)}
      onDoubleClick={onDeleteReportById}
      className={classname}
    >
      <div className="customer__data text-wrap">
        <p title="Customer Name" className="customer__name">
          {props.serviceReport.customer.name}
        </p>
        <p title="Customer Address" className="customer__address">
          {props.serviceReport.customerAddress.location}
        </p>
        <div className="report__statusWrapper">
          <TypeofService typeOfService={props.serviceReport.typeOfCall} />
          <span className="report__serviceDate">
            {getDateByCustomerCreationDate(props.serviceReport.serviceDate)}
          </span>
          <ReportStatus status={props.serviceReport.status} />
        </div>
      </div>
    </li>
  );
}
