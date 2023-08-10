import { FormEventHandler, useEffect, useState } from "react";
import { AboutSection } from "../../common/PageLeftRight";
import CustomerFields from "./CustomerFields";
import ServicesGivenFields from "./ServicesGivenFields";
import useReportForm from "./useReportForm";
import TechnicianFormSelect from "./TechnicianFormSelect";
import Button from "../../common/Button";
import WorkDescriptionField from "./WorkDescriptionField";
import FormLabelField from "../../common/FormLabelField";
import {
  createNewServiceReport,
  getServiceReportById,
  updateServiceReport,
} from "./serviceReportsApi";
import MessageBody, { MessageBodyProps } from "../../common/MessageBody";
import { isAxiosError } from "axios";
import "./FormServiceReport.css";
import {
  useLocation,
  useParams,
  useMatch,
  useNavigate,
} from "react-router-dom";
import { ServiceReport } from "./interfaces";
export default function FormServiceReport() {
  function getDateForField(dateString: string) {
    const dateObject = new Date(dateString);

    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0");
    const day = String(dateObject.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  }
  const { state, operations } = useReportForm();
  const location = useLocation();
  const { reportId = "" } = useParams();
  const pathnameMatch = useMatch(location.pathname);
  const isUpdateForm =
    pathnameMatch?.pathnameBase === `/reports/${reportId}/edit`;
  const [message, setMessage] = useState<MessageBodyProps>({
    type: "success",
    body: "",
  });
  const { customer, customerAddress, acMetaInfo } = state;
  const navigate = useNavigate();
  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      if (isUpdateForm) {
        const { data } = await updateServiceReport(state, reportId);
        navigate(`/reports/${data.data._id}`);
      } else {
        await createNewServiceReport(state);
        setMessage({
          type: "success",
          body: "New report created",
        });
      }
      operations.onSetDefaultState();
    } catch (error) {
      setMessage({
        type: "error",
        body: isAxiosError(error)
          ? error.response?.data.message
          : "Error occured",
      });
    } finally {
      setTimeout(() => {
        setMessage({ ...message, body: "" });
      }, 1500);
    }
  };
  useEffect(() => {
    if (reportId) {
      (async () => {
        const response = await getServiceReportById(reportId);
        const report: ServiceReport = response.data.data;
        console.log(report);
        
        operations.onSetNewState({
          customer: report.customer._id,
          acMetaInfo: report.acMetaInfo || [],
          customerAddress: report.customerAddress._id,
          description: report.description,
          serviceDate: getDateForField(report.serviceDate),
          siteContactPerson: report.siteContactPerson || {
            contactNumber: "",
            identification: "",
          },
          status: report.status,
          technician: report.technician._id || "",
        });
      })();
    }
  }, [reportId]);
  return (
    <AboutSection>
      <form className="service__reportForm" onSubmit={onSubmit}>
        <FormLabelField
          input={{
            name: "serviceDate",
            type: "date",
            required: true,
            value: state.serviceDate,
            onChange: operations.onChangeReportField,
          }}
          label="Service Date"
        />
        <CustomerFields
          siteContactPerson={state.siteContactPerson}
          customer={customer}
          customerAddress={customerAddress}
          onChangeContactField={operations.onChangeContactField}
          onChangeCustomerField={operations.onChangeReportField}
        />
        <ServicesGivenFields
          onRemoveService={operations.onRemoveService}
          onUpdateService={operations.onUpdateService}
          acMetaInfoList={acMetaInfo}
          onAddService={operations.onAddService}
        />
        <TechnicianFormSelect
          status={state.status}
          onChangeReportField={operations.onChangeReportField}
          technician={state.technician}
        />
        <WorkDescriptionField
          description={state.description}
          onChangeReportField={operations.onChangeReportField}
        />
        <MessageBody {...message} />
        <div className="d-flex-center">
          {isUpdateForm ? (
            <Button
              type="submit"
              label="Update Report"
              className="btn btn-info"
            />
          ) : (
            <Button
              type="submit"
              label="Add Report"
              className="btn btn-success"
            />
          )}
        </div>
      </form>
    </AboutSection>
  );
}
