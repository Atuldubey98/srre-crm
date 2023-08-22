import { ChangeEventHandler } from "react";
import Input from "../../common/Input";
export type FilterUsersProps = {
  search: string;
  onChangeSearch: ChangeEventHandler<HTMLInputElement>;
};
export default function FilterUsers(props: FilterUsersProps) {
  const { onChangeSearch, search } = props;
  return (
    <div className="filter__users">
      <Input
        value={search}
        placeholder="Search Users"
        onChange={onChangeSearch}
      />
    </div>
  );
}
