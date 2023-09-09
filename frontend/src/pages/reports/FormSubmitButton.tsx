import { useParams, useMatch, useLocation } from "react-router-dom";
import Button from "../../common/Button";
import { MdOutlineAdd, MdUpdate } from "react-icons/md";

export type FormSubmitButtonProps = {
  isSubmitBtnDisbaled: boolean;
  loading: boolean;
};
export default function FormSubmitButton(props: FormSubmitButtonProps) {
  const { reportId = "" } = useParams();
  const location = useLocation();
  const pathnameMatch = useMatch(location.pathname);
  const isUpdateForm =
    pathnameMatch?.pathnameBase === `/reports/${reportId}/edit`;
  const btnClassName = `btn d-flex-center ${reportId ? "btn-info" : "btn-success"} ${
    props.loading ? "btn-loading" : ""
  }`;
  return (
    <div className="d-flex-center">
      {isUpdateForm ? (
        <Button
          type="submit"
          children={<MdUpdate />}
          label="Update Report"
          className={btnClassName}
          disabled={props.isSubmitBtnDisbaled}
        />
      ) : (
        <Button
          children={<MdOutlineAdd />}
          type="submit"
          label="Add Report"
          className={btnClassName}
          disabled={props.isSubmitBtnDisbaled}
        />
      )}
    </div>
  );
}
