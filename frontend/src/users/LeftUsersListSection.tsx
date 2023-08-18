import { ChangeEventHandler, useDeferredValue, useMemo, useState } from "react";
import { ListSection } from "../common/PageLeftRight";
import { Employee } from "../pages/login/interfaces";
import FilterUsers, { FilterUsersProps } from "./FilterUsers";
import "./LeftUsersListSection.css";
import UserItem from "./UserItem";
export type LeftUsersListSectionProps = {
  usersList: Employee[] | null;
};
export default function LeftUsersListSection(props: LeftUsersListSectionProps) {
  const { usersList } = props;
  const [search, setSearch] = useState<string>("");
  const deferedSearch = useDeferredValue(search);
  const userMemoizedList = useMemo(() => {
    return (usersList || [])?.filter((user) =>
      deferedSearch
        ? user.name
            .toLocaleLowerCase()
            .startsWith(deferedSearch.toLocaleLowerCase())
        : true
    );
  }, [deferedSearch, usersList]);
  const onChangeSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearch(e.currentTarget.value);
  };
  const filterUserProps: FilterUsersProps = {
    search,
    onChangeSearch,
  };
  return (
    <ListSection>
      <FilterUsers {...filterUserProps} />
      <ul className="users__list">
        {userMemoizedList.map((user) => (
          <UserItem key={user._id} {...user} />
        ))}
      </ul>
    </ListSection>
  );
}
