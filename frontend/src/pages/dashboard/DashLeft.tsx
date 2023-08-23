import { useEffect, useState } from "react";

import randomColors from "randomcolor";
import { getDashboardData } from "./dashApi";
import {
  CustomerReportCount,
  DashboardInformation,
  PieData,
} from "./interfaces";

import CustomersServiceReportsPieChart from "./CustomersServiceReportsPieChart";
import { ListSection } from "../../common/PageLeftRight";
import Dashstat from "./Dashstat";
import { AiFillStar } from "react-icons/ai";
import { IoBusinessSharp } from "react-icons/io5";
import { RiCustomerService2Line } from "react-icons/ri";
import "./DashLeft.css";
export default function DashLeft() {
  const [dashboardInfo, setDashboardInfo] =
    useState<DashboardInformation | null>(null);

  const [pieData, setPieData] = useState<PieData | null>(null);
  useEffect(() => {
    (async () => {
      const { data } = await getDashboardData();
      setDashboardInfo({
        customer: data.data.customer,
        technician: data.data.technician,
      });
      setPieData({
        labels: data.data.reports.lastThirtyDaysReportsCountCustomers.map(
          (rep: CustomerReportCount) => rep.name
        ),
        datasets: [
          {
            data: data.data.reports.lastThirtyDaysReportsCountCustomers.map(
              (rep: CustomerReportCount) => rep.count
            ),
            backgroundColor: randomColors({
              count:
                data.data.reports.lastThirtyDaysReportsCountCustomers.length,
              luminosity: "dark",
              format: "rgb",
            }),
            weight: 1,
          },
        ],
      });
    })();
  }, []);
  return dashboardInfo ? (
    <ListSection>
      <div className="dash__left">
        <Dashstat
          value={dashboardInfo.customer.count.toString()}
          Icon={IoBusinessSharp}
          label="Total Customers"
        />
        <Dashstat
          label="Total Technicians"
          value={dashboardInfo.technician.count.toString()}
          Icon={RiCustomerService2Line}
        />
      </div>
      {dashboardInfo.technician.topPerformingTechnician ? (
        <Dashstat
          Icon={AiFillStar}
          label="Top Technician"
          value={
            dashboardInfo.technician.topPerformingTechnician.technician.name
          }
        />
      ) : null}
      {pieData ? <CustomersServiceReportsPieChart pieData={pieData} /> : null}
    </ListSection>
  ) : (
    <ListSection></ListSection>
  );
}
