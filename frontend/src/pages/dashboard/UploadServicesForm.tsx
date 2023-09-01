import { ChangeEventHandler, FormEventHandler, useState } from "react";
import Button from "../../common/Button";
import Input from "../../common/Input";
import MessageBody, { MessageBodyProps } from "../../common/MessageBody";
import { uploadServicesTemplate } from "./dashApi";
import { isAxiosError } from "axios";
export default function UploadServicesForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const btnClassName = `btn btn-success ${loading ? "btn-loading" : ""}`;

  const [messageBody, setMessageBody] = useState<MessageBodyProps | null>(null);
  const [servicesTemplate, setServicesTemplate] = useState<File | null>(null);
  const onChangeServicesFileTemplate: ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    if (e.currentTarget.files) {
      setServicesTemplate(e.currentTarget.files[0]);
    }
  };
  const onSubmitTemplate: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      if (!servicesTemplate) {
        setMessageBody({ type: "error", body: "Please specify the template" });
        return;
      }
      setLoading(true);
      const { data } = await uploadServicesTemplate(servicesTemplate);
      setMessageBody({ type: "success", body: data.message });
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
    <form onSubmit={onSubmitTemplate} className="form">
      <Input
        disabled={loading}
        required
        type="file"
        accept=".csv"
        name="services"
        onChange={onChangeServicesFileTemplate}
      />
      {servicesTemplate ? (
        <Button label="Upload" className={btnClassName} disabled={loading} />
      ) : null}
      {messageBody ? <MessageBody {...messageBody} /> : null}
    </form>
  );
}
