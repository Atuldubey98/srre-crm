import { memo } from "react";
import { getDateByCustomerCreationDate } from "../../utils/dateUtils";
import ReportField from "./ReportField";
import { Link } from "react-router-dom";
import "./ReportCustomer.css";
export type ReportCustomerProps = {
  customerId: string;
  customerName: string;
  customerAddress: string;
  reportId: string;
  serviceDate: string;
};
function ReportCustomerElement(props: ReportCustomerProps) {
  const { customerAddress, customerName, reportId, serviceDate, customerId } =
    props;
  return (
    <div className="report__customer">
      <Link
        className="report__customerName"
        to={{ pathname: `/customers/${customerId}` }}
      >
        <h1>{customerName}</h1>
      </Link>
      <address>{customerAddress}</address>
      <ReportField fieldName="Report Id" value={reportId} />
      <ReportField
        value={getDateByCustomerCreationDate(serviceDate)}
        fieldName="Service Date"
      />
    </div>
  );
}
const ReportCustomer = memo(ReportCustomerElement);
export default ReportCustomer;
