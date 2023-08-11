import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../common/Button";
import Input from "../../common/Input";
import { AboutSection } from "../../common/PageLeftRight";
import { getDateByCustomerCreationDate } from "../../utils/dateUtils";
import OperationBtnsGroup from "../customers/OperationBtnsGroup";
import ReportACList from "./ReportACList";
import ReportField from "./ReportField";
import ReportnotFound from "./ReportnotFound";
import "./ServiceReportAboutSection.css";
import { ServiceReport } from "./interfaces";
import {
  deleteServiceReportById,
  getServiceReportById,
} from "./serviceReportsApi";
export type ServiceReportAboutSectionProps = {
  onRemoveService: (serviceReportId: string) => void;
};
export default function ServiceReportAboutSection(
  props: ServiceReportAboutSectionProps
) {
  const { onRemoveService } = props;
  const { reportId = "" } = useParams();
  const [serviceReport, setServiceReport] = useState<ServiceReport | null>(
    null
  );
  const [searchReportId, setSearchReportId] = useState<string>("");
  useEffect(() => {
    if (!reportId) {
      return;
    }
    (async () => {
      try {
        const { data } = await getServiceReportById(reportId);
        setServiceReport(data.data);
      } catch (error) {}
    })();
  }, [reportId]);
  const onNavigate = useNavigate();
  const onChangeSearchReportId: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchReportId(e.currentTarget.value);
  };
  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onNavigate(`/reports/${searchReportId}`);
  };
  const onDeleteReport = async () => {
    try {
      if (confirm("Do you want to delete the report?")) {
        await deleteServiceReportById(reportId);
        onRemoveService(reportId);
        onNavigate(`/reports`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AboutSection>
      <div className="reports__aboutWrapper">
        <OperationBtnsGroup
          navigationUrl="/reports/new"
          operationLabel="Add new report"
        >
          <form className="d-flex-center" onSubmit={onSubmit}>
            <Input
              type="text"
              placeholder="Search By Report Id"
              value={searchReportId}
              required
              onChange={onChangeSearchReportId}
            />
            <Button label="Search" className="btn btn-info" />
          </form>
        </OperationBtnsGroup>
        {serviceReport && reportId ? (
          <>
            <div className="report__customer">
              <h1>{serviceReport.customer.name}</h1>
              <address>{serviceReport.customerAddress.location}</address>
              <ReportField
                value={getDateByCustomerCreationDate(serviceReport.serviceDate)}
                fieldName="Service Date"
              />
            </div>
            <div className="report__meta">
              <ReportField
                fieldName="Report Status"
                value={serviceReport.status}
              />
              {serviceReport.acMetaInfo ? (
                <div className="report__acs">
                  {serviceReport.acMetaInfo ? (
                    <h4>ACs Services Description :</h4>
                  ) : null}
                  <ReportACList acMetaInfo={serviceReport.acMetaInfo} />
                </div>
              ) : null}
            </div>
            {serviceReport.technician ? (
              <div className="report__techy">
                <ReportField
                  value={serviceReport.technician.name}
                  fieldName="Technician Name"
                />
                <ReportField
                  value={serviceReport.technician.contactNumber}
                  fieldName="Technician Phone number"
                />
                <ReportField
                  value={serviceReport.technician.currentlyActive}
                  fieldName="Current Active"
                />
                <ReportField
                  value={serviceReport.description}
                  fieldName="Description"
                />
              </div>
            ) : null}
            <div className="btn-group d-flex-center">
              <Button
                label="Edit Report"
                className="btn btn-info"
                onClick={() => {
                  onNavigate(`/reports/${serviceReport?._id}/edit`);
                }}
              />
              <Button
                label="Delete Report"
                className="btn btn-danger"
                onClick={onDeleteReport}
              />
            </div>
          </>
        ) : reportId ? (
          <ReportnotFound />
        ) : null}
      </div>
    </AboutSection>
  );
}
