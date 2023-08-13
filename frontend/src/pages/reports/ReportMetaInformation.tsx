import ReportACList from "./ReportACList";
import ReportField from "./ReportField";
import { AcMetaInfo, ServiceReportStatus } from "./interfaces";
export type ReportMetaInformationProps = {
  status: ServiceReportStatus;
  acMetaInfo: AcMetaInfo[];
};
export default function ReportMetaInformation(
  props: ReportMetaInformationProps
) {
  const { acMetaInfo, status } = props;
  return (
    <div className="report__meta">
      <ReportField fieldName="Report Status" value={status} />
      <div className="report__acs">
        <h4>ACs Services Description :</h4>
        <ReportACList acMetaInfo={acMetaInfo} />
      </div>
    </div>
  );
}
