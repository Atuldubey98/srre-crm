import { GrAnalytics } from "react-icons/gr";
import "./CustomerReportByPieChartNotfound.css";
export type CustomerReportByPieChartNotfoundProps = {
  lastDate: number;
};
export default function CustomerReportByPieChartNotfound(
  props: CustomerReportByPieChartNotfoundProps
) {
  return (
    <div className="customer__reportNotFound">
      <GrAnalytics size={50} />
      <h4>Data not available for last {props.lastDate} days</h4>
    </div>
  );
}
