import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { useAuth } from "./useAuth";
import "./AuthenticatedUserHeader.css";
import UserRoleName from "./UserRoleName";
import { FiLogOut } from "react-icons/fi";
export default function AuthenticatedUserHeader() {
  const navigate = useNavigate();
  const authContext = useAuth();
  const onLogoutClick = () => {
    if (confirm("Do you want to logout ?")) {
      localStorage.clear();
      navigate("/login", { replace: true });
      if (authContext) {
        authContext.onSetCurrentUser(null);
      }
    }
  };
  return (
    <div className="auth__userHeader d-flex-center">
      <UserRoleName />
      <Button
        children={<FiLogOut />}
        className="btn btn-primary d-flex-center"
        label="Logout"
        onClick={onLogoutClick}
      />
    </div>
  );
}
