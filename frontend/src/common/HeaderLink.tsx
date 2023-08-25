import { Link } from "react-router-dom";
import AdminWrapper from "./AdminWrapper";
import './HeaderLink.css';
export type HeaderLinkProps = {
  isAuthenticationRequired: boolean;
  label: string;
  to: string;
};
export default function HeaderLink(props: HeaderLinkProps) {
  const { isAuthenticationRequired, label, to } = props;
  return isAuthenticationRequired ? (
    <AdminWrapper>
      <li>
        <Link to={to}>{label}</Link>
      </li>
    </AdminWrapper>
  ) : (
    <li>
      <Link to={to}>{label}</Link>
    </li>
  );
}
