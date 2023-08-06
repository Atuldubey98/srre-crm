import { Link } from "react-router-dom";
import Banner from "./Banner";
import "./Header.css";
export default function Header() {
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
      </ul>
    </header>
  );
}
