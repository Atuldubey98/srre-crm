import { Pie } from "react-chartjs-2";
import { PieData } from "./interfaces";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import './CustomersServiceReportsPieChart.css'
ChartJS.register(ArcElement, Tooltip, Legend);

export type CustomersServiceReportsPieChartProps = {
  pieData: PieData;
};
export default function CustomersServiceReportsPieChart(
  props: CustomersServiceReportsPieChartProps
) {
  const { pieData } = props;
  return pieData.labels.length ? (
    <div className="customer__serviceReportStat">
      <h4>Customer reports stats</h4>
      <Pie data={pieData} />
    </div>
  ) : null;
}
