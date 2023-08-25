import { IconBaseProps, IconType } from "react-icons";
import "./DashItem.css";
import { useNavigate } from "react-router-dom";
export type DashItemProps = {
  Icon: IconType;
  iconBaseProps?: IconBaseProps;
  heading: string;
  navigationUrl: string;
};
export default function DashItem(props: DashItemProps) {
  const { Icon, heading, navigationUrl } = props;
  const navigate = useNavigate();
  const onClickDashItem = () => {
    navigate(navigationUrl);
  };
  return (
    <li onClick={onClickDashItem} className="dash__item">
      <div className="dash__icon">
        <Icon {...props.iconBaseProps} />
      </div>
      <h1>{heading}</h1>
    </li>
  );
}
