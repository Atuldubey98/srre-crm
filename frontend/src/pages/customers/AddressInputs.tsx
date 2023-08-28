import Button from "../../common/Button";
import { Address } from "./interfaces";
import "./AddressInputs.css";
import { CustomerAddressInputItem } from "./CustomerAddressInputItem";
export type AddressInputsProps = {
  address: Address[] | null;
  onChangeAddress: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    address: string
  ) => void;
  onAddAddress: VoidFunction;
  onRemoveAddress: (addressId: string) => void;
};
export default function AddressInputs(props: AddressInputsProps) {
  return (
    <div className="form__control">
      <label htmlFor="location">Location :*</label>
      {props.address?.map((address) => (
        <CustomerAddressInputItem
          key={address._id}
          address={address}
          onAddAddress={props.onAddAddress}
          onChangeAddress={props.onChangeAddress}
          onRemoveAddress={props.onRemoveAddress}
        />
      ))}
      <div className="d-flex-center">
        <Button
          type="button"
          className="btn btn-small"
          label="Add Address"
          onClick={props.onAddAddress}
        />
      </div>
    </div>
  );
}
