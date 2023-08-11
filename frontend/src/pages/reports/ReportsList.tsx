import "./ReportsList.css";
import ServiceReportSmall from "./ServiceReportSmall";
import { ServiceReport } from "./interfaces";
export type ReportsListProps = {
  serviceReports: ServiceReport[] | null;
  onRemoveService: (serviceReportId: string) => void;
};
export default function ReportsList(props: ReportsListProps) {
  return props.serviceReports ? (
    <ul className="service__reportsSmallList">
      {props.serviceReports.map((serviceReport) => (
        <ServiceReportSmall
          onRemoveService={props.onRemoveService}
          key={serviceReport._id}
          serviceReport={serviceReport}
        />
      ))}
    </ul>
  ) : null;
}
