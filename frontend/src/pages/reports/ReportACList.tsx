import { AcMetaInfo } from "./interfaces";
import SingleReportAC from "./SingleReportAC";

export type ReportACListProps = {
  acMetaInfo: AcMetaInfo[];
};
export default function ReportACList(props: ReportACListProps) {
  return (
    <ul className="report__acsList">
      {props.acMetaInfo.map((acmeta) => (
        <SingleReportAC acmeta={acmeta} key={acmeta._id} />
      ))}
    </ul>
  );
}
