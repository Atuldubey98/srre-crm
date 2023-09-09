import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../common/Button";
import MessageBody, { MessageBodyProps } from "../../common/MessageBody";
import {
  deleteServiceReportById,
  downloadServiceReportByReportId,
} from "./serviceReportsApi";
import { isAxiosError } from "axios";
import { AiOutlineDelete } from "react-icons/ai";
import { MdUpdate } from "react-icons/md";
import { BiSolidDownload } from "react-icons/bi";
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
  const onDownloadServiceReport = async () => {
    try {
      const response = await downloadServiceReportByReportId(reportId);
      const blob = new Blob([response.data], { type: "text/html" });
      const blobUrl = URL.createObjectURL(blob);
      const newTab = window.open(blobUrl, "_blank");
      setTimeout(() => {
        if (newTab) {
          newTab.print();
        }
        URL.revokeObjectURL(blobUrl);
      }, 1000);
    } catch (error) {
      setMessage({
        type: "error",
        body: isAxiosError(error)
          ? error.response?.data.message
          : "Network error occured",
      });
    }
  };
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
  const onClickUpdateServiceReport = () => {
    navigate(`/reports/${reportId}/edit`);
  };
  return (
    <div className="btn-group d-flex-center">
      <Button
        children={<MdUpdate />}
        label="Edit Report"
        className="btn btn-info d-flex-center"
        onClick={onClickUpdateServiceReport}
      />
      <Button
        children={<BiSolidDownload />}
        label="Download Service Report"
        onClick={onDownloadServiceReport}
        className="btn btn-success d-flex-center"
      />
      <Button
        children={<AiOutlineDelete />}
        label="Delete Report"
        className="btn btn-danger d-flex-center"
        onClick={onDeleteReport}
      />
      <MessageBody {...message} />
    </div>
  );
}
