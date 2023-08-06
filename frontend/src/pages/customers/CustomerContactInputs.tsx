import { ChangeEventHandler } from "react";
import Input from "../../common/Input";
import { Contact } from "./interfaces";

export type CustomerContactInputsProps = {
  contact?: Contact;
  onChangeContact: ChangeEventHandler<HTMLInputElement>;
};
export default function CustomerContactInputs(
  props: CustomerContactInputsProps
) {
  return (
    <div className="form__control">
      <label htmlFor="location">Contact :</label>
      <Input
        name="name"
        placeholder="Contact person name"
        value={props.contact?.name}
        onChange={props.onChangeContact}
      />
      <Input
        name="phoneNumber"
        type="tel"
        placeholder="Contact person phone number"
        value={props.contact?.phoneNumber}
        onChange={props.onChangeContact}
      />
    </div>
  );
}
