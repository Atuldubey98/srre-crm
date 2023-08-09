import { ServiceReportStatus } from "./interfaces";
import "./ReportStatus.css";
export type ReportStatusProps = {
  status: ServiceReportStatus;
};

export default function ReportStatus(props: ReportStatusProps) {
  const className = `report__status ${
    props.status === "Complete"
      ? "report__statusComplete"
      : props.status === "Incomplete"
      ? "report__statusIncomplete"
      : props.status === "Material Pending"
      ? "report__statusPending"
      : ""
  }`;
  return <span className={className}>{props.status}</span>;
}
