import { GrClose } from "react-icons/gr";
import Input from "../../common/Input";
import { Address } from "./interfaces";
import "./CustomerAddressInputItem.css";
import { ChangeEventHandler, useState } from "react";
import MessageBody, { MessageBodyProps } from "../../common/MessageBody";
import { isAxiosError } from "axios";
import { getCountOfReportsByAddressId } from "./customersApi";
export type CustomerAddressInputItemProps = {
  address: Address;
  onChangeAddress: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    address: string
  ) => void;
  onAddAddress: VoidFunction;
  onRemoveAddress: (addressId: string) => void;
};
export function CustomerAddressInputItem(props: CustomerAddressInputItemProps) {
  const { address } = props;
  const [messageBody, setMessageBody] = useState<MessageBodyProps | null>(null);
  const onDeleteAddressAndCheckIfReportExists = async () => {
    try {
      const { data } = await getCountOfReportsByAddressId(address._id);
      if (data.data.canBeDeleted) {
        props.onRemoveAddress(address._id);
      } else {
        setMessageBody({
          type: "error",
          body: "Report exists for address",
        });
        setDeleteAddressIdItem(address._id);
      }
    } catch (error) {
      setMessageBody({
        type: "error",
        body: isAxiosError(error)
          ? error.response?.data.message
          : "Network error occured",
      });
    }
  };
  const [deleteAddressIdItem, setDeleteAddressIdItem] = useState<string>("");
  const onChangeAddressInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    props.onChangeAddress(e, address._id);
  };
  const customerAddressClassName = `customer__address d-grid ${
    deleteAddressIdItem === address._id ? "customer__address" : ""
  }`;

  return (
    <div key={address._id} className={customerAddressClassName}>
      <div className="d-flex-center">
        <Input
          id={address._id}
          name="location"
          required
          value={address.location}
          onChange={onChangeAddressInput}
        />
        <GrClose
          className="cursor-pointer"
          onClick={onDeleteAddressAndCheckIfReportExists}
        />
      </div>
      {messageBody ? <MessageBody {...messageBody} /> : null}
    </div>
  );
}
