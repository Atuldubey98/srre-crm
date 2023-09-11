import { useEffect, useState } from "react";

import randomColors from "randomcolor";
import { getDashboardData } from "./dashApi";
import {
  CustomerReportCount,
  DashboardInformation,
  PieData,
} from "./interfaces";

import { ListSection } from "../../common/PageLeftRight";
import CustomersServiceReportsPieChart from "./CustomersServiceReportsPieChart";
import "./DashLeft.css";
import TopTechnician from "./TopTechnician";
import TotalCustomers from "./TotalCustomers";
import TotalTechnicians from "./TotalTechnicians";
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
        <TotalCustomers customerCount={dashboardInfo.customer.count} />
        <TotalTechnicians totalTechnicians={dashboardInfo.technician.count} />
      </div>
      {dashboardInfo.technician.topPerformingTechnician ? (
        <TopTechnician
          id={
            dashboardInfo.technician.topPerformingTechnician.technician._id ||
            ""
          }
          name={
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
