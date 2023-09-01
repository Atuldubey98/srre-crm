import { useState } from "react";
import Button from "../../common/Button";
import { getCustomerAddressTemplateCsvFile } from "./dashApi";
import MessageBody, { MessageBodyProps } from "../../common/MessageBody";
import { isAxiosError } from "axios";

export default function DownloadAddressTemplateButton() {
  const [loading, setLoading] = useState<boolean>(false);
  const [messageBody, setMessageBody] = useState<MessageBodyProps | null>(null);
  const btnClassName = `btn btn-info ${loading ? "btn-loading" : ""}`;

  const onDownloadAddressTemplate = async () => {
    try {
      setLoading(true);
      const response = await getCustomerAddressTemplateCsvFile();
      const file = new Blob([response.data]);
      const fileURL = URL.createObjectURL(file);
      const a = document.createElement("a");
      a.href = fileURL;
      a.download = `CustomerAddressTemplate:${new Date().toISOString()}.csv`;
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
  return (
    <div className="d-grid">
      <Button
        disabled={loading}
        className={btnClassName}
        label="Download"
        onClick={onDownloadAddressTemplate}
      />
      {messageBody ? <MessageBody {...messageBody} /> : null}
    </div>
  );
}
