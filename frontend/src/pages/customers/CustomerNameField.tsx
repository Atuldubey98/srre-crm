import { ChangeEventHandler } from "react";
import FormLabelField from "../../common/FormLabelField";
import DirectionForField from "../../common/DirectionForField";

export type CustomerNameFieldProps = {
  onChangeName: ChangeEventHandler<HTMLInputElement>;
  name: string;
};
export default function CustomerNameField(props: CustomerNameFieldProps) {
  const { onChangeName, name } = props;
  return (
    <>
      <DirectionForField directionText="Enter the customers name." />
      <FormLabelField
        input={{
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
