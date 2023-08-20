import { memo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Employee } from "../pages/login/interfaces";
import "./UserItem.css";
function UserItemElement(user: Employee) {
  const navigate = useNavigate();
  const location = useLocation();
  const onClickUserItem = () => {
    navigate(`/users/${user._id}`);
  };
  const className = `user__item ${
    `/users/${user._id}` === location.pathname ? "selected__user__item" : ""
  }`;
  return (
    <li onClick={onClickUserItem} className={className} key={user._id}>
      <p className="user__itemName">{user.name}</p>
      <p>{user.email}</p>
    </li>
  );
}
const UserItem = memo(UserItemElement);
export default UserItem;
