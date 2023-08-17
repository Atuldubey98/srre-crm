import { useState, ChangeEventHandler, FormEventHandler, memo } from "react";
import Button from "../../common/Button";
import Input from "../../common/Input";
import OperationBtnsGroup from "../customers/OperationBtnsGroup";
import { useNavigate } from "react-router-dom";

const SearchReportFormElement = () => {
  const [searchReportId, setSearchReportId] = useState<string>("");
  const navigate = useNavigate();
  const onChangeSearchReportId: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchReportId(e.currentTarget.value);
  };
  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    navigate(`/reports/${searchReportId}`);
  };
  return (
    <OperationBtnsGroup
      navigationUrl="/reports/new"
      operationLabel="Add new report"
    >
      <form className="d-flex-center" onSubmit={onSubmit}>
        <Input
          type="text"
          placeholder="Search By Report Id"
          value={searchReportId}
          required
          onChange={onChangeSearchReportId}
        />
        <Button label="Search" className="btn btn-info" />
      </form>
    </OperationBtnsGroup>
  );
};
const SearchReportForm = memo(SearchReportFormElement);
export default SearchReportForm;
