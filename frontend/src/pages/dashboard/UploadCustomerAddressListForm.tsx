import { isAxiosError } from "axios";
import { useState, ChangeEventHandler, FormEventHandler } from "react";
import Button from "../../common/Button";
import MessageBody, { MessageBodyProps } from "../../common/MessageBody";
import SelectCustomers, {
  SelectCustomersProps,
} from "../reports/SelectCustomers";
import { uploadCustomerAddressTemplateCsvFile } from "./dashApi";
import { Customer } from "../reports/interfaces";
import Input from "../../common/Input";

export default function UploadCustomerAddressListForm() {
  const [customerId, setCustomerId] = useState<string>("");
  const [messageBody, setMessageBody] = useState<MessageBodyProps | null>(null);
  const [addressListFile, setAddressListFile] = useState<File | null>(null);
  const onChangeAddressFile: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.currentTarget.files) {
      setAddressListFile(e.currentTarget.files[0]);
    }
  };
  const onChangeCustomerField = (customerItem: Customer | null) => {
    if (customerItem) {
      setCustomerId(customerItem._id);
    }
  };

  const selectCustomerProps: SelectCustomersProps = {
    customer: customerId,
    onChangeCustomerField,
    customerFieldDisabled: false,
  };
  const onSubmitForm: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const errorMessage = !customerId
      ? "Select a customer from drop down"
      : !addressListFile
      ? "Select a template"
      : "";
    if (errorMessage) {
      setMessageBody({
        type: "error",
        body: errorMessage,
      });
    } else {
      try {
        if (addressListFile) {
          const { data } = await uploadCustomerAddressTemplateCsvFile(
            customerId,
            addressListFile
          );
          setMessageBody({
            type: "success",
            body: data.message,
          });
          setCustomerId("");
          setAddressListFile(null);
        }
      } catch (error) {
        setMessageBody({
          type: "error",
          body: isAxiosError(error)
            ? error.response?.data.message
            : "Network error occured",
        });
      }
    }
  };
  return (
    <form onSubmit={onSubmitForm} className="form">
      <SelectCustomers {...selectCustomerProps} />
      <p>Step 3: Do not change anything in the first row of csv file</p>
      <div className="form__labelField">
        <label htmlFor="addressList">Select the template :*</label>
        <Input
          type="file"
          required
          accept=".csv"
          name="addressList"
          onChange={onChangeAddressFile}
        />
      </div>
      {addressListFile && customerId ? (
        <Button
          type="submit"
          label="Upload Address"
          className="btn btn-success"
        />
      ) : null}
      {messageBody ? <MessageBody {...messageBody} /> : null}
    </form>
  );
}
