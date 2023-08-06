import { useNavigate } from "react-router-dom";
import { Technician } from "./interfaces";
import "./TechnicianItem.css";
import { GoDotFill } from "react-icons/go";
export type TechnicianItemProps = {
  technician: Technician;
};
export default function TechnicianItem(props: TechnicianItemProps) {
  const { technician } = props;
  const isTechyActive = props.technician.currentlyActive === "Active";
  const dotColor = isTechyActive ? "green" : "red";
  const navigate = useNavigate();
  const onTechyClick = () => {
    navigate(`/technicians/${props.technician._id}`);
  };
  return (
    <li onClick={onTechyClick} className="technician">
      <div className="d-grid">
        <p>{technician.name}</p>
        <p>{technician.contactNumber}</p>
      </div>
      <GoDotFill color={dotColor} />
    </li>
  );
}
