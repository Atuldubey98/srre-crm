import { IconBaseProps, IconType } from "react-icons";
import "./Dashstat.css";
export type DashstatProps = {
  Icon: IconType;
  iconProps?: IconBaseProps;
  value: string;
  onClick?: VoidFunction;
  label: string;
};
export default function Dashstat(props: DashstatProps) {
  const { Icon, onClick, value, label, iconProps } = props;
  return (
    <div onClick={onClick} className="dash__stat d-flex-center">
      <Icon {...iconProps} />
      <h1>{value}</h1>
      <p>{label}</p>
    </div>
  );
}
