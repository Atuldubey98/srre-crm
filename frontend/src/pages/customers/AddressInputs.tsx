import { GrClose } from "react-icons/gr";
import Button from "../../common/Button";
import Input from "../../common/Input";
import { Address } from "./interfaces";
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
      <label htmlFor="location">Location :</label>
      <div className="d-flex-center">
        <Button
          type="button"
          className="btn btn-small"
          label="Add Address"
          onClick={props.onAddAddress}
        />
      </div>
      {props.address?.map((address) => (
        <div key={address._id} className="customer__address d-flex-center">
          <Input
            name="location"
            required
            value={address.location}
            onChange={(e) => {
              props.onChangeAddress(e, address._id);
            }}
          />
          <GrClose
            onClick={() => {
              props.onRemoveAddress(address._id);
            }}
          />
        </div>
      ))}
    </div>
  );
}
