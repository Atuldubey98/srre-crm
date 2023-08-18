import { FcBusinessman } from "react-icons/fc";
import NotfoundItem from "../common/NotfoundItem";

export type EmployeeNotfoundProps = {
  errorMessage: string;
};
export default function EmployeeNotfound(props: EmployeeNotfoundProps) {
  return props.errorMessage ? (
    <NotfoundItem Icon={FcBusinessman} message={props.errorMessage} />
  ) : null;
}
