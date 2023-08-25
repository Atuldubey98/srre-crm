import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { useAuth } from "./useAuth";
import './AuthenticatedUserHeader.css'
export default function AuthenticatedUserHeader() {
  const navigate = useNavigate();
  const authContext = useAuth();
  const onLogoutClick = () => {
    if (confirm("Do you want to logout ?")) {
      localStorage.clear();
      navigate("/login", { replace: true });
    }
  };
  return (
    <div className="auth__userHeader d-flex-center">
      <span className="header__user">
        {authContext?.currentUser?.name} | {authContext?.currentUser?.role}
      </span>
      <Button
        className="btn btn-primary"
        label="Logout"
        onClick={onLogoutClick}
      />
    </div>
  );
}
