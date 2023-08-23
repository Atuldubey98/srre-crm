import { acTypeOptionsWithoutAll } from "../services/interfaces";
import './UploadServicesList.css';
export default function UploadServicesList() {
  return (
    <ul className="upload__servicesList">
      {acTypeOptionsWithoutAll.map((typeOfAC) => (
        <li>
          <code>
            {typeOfAC.value} : {typeOfAC.field}
          </code>
        </li>
      ))}
    </ul>
  );
}
