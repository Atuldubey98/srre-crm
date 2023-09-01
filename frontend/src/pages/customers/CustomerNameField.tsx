import { ChangeEventHandler } from "react";
import FormLabelField from "../../common/FormLabelField";
import DirectionForField from "../../common/DirectionForField";

export type CustomerNameFieldProps = {
  onChangeName: ChangeEventHandler<HTMLInputElement>;
  name: string;
  disabled?: boolean;
};
export default function CustomerNameField(props: CustomerNameFieldProps) {
  const { onChangeName, name, disabled } = props;
  return (
    <>
      <DirectionForField directionText="Enter the customers name." />
      <FormLabelField
        input={{
          disabled,
          minLength: 3,
          type: "text",
          id: "name",
          required: true,
          onChange: onChangeName,
          name: "name",
          value: name,
        }}
        label="Customer Name :*"
      />
    </>
  );
}
