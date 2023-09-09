import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { useAuth } from "./useAuth";
import "./AuthenticatedUserHeader.css";
import UserRoleName from "./UserRoleName";
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
        className="btn btn-primary"
        label="Logout"
        onClick={onLogoutClick}
      />
    </div>
  );
}
