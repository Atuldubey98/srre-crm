import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { Employee } from "../pages/login/interfaces";
import "./UserItem.css";
function UserItemElement(user: Employee) {
  const navigate = useNavigate();
  const onClickUserItem = () => {
    navigate(`/users/${user._id}`);
  };
  return (
    <li onClick={onClickUserItem} className="user__item" key={user._id}>
      <p className="user__itemName">{user.name}</p>
      <p>{user.email}</p>
    </li>
  );
}
const UserItem = memo(UserItemElement);
export default UserItem;
