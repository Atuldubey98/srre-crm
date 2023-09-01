import ReportField from "./ReportField";
import { AcMetaInfo } from "./interfaces";
import "./ACMetaInfosList.css";
import Button from "../../common/Button";
import { acOptions } from "../services/interfaces";
export type ACMetaInfosListProps = {
  acMetaInfos: AcMetaInfo[];
  disabled?: boolean;
  onRemoveService: (serviceId: string) => void;
  onSetACMetaInfo: (acMetaInfo: AcMetaInfo) => void;
};
export default function ACMetaInfosList(props: ACMetaInfosListProps) {
  const { acMetaInfos, onSetACMetaInfo } = props;
  return (
    <ul className="ac__Infos d-grid">
      {acMetaInfos.map((acInfo) => (
        <li key={acInfo._id} className="ac__info">
          <div onClick={() => onSetACMetaInfo(acInfo)}>
            <ReportField
              value={acInfo.modelNumber}
              fieldName="AC Model Number"
            />
            <ReportField
              value={acInfo.tonnage.toString()}
              fieldName="Total Tonn of AC"
            />
            <ReportField
              value={acOptions[acInfo.typeOfAC.toString()]}
              fieldName="Type of AC"
            />
            <ReportField
              value={(acInfo.services || [])
                .map((ser) => `${ser.typeOfAC} : ${ser.serviceName}`)
                .join(", ")}
              fieldName="Services Done"
            />
          </div>
          <div className="ac__InfoDelete">
            <Button
              disabled={props.disabled}
              className="btn btn-small btn-danger"
              label="Delete"
              onClick={() => {
                props.onRemoveService(acInfo._id || "");
              }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
