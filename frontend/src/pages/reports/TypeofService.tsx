import "./TypeofService.css";
import { TypeOfCall } from "./interfaces";
export type TypeofServiceProps = {
  typeOfService: TypeOfCall;
};
export default function TypeofService(props: TypeofServiceProps) {
  return <span className="type_ofService">{props.typeOfService}</span>;
}
