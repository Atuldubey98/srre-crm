import { acTypeOptionsWithoutAll } from "../services/interfaces";
import { AcTypeOptionRow } from "./AcTypeOptionRow";
import "./UploadServicesList.css";
export default function UploadServicesList() {
  return (
    <table className="upload__servicesList">
      <thead>
        <tr>
          <th colSpan={4}>Code</th>
          <th colSpan={8}>Type of Air Conditioner</th>
        </tr>
      </thead>
      <tbody>
        {acTypeOptionsWithoutAll.map((typeOfAC) => (
          <AcTypeOptionRow {...typeOfAC} key={typeOfAC.value} />
        ))}
      </tbody>
    </table>
  );
}
