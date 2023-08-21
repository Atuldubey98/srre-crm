import DashItem, { DashItemProps } from "./DashItem";
import { IoBusinessSharp } from "react-icons/io5";
import "./Dashright.css";
import { FcServices } from "react-icons/fc";
import { TbReportSearch } from "react-icons/tb";
import { RiCustomerService2Line } from "react-icons/ri";
export default function DashRight() {
  const dashItems: DashItemProps[] = [
    {
      Icon: IoBusinessSharp,
      heading: "Customers",
      navigationUrl: "/customers",
    },
    {
      Icon: FcServices,
      heading: "Services",
      navigationUrl: "/services",
    },
    {
      Icon: RiCustomerService2Line,
      heading: "Technicians",
      navigationUrl: "/Technicians",
    },
    {
      Icon: TbReportSearch,
      heading: "Service reports",
      navigationUrl: "/reports",
    },
  ];
  return (
    <section className="dash__right d-flex-center">
      <ul className="dash__itemsList">
        {dashItems.map((dashItem) => (
          <DashItem {...dashItem} key={dashItem.navigationUrl} />
        ))}
      </ul>
    </section>
  );
}
