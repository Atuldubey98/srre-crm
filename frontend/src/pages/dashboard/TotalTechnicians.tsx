import { RiCustomerService2Line } from "react-icons/ri";
import Dashstat from "./Dashstat";
import { useNavigate } from "react-router-dom";

export type TotalTechniciansProps = {
  totalTechnicians: number;
};
export default function TotalTechnicians(props: TotalTechniciansProps) {
  const { totalTechnicians } = props;
  const navigate = useNavigate();

  const onTechniciansClick = () => {
    navigate("/technicians");
  };
  return (
    <Dashstat
      onClick={onTechniciansClick}
      iconProps={{
        size: 25,
      }}
      label="Total Technicians"
      value={totalTechnicians.toString()}
      Icon={RiCustomerService2Line}
    />
  );
}
