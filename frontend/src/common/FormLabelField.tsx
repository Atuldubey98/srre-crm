import Input, { InputProps } from "./Input";
import './FormLabelField.css'
export type FormLabelFieldProps = {
  input: InputProps;
  label: string;
};
export default function FormLabelField(props: FormLabelFieldProps) {
  return (
    <div className="form__labelField d-grid">
      <label htmlFor={props.input.name}>{props.label}</label>
      <Input {...props.input} />
    </div>
  );
}
