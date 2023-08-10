import { ChangeEventHandler } from "react";
import "./WorkDescriptionField.css";
export type WorkDescriptionFieldProps = {
  description: string;
  onChangeReportField: ChangeEventHandler<HTMLTextAreaElement>;
};
export default function WorkDescriptionField(props: WorkDescriptionFieldProps) {
  return (
    <div className="form__labelField form__fieldTextArea">
      <label htmlFor="description">Work Done Description</label>
      <textarea
        name="description"
        value={props.description}
        onChange={props.onChangeReportField}
      />
    </div>
  );
}
