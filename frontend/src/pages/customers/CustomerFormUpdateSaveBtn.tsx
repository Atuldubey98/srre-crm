import { useMatch } from "react-router-dom";
import Button from "../../common/Button";
export type CustomerFormUpdateSaveBtnProps = {
  customerId: string;
  isSubmitBtnDisabled: boolean;
};
export default function CustomerFormUpdateSaveBtn(
  props: CustomerFormUpdateSaveBtnProps
) {
  const pathnameMatch = useMatch(location.pathname);
  const isUpdateForm =
    pathnameMatch?.pathnameBase === `/customers/${props.customerId}/edit`;
  return (
    <div className="d-flex-center">
      {isUpdateForm ? (
        <Button
          label="Update Customer"
          disabled={props.isSubmitBtnDisabled}
          className="btn btn-info"
          type="submit"
        />
      ) : (
        <Button
          label="Save"
          type="submit"
          className="btn btn-success"
          disabled={props.isSubmitBtnDisabled}
        />
      )}
    </div>
  );
}
