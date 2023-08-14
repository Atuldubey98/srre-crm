import ReportACList from "./ReportACList";
import ReportField from "./ReportField";
import { AcMetaInfo, ServiceReportStatus, TypeOfCall } from "./interfaces";
export type ReportMetaInformationProps = {
  typeOfCall: TypeOfCall;
  status: ServiceReportStatus;
  acMetaInfo: AcMetaInfo[];
};
export default function ReportMetaInformation(
  props: ReportMetaInformationProps
) {
  const { acMetaInfo, status, typeOfCall } = props;
  return (
    <div className="report__meta">
      <ReportField fieldName="Report Status" value={status} />
      <ReportField fieldName="Type of Service" value={typeOfCall} />
      <div className="report__acs">
        {acMetaInfo.length ? <h4>ACs Services Description :</h4> : null}
        <ReportACList acMetaInfo={acMetaInfo} />
      </div>
    </div>
  );
}
