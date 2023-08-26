import { useMatch, useNavigate } from "react-router-dom";
import Button from "../../common/Button";
import "./OperationBtnsGroup.css";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import Input from "../../common/Input";
export type OperationBtnsGroupProps = {
  navigationUrl: string;
  operationLabel: string;
  searchPlaceHolder: string;
  searchUrl: string;
};
export default function OperationBtnsGroup(props: OperationBtnsGroupProps) {
  const navigate = useNavigate();
  const pathnameMatch = useMatch(location.pathname);
  const isAddForm = pathnameMatch?.pathnameBase === props.navigationUrl;
  const [search, setSearch] = useState<string>("");
  const onChangeSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearch(e.currentTarget.value);
  };
  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    navigate(`${props.searchUrl}/${search}`);
  };
  return isAddForm ? null : (
    <section className="operations__btns d-flex-center">
      <Button
        label={props.operationLabel}
        className="btn btn-success"
        onClick={() => navigate(props.navigationUrl)}
      />
      <form className="d-flex-center" onSubmit={onSubmit}>
        <Input
          type="text"
          id="search"
          placeholder={props.searchPlaceHolder}
          value={search}
          required
          onChange={onChangeSearch}
        />
        <Button label="Search" className="btn btn-action" />
      </form>
    </section>
  );
}
