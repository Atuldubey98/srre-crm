import { useMatch, useNavigate } from "react-router-dom";
import Button from "../../common/Button";
import "./OperationBtnsGroup.css";
export type OperationBtnsGroupProps = {
  navigationUrl: string;
  operationLabel: string;
};
export default function OperationBtnsGroup(props: OperationBtnsGroupProps) {
  const navigate = useNavigate();
  const pathnameMatch = useMatch(location.pathname);
  const isAddForm = pathnameMatch?.pathnameBase === props.navigationUrl;

  return isAddForm ? null : (
    <section className="operations__btns d-flex-center">
      <Button
        label={props.operationLabel}
        className="btn btn-success"
        onClick={() => navigate(props.navigationUrl)}
      />
    </section>
  );
}
