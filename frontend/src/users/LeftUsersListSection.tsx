import { ListSection } from "../common/PageLeftRight";
import { Employee } from "../pages/login/interfaces";
import FilterUsers from "./FilterUsers";
import "./LeftUsersListSection.css";
import UserItem from "./UserItem";
export type LeftUsersListSectionProps = {
  usersList: Employee[] | null;
};
export default function LeftUsersListSection(props: LeftUsersListSectionProps) {
  const { usersList } = props;
  return (
    <ListSection>
      <FilterUsers />
      <ul className="users__list">
        {usersList
          ? usersList.map((user) => <UserItem key={user._id} {...user} />)
          : null}
      </ul>
     
    </ListSection>
  );
}
