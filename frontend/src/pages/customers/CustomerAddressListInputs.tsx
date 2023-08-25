import DirectionForField from "../../common/DirectionForField";
import AddressInputs, { AddressInputsProps } from "./AddressInputs";

export type CustomerAddressListInputsProps = {
  addressInputProps: AddressInputsProps;
};
export default function CustomerAddressListInputs(
  props: CustomerAddressListInputsProps
) {
  return (
    <>
      <DirectionForField
        directionText={`Fill the address fields listed below and press "Add Address"`}
      />
      <AddressInputs {...props.addressInputProps} />
    </>
  );
}
