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
import { getDateForField } from "../../utils/dateUtils";
import ReportnotFound from "./ReportnotFound";
import SelectOptions from "../../common/SelectOptions";
export type FormServiceReportProps = {
  onUpdateService: (serviceReport: ServiceReport) => void;
};
export default function FormServiceReport(props: FormServiceReportProps) {
  const { state, operations } = useReportForm();
  const location = useLocation();
  const { reportId = "" } = useParams();
  const pathnameMatch = useMatch(location.pathname);
  const [error, setError] = useState<string>("");
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
        props.onUpdateService(data.data);
        navigate(`/reports/${data.data._id}`);
      } else {
        const { data } = await createNewServiceReport(state);
        navigate(`/reports/${data.data._id}`);
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
  const isUpdateForm =
    pathnameMatch?.pathnameBase === `/reports/${reportId}/edit`;
  const { onSetNewState } = operations;
  useEffect(() => {
    if (reportId) {
      (async () => {
        setError("");
        try {
          const response = await getServiceReportById(reportId);
          onSetNewState({
            customer: response.data.data.customer._id,
            typeOfCall: response.data.data.typeOfCall || "R&S",
            acMetaInfo: response.data.data.acMetaInfo || [],
            customerAddress: response.data.data.customerAddress._id,
            description: response.data.data.description,
            serviceDate: getDateForField(response.data.data.serviceDate),
            siteContactPerson: response.data.data.siteContactPerson || {
              contactNumber: "",
              identification: "",
            },
            status: response.data.data.status,
            technician: response.data.data.technician._id || "",
          });
        } catch (error) {
          setError(
            isAxiosError(error) ? error.response?.data.message : "Error occured"
          );
        }
      })();
    }
  }, [reportId, onSetNewState]);
  return (
    <AboutSection>
      {error ? (
        <ReportnotFound />
      ) : (
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
          <div className="form__fieldLabel">
            <label htmlFor="typeOfCall">Type of Service </label>
            <SelectOptions
              required
              name="typeOfCall"
              onChange={operations.onChangeReportField}
              value={state.typeOfCall}
            >
              <option value="R&S">Repair and Service</option>
              <option value="PMS">Preventive Maintinence</option>
            </SelectOptions>
          </div>
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
      )}
    </AboutSection>
  );
}
