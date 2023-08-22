import { Pie } from "react-chartjs-2";
import { PieData } from "./interfaces";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export type CustomersServiceReportsPieChartProps = {
  pieData: PieData;
};
export default function CustomersServiceReportsPieChart(
  props: CustomersServiceReportsPieChartProps
) {
  const { pieData } = props;
  return (
    <div className="dash__stat">
      <h1>Customer reports (15 Days)</h1>
      <Pie data={pieData} />
    </div>
  );
}
