import ReportField from "./ReportField";
import { AcMetaInfo } from "./interfaces";

export type ACMetaInfosListProps = {
  acMetaInfos: AcMetaInfo[];
  onSetACMetaInfo: (acMetaInfo: AcMetaInfo) => void;
};
export default function ACMetaInfosList(props: ACMetaInfosListProps) {
  const { acMetaInfos, onSetACMetaInfo } = props;
  return (
    <ul className="ac__Infos">
      {acMetaInfos.map((acInfo) => (
        <li
          onClick={() => onSetACMetaInfo(acInfo)}
          key={acInfo._id}
          className="ac__info"
        >
          <ReportField value={acInfo.modelNumber} fieldName="AC Model Number" />
          <ReportField
            value={acInfo.tonnage.toString()}
            fieldName="Total Tonn of AC"
          />
          <ReportField
            value={acInfo.typeOfAC.toString()}
            fieldName="Type of AC"
          />
        </li>
      ))}
    </ul>
  );
}
