import { ChangeEventHandler } from "react";
import "./WorkDescriptionField.css";
export type WorkDescriptionFieldProps = {
  description: string;
  disabled?: boolean;
  onChangeReportField: ChangeEventHandler<HTMLTextAreaElement>;
};
export default function WorkDescriptionField(props: WorkDescriptionFieldProps) {
  return (
    <div className="form__labelField form__fieldTextArea">
      <label htmlFor="description">Work Done Description</label>
      <textarea
        disabled={props.disabled}
        name="description"
        value={props.description}
        onChange={props.onChangeReportField}
      />
    </div>
  );
}
