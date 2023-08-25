import DashItem, { DashItemProps } from "./DashItem";
import { IoBusinessSharp } from "react-icons/io5";
import "./Dashright.css";
import { FcBusinessman, FcServices } from "react-icons/fc";
import { TbReportSearch } from "react-icons/tb";
import { RiCustomerService2Line } from "react-icons/ri";
import AdminWrapper from "../../common/AdminWrapper";
import { AboutSection } from "../../common/PageLeftRight";
export default function DashRight() {
  const dashItems: DashItemProps[] = [
    {
      Icon: IoBusinessSharp,
      heading: "Customers",
      navigationUrl: "/customers",
      iconBaseProps: {
        size: 80,
        color: "brown",
      },
    },
    {
      Icon: FcServices,
      heading: "Services",
      navigationUrl: "/services",
      iconBaseProps: {
        size: 80,
      },
    },
    {
      Icon: RiCustomerService2Line,
      heading: "Technicians",
      navigationUrl: "/Technicians",
      iconBaseProps: {
        size: 80,
      },
    },
    {
      Icon: TbReportSearch,
      heading: "Service reports",
      navigationUrl: "/reports",
      iconBaseProps: {
        size: 80,
        color: "blue",
      },
    },
  ];
  const userDashItemProps: DashItemProps = {
    Icon: FcBusinessman,
    heading: "Employees",
    navigationUrl: "/users",
    iconBaseProps: {
      size: 80,
    },
  };
  return (
    <AboutSection>
      <section className="dash__right d-flex-center">
        <ul className="dash__itemsList">
          {dashItems.map((dashItem) => (
            <DashItem {...dashItem} key={dashItem.navigationUrl} />
          ))}
          <AdminWrapper>
            <DashItem {...userDashItemProps} />
          </AdminWrapper>
        </ul>
      </section>
    </AboutSection>
  );
}
