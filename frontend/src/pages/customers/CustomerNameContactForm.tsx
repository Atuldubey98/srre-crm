import { ChangeEventHandler, FormEventHandler, useState } from "react";
import Button from "../../common/Button";
import FormLabelField from "../../common/FormLabelField";
import { CustomerNameContact } from "./CustomerForm";
import CustomerNameField from "./CustomerNameField";
import { addNewCustomer, updateCustomerById } from "./customersApi";
import MessageBody, { MessageBodyProps } from "../../common/MessageBody";
import { isAxiosError } from "axios";
import { PlainCustomer } from "./interfaces";
export type CustomerNameContactFormProps = {
  customerNameContact: CustomerNameContact | null;
  onSetCustomerNameContact: (value: CustomerNameContact) => void;
  onChangeCustomerContact: ChangeEventHandler<HTMLInputElement>;
  onCustomerAdd: (customer: PlainCustomer) => void;
};
export default function CustomerNameContactForm(
  props: CustomerNameContactFormProps
) {
  const { customerNameContact, onChangeCustomerContact } = props;
  const [messageBody, setMessageBody] = useState<MessageBodyProps | null>(null);
  const onCustomerContactFormSubmit: FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    try {
      if (customerNameContact) {
        const formState = customerNameContact._id
          ? "Customer updated"
          : "Customer added";
        const { data } = customerNameContact._id
          ? await updateCustomerById(
              customerNameContact._id,
              customerNameContact
            )
          : await addNewCustomer(customerNameContact);
        if (!customerNameContact._id) {
          props.onCustomerAdd(data.data);
        }
        props.onSetCustomerNameContact({
          _id: data.data._id,
          name: data.data.name,
          contactName: data.data.contact ? data.data.contact.name : "",
          contactPhoneNumber: data.data.contact
            ? data.data.contact.phoneNumber || ""
            : "",
        });

        setMessageBody({
          type: "success",
          body: formState,
        });
      }
    } catch (error) {
      setMessageBody({
        type: "error",
        body: isAxiosError(error)
          ? error.response?.data.message
          : "Network error occured",
      });
    } finally {
      setTimeout(() => {
        setMessageBody(null);
      }, 1000);
    }
  };
  const btnClass = customerNameContact?._id
    ? "btn btn-info"
    : "btn btn-success";
  return (
    <form onSubmit={onCustomerContactFormSubmit} className="form">
      <CustomerNameField
        onChangeName={onChangeCustomerContact}
        name={customerNameContact?.name || ""}
      />
      <FormLabelField
        input={{
          value: customerNameContact?.contactName || "",
          onChange: onChangeCustomerContact,
          name: "contactName",
        }}
        label="Contact Name"
      />
      <FormLabelField
        input={{
          value: customerNameContact?.contactPhoneNumber || "",
          onChange: onChangeCustomerContact,
          name: "contactPhoneNumber",
        }}
        label="Contact Phone Number"
      />
      <div className="d-grid">
        <Button
          label={customerNameContact?._id ? "Update Customer" : "Submit"}
          className={btnClass}
        />
        {messageBody ? <MessageBody {...messageBody} /> : null}
      </div>
    </form>
  );
}
