import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../common/Button";
import MessageBody, { MessageBodyProps } from "../../common/MessageBody";
import { deleteServiceReportById } from "./serviceReportsApi";
import { isAxiosError } from "axios";
export type ReportButtonsGroupProps = {
  onRemoveService: (reportId: string) => void;
};
export default function ReportButtonsGroup(props: ReportButtonsGroupProps) {
  const { onRemoveService } = props;
  const navigate = useNavigate();
  const { reportId = "" } = useParams();
  const [message, setMessage] = useState<MessageBodyProps>({
    type: "success",
    body: "",
  });
  const onDeleteReport = async () => {
    try {
      if (confirm("Do you want to delete the report?")) {
        await deleteServiceReportById(reportId);
        onRemoveService(reportId);
        navigate(`/reports`);
      }
    } catch (error) {
      setMessage({
        type: "error",
        body: isAxiosError(error)
          ? error.response?.data.message
          : "Network error occured",
      });
    }
  };
  return (
    <div className="btn-group d-flex-center">
      <Button
        label="Edit Report"
        className="btn btn-info"
        onClick={() => {
          navigate(`/reports/${reportId}/edit`);
        }}
      />
      <Button
        label="Delete Report"
        className="btn btn-danger"
        onClick={onDeleteReport}
      />
      <MessageBody {...message} />
    </div>
  );
}
