import { IconType } from "react-icons";
import "./Dashstat.css";
export type DashstatProps = {
  Icon: IconType;
  value: string;
  label: string;
};
export default function Dashstat(props: DashstatProps) {
  const { Icon, value, label } = props;
  return (
    <div className="dash__stat d-flex-center">
      <Icon size={25} />
      <h1>{value}</h1>
      <p>{label}</p>
    </div>
  );
}
