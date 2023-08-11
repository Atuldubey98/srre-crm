import NotfoundItem from "../../common/NotfoundItem";
import { RiCustomerService2Line } from "react-icons/ri";
export default function TechnicianNotfound() {
  return (
    <NotfoundItem
      Icon={RiCustomerService2Line}
      message="Technician not found"
    />
  );
}
