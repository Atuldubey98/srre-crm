import { memo } from "react";
import { getDateByCustomerCreationDate } from "../../utils/dateUtils";
import ReportField from "./ReportField";

export type ReportCustomerProps = {
  customerName: string;
  customerAddress: string;
  reportId: string;
  serviceDate: string;
};
function ReportCustomer(props: ReportCustomerProps) {
  const { customerAddress, customerName, reportId, serviceDate } = props;
  return (
    <div className="report__customer">
      <h1>{customerName}</h1>
      <address>{customerAddress}</address>
      <ReportField fieldName="Report Id" value={reportId} />
      <ReportField
        value={getDateByCustomerCreationDate(serviceDate)}
        fieldName="Service Date"
      />
    </div>
  );
}
export default memo(ReportCustomer);