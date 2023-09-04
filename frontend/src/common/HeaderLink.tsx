import { NavLink } from "react-router-dom";
import AdminWrapper from "./AdminWrapper";
import "./HeaderLink.css";
export type HeaderLinkProps = {
  isAuthenticationRequired: boolean;
  label: string;
  to: string;
};
export default function HeaderLink(props: HeaderLinkProps) {
  const { isAuthenticationRequired, label, to } = props;

  const headerLinkPendingClassName = "header__link headerLink__pending";
  const headerLinkActiveClassName = "header__link headerLink__active";
  return isAuthenticationRequired ? (
    <AdminWrapper>
      <li className="header__link">
        <NavLink
          className={({ isActive, isPending }) =>
            isPending
              ? headerLinkPendingClassName
              : isActive
              ? headerLinkActiveClassName
              : "header__link"
          }
          to={to}
        >
          {label}
        </NavLink>
      </li>
    </AdminWrapper>
  ) : (
    <li>
      <NavLink
        className={({ isActive, isPending }) =>
          isPending
            ? headerLinkPendingClassName
            : isActive
            ? headerLinkActiveClassName
            : "header__link"
        }
        to={to}
      >
        {label}
      </NavLink>
    </li>
  );
}
