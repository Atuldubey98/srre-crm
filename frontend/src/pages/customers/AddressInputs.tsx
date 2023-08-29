import Button from "../../common/Button";
import Input from "../../common/Input";
import "./AddressInputs.css";
import { CustomerAddressInputItem } from "./CustomerAddressInputItem";
import { Address } from "./interfaces";
import useSearchAddress from "./useSearchAddress";
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
  const { query, onChangeQuery, addressList } = useSearchAddress(
    props.address || []
  );

  return (
    <div className="form__control">
      <Input
        type="search"
        id="searchAddress"
        value={query}
        onChange={onChangeQuery}
        placeholder="Search Address"
      />
      <label htmlFor="location">Location :*</label>
      {addressList.map((address) => (
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
