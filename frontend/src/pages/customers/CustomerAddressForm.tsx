import { isAxiosError } from "axios";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import Button from "../../common/Button";
import Input from "../../common/Input";
import MessageBody, { MessageBodyProps } from "../../common/MessageBody";
import "./CustomerAddressForm.css";
import {
  addCustomerAddressByCustomerId,
  deleteCustomerAddressById,
  getCountOfReportsByAddressId,
  updateAddressOfCustomerByAddressId,
} from "./customersApi";
import { Address } from "./interfaces";
export type CustomerAddressFormProps = {
  formAddress: Address | null;
  customerId: string;
  removeCustomerAddress: (addressId: string) => void;
  onAddCustomerAddress: (address: Address) => void;
  onChangeFormAddress: ChangeEventHandler<HTMLInputElement>;
  onSetFormAddress: (value: Address | null) => void;
};
export default function CustomerAddressForm(props: CustomerAddressFormProps) {
  const { formAddress, onChangeFormAddress, customerId, onAddCustomerAddress } =
    props;
  const [messageBody, setMessageBody] = useState<MessageBodyProps | null>(null);

  const onSubmitAddressForm: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      if (formAddress) {
        const response = formAddress._id
          ? await updateAddressOfCustomerByAddressId(
              formAddress._id,
              customerId,
              formAddress
            )
          : await addCustomerAddressByCustomerId(customerId, formAddress);
        onAddCustomerAddress(response.data.data);
      }
      props.onSetFormAddress(null);
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
  const btnClassName = formAddress?._id ? "btn btn-action" : "btn btn-success";
  async function onDeleteAddress() {
    try {
      if (formAddress) {
        const { data } = await getCountOfReportsByAddressId(formAddress?._id);
        if (data.data.canBeDeleted) {
          props.onSetFormAddress(null);
          await deleteCustomerAddressById(customerId, formAddress._id);
          props.removeCustomerAddress(formAddress._id);
        } else {
          setMessageBody({
            type: "error",
            body: "Report exists for address",
          });
        }
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

  return (
    <section className="customer__addressForm">
      {formAddress ? (
        <form onSubmit={onSubmitAddressForm} className="form address__form">
          <div className="form__labelField">
            <label htmlFor="location">Customer address *</label>
            <Input
              name="location"
              id="location"
              value={formAddress?.location || ""}
              onChange={onChangeFormAddress}
            />
          </div>
          <div className="d-grid btn-group">
            {messageBody ? <MessageBody {...messageBody} /> : null}
            <Button
              type="submit"
              label={formAddress._id ? "Update" : "Submit"}
              className={btnClassName}
            />
            {formAddress._id ? (
              <Button
                onClick={onDeleteAddress}
                type="button"
                label="Delete Address"
                className="btn btn-danger"
              />
            ) : null}
          </div>
        </form>
      ) : (
        <div className="d-flex-center">
          <Button
            className="btn btn-info btn-action btn-small"
            label="Add address"
            onClick={() =>
              props.onSetFormAddress({
                _id: "",
                location: "",
              })
            }
          />
        </div>
      )}
    </section>
  );
}
