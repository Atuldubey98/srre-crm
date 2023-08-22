import { useEffect, useState } from "react";

import randomColors from "randomcolor";
import { getDashboardData } from "./dashApi";
import {
    CustomerReportCount,
    DashboardInformation,
    PieData,
} from "./interfaces";

import CustomersServiceReportsPieChart from "./CustomersServiceReportsPieChart";
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
    <section className="dash__left">
      <div className="dash__stat">
        <h1>Total Customers :</h1>
        <p>{dashboardInfo.customer.count}</p>
      </div>
      {dashboardInfo.technician ? (
        <>
          <div className="dash__stat">
            <h1>Total Techncians :</h1>
            <p>{dashboardInfo.technician.count}</p>
          </div>
          <div className="dash__stat">
            <h1>Top Performing Techncian :</h1>
            <p>
              {dashboardInfo.technician.topPerformingTechnician.technician.name}
            </p>
          </div>
        </>
      ) : null}
      {pieData ? <CustomersServiceReportsPieChart pieData={pieData} /> : null}
    </section>
  ) : (
    <section className="dash__left"></section>
  );
}
