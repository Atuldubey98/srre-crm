import { Link, useNavigate } from "react-router-dom";
import Banner from "./Banner";
import "./Header.css";
import { useAuth } from "./useAuth";
import Button from "./Button";
import AdminWrapper from "./AdminWrapper";
export default function Header() {
  const authContext = useAuth();
  const navigate = useNavigate();
  const onLogoutClick = () => {
    if (confirm("Do you want to logout ?")) {
      localStorage.clear();
      navigate("/login", { replace: true });
    }
  };
  return (
    <header className="d-flex-center">
      <Banner />
      <ul className="header__links d-flex-center">
        <li>
          <Link to={"/customers"}>Customers</Link>
        </li>
        <li>
          <Link to={"/services"}>Services</Link>
        </li>
        <li>
          <Link to={"/technicians"}>Technicians</Link>
        </li>
        <li>
          <Link to={"/reports"}>Service-Reports</Link>
        </li>
        <AdminWrapper>
          <li>
            <Link to={"/users"}>Users</Link>
          </li>
        </AdminWrapper>
        <li className="header__link d-flex-center">
          <span className="header__user">
            {authContext?.currentUser?.name} | {authContext?.currentUser?.role}
          </span>
          <Button
            className="btn btn-primary"
            label="Logout"
            onClick={onLogoutClick}
          />
        </li>
      </ul>
    </header>
  );
}
