import { Link, useLocation } from "react-router-dom";
import AdminWrapper from "./AdminWrapper";
import "./HeaderLink.css";
export type HeaderLinkProps = {
  isAuthenticationRequired: boolean;
  label: string;
  to: string;
};
export default function HeaderLink(props: HeaderLinkProps) {
  const { isAuthenticationRequired, label, to } = props;
  const location = useLocation();
  const className = `header__link ${
    location.pathname === to ? "header__linkSelected" : ""
  }`;
  return isAuthenticationRequired ? (
    <AdminWrapper>
      <li className={className}>
        <Link to={to}>{label}</Link>
      </li>
    </AdminWrapper>
  ) : (
    <li className={className}>
      <Link to={to}>{label}</Link>
    </li>
  );
}
