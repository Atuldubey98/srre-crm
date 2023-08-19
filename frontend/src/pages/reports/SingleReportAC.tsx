import { acOptions } from "../services/interfaces";
import ReportField from "./ReportField";
import ServiceGivenInACList from "./ServiceGivenInACList";
import "./SingleReportAC.css";
import { AcMetaInfo } from "./interfaces";
export type SingleReportACProps = {
  acmeta: AcMetaInfo;
};
export default function SingleReportAC(props: SingleReportACProps) {
  const { acmeta } = props;
  return (
    <li className="report__ac">
      <ReportField
        value={acmeta.tonnage.toString()}
        fieldName="Tonnage of AC"
      />
      <ReportField
        value={acmeta.modelNumber.toString()}
        fieldName="Model Number of AC"
      />
      <ReportField
        value={acOptions[acmeta.typeOfAC.toString()]}
        fieldName="Type of AC"
      />
      <ServiceGivenInACList services={acmeta.services} />
    </li>
  );
}
