import { useNavigate, useParams } from "react-router-dom";
import ReportStatus from "./ReportStatus";
import "./ServiceReportSmall.css";
import { ServiceReport } from "./interfaces";
export type ServiceReportSmallProps = {
  serviceReport: ServiceReport;
};
export default function ServiceReportSmall(props: ServiceReportSmallProps) {
  const navigate = useNavigate();
  const { reportId = "" } = useParams();
  const navigateToService = () => {
    navigate(`/reports/${props.serviceReport._id}`);
  };
  const classname = `service__reportSmall ${
    reportId === props.serviceReport._id ? "selected__service__reportSmall" : ""
  }`;
  return (
    <li onClick={navigateToService} className={classname}>
      <div className="customer__data text-wrap">
        <p title="Customer Name" className="customer__name">
          {props.serviceReport.customer.name}
        </p>
        <p title="Customer Address" className="customer__address">
          {props.serviceReport.customerAddress.location}
        </p>
        <div className="report__statusWrapper">
          <ReportStatus status={props.serviceReport.status} />
        </div>
      </div>
    </li>
  );
}
