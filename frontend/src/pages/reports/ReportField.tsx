export type ReportFieldProps = {
  fieldName: string;
  value: string | undefined;
};
import './ReportField.css'
export default function ReportField(props: ReportFieldProps) {
  return props.value ? (
    <div className="report__field">
      <span className="field">{props.fieldName} :</span>
      <span>{props.value}</span>
    </div>
  ) : null;
}
