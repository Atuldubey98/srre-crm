import { isAxiosError } from "axios";
import { useState } from "react";
import Button from "../../common/Button";
import MessageBody, { MessageBodyProps } from "../../common/MessageBody";
import { downloadServicesTemplate } from "./dashApi";

export default function DownloadServicesUploadTemplateButton() {
  const [messageBody, setMessageBody] = useState<MessageBodyProps | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const onDownloadServicesTemplate = async () => {
    try {
      setLoading(true);
      const response = await downloadServicesTemplate();
      const file = new Blob([response.data]);
      const fileURL = URL.createObjectURL(file);
      const a = document.createElement("a");
      a.href = fileURL;
      a.download = `ServiceTemplate:${new Date().toISOString()}.csv`;
      a.click();
      URL.revokeObjectURL(fileURL);
    } catch (error) {
      setMessageBody({
        type: "error",
        body: isAxiosError(error)
          ? error.response?.data.message
          : "Network error occured",
      });
    } finally {
      setLoading(false);
    }
  };
  const btnClassName = `btn btn-info ${loading ? "btn-loading" : ""}`;
  return (
    <div className="d-grid">
      <Button
        disabled={loading}
        className={btnClassName}
        label="Download"
        onClick={onDownloadServicesTemplate}
      />
      {messageBody ? <MessageBody {...messageBody} /> : null}
    </div>
  );
}
