import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import randomColors from "randomcolor";
import { ChangeEventHandler, useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { useParams } from "react-router-dom";
import SelectOptions from "../../common/SelectOptions";
import { getDateBeforeDays } from "../../utils/dateUtils";
import { ServiceUsedWithCount } from "../services/interfaces";
import "./CustomerReportByPieChart.css";
import { getCustomerServicesCount } from "./customersApi";
import MessageBody, { MessageBodyProps } from "../../common/MessageBody";
import { isAxiosError } from "axios";
import CustomerReportByPieChartNotfound from "./CustomerReportByPieChartNotfound";
ChartJS.register(ArcElement, Tooltip, Legend);
export default function CustomerReportByPieChart() {
  const [date, setDate] = useState<number>(30);

  const onChangeDate: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setDate(parseInt(e.currentTarget.value));
  };
  const [messageBody, setMessageBody] = useState<MessageBodyProps>({
    type: "success",
    body: "",
  });
  const { customerId } = useParams();
  const [pieData, setPieData] = useState<{
    labels: string[];
    datasets: [{ data: number[]; backgroundColor: string[]; weight: 1 }];
  } | null>(null);
  useEffect(() => {
    (async () => {
      try {
        const response = await getCustomerServicesCount({
          customer: customerId || "",
          fromDate: getDateBeforeDays(date),
          toDate: "",
          allCustomers: false,
        });
        setPieData({
          labels: response.data.data.map(
            (service: ServiceUsedWithCount) => service.serviceName
          ),
          datasets: [
            {
              data: response.data.data.map(
                (service: ServiceUsedWithCount) => service.noOfTimesServiceUsed
              ),
              backgroundColor: randomColors({
                count: response.data.data.length,
                luminosity: "dark",
                format: "rgb",
              }),
              weight: 1,
            },
          ],
        });
      } catch (error) {
        setMessageBody({
          type: "error",
          body: isAxiosError(error)
            ? error.response?.data.message
            : "Some error occured",
        });
      }
    })();
  }, [customerId, date]);
  return (
    <section className="customer__reportPie">
      <p>Stats of services used by customer : </p>
      <div className="form__labelField">
        <label htmlFor="lastMonths">Last Months</label>
        <SelectOptions value={date} onChange={onChangeDate}>
          <option value={30}>30 Days</option>
          <option value={60}>60 Days</option>
          <option value={90}>90 Days</option>
        </SelectOptions>
      </div>
      <div className="customer__chart">
        {pieData && pieData.labels.length ? (
          <Pie data={pieData} />
        ) : (
          <CustomerReportByPieChartNotfound lastDate={date} />
        )}
      </div>
      <MessageBody {...messageBody} />
    </section>
  );
}
