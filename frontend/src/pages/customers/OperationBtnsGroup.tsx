import { useMatch, useNavigate } from "react-router-dom";
import Button from "../../common/Button";
import "./OperationBtnsGroup.css";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import Input from "../../common/Input";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FcSearch } from "react-icons/fc";
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
        children={<IoIosAddCircleOutline />}
        label={props.operationLabel}
        className="btn btn-success d-flex-center"
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
        <Button
          label="Search"
          className="btn btn-action d-flex-center"
          children={<FcSearch />}
        />
      </form>
    </section>
  );
}
