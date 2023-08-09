import { GoDotFill } from "react-icons/go";
import {
  useNavigate,
  useParams
} from "react-router-dom";
import "./TechnicianItem.css";
import { Technician } from "./interfaces";
export type TechnicianItemProps = {
  technician: Technician;
};
export default function TechnicianItem(props: TechnicianItemProps) {
  const { technician } = props;
  const { technicianId } = useParams();
  const isTechyActive = props.technician.currentlyActive === "Active";
  const dotColor = isTechyActive ? "green" : "red";
  const navigate = useNavigate();
  const technicianClassName =
    technicianId === props.technician._id
      ? "technician technician__selected"
      : "technician";
  const onTechyClick = () => {
    navigate(`/technicians/${props.technician._id}`);
  };
  return (
    <li onClick={onTechyClick} className={technicianClassName}>
      <div className="d-grid">
        <p>{technician.name}</p>
        <p>{technician.contactNumber}</p>
      </div>
      <GoDotFill color={dotColor} />
    </li>
  );
}
