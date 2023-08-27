import { Link } from "react-router-dom";

export type ReportLinkFieldProps = {
  fieldName: string;
  linkLabel: string;
  to: string;
};
export default function ReportLinkField(props: ReportLinkFieldProps) {
  return props.linkLabel ? (
    <div className="report__field">
      <span className="field">{props.fieldName} :</span>
      <Link className="report__fieldValue" to={props.to}>{props.linkLabel}</Link>
    </div>
  ) : null;
}
