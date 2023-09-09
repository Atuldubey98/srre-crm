import { AiFillStar } from "react-icons/ai";
import Dashstat from "./Dashstat";
import { useNavigate } from "react-router-dom";

export type TopTechnicianProps = {
  name: string;
  id: string;
};
export default function TopTechnician(props: TopTechnicianProps) {
  const { name, id } = props;
  const navigate = useNavigate();
  const onTopTechnicianClick = () => {
    navigate(`/technicians/${id}`);
  };
  return (
    <Dashstat
      onClick={onTopTechnicianClick}
      iconProps={{
        size: 40,
        color: "#ffcd3c",
      }}
      Icon={AiFillStar}
      label="Top Technician"
      value={name}
    />
  );
}
