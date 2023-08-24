import { isAxiosError } from "axios";
import { useState } from "react";
import Button from "../../common/Button";
import MessageBody, { MessageBodyProps } from "../../common/MessageBody";
import { downloadServicesTemplate } from "./dashApi";

export default function DownloadServicesUploadTemplateButton() {
  const [messageBody, setMessageBody] = useState<MessageBodyProps | null>(null);
  const onDownloadServicesTemplate = async () => {
    try {
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
    }
  };
  return (
    <div className="d-grid">
      <Button
        className="btn btn-info"
        label="Download"
        onClick={onDownloadServicesTemplate}
      />
      {messageBody ? <MessageBody {...messageBody} /> : null}
    </div>
  );
}
