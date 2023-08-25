import AuthenticatedUserHeader from "./AuthenticatedUserHeader";
import Banner from "./Banner";
import "./Header.css";
import HeaderLink from "./HeaderLink";
export default function Header() {
  const navigtationLinks = [
    {
      to: "/dashboard",
      label: "Dashboard",
      isAuthenticationRequired: false,
    },
    {
      to: "/customers",
      label: "Customers",
      isAuthenticationRequired: false,
    },
    {
      to: "/services",
      label: "Services",
      isAuthenticationRequired: false,
    },
    {
      to: "/technicians",
      label: "Technicians",
      isAuthenticationRequired: false,
    },
    {
      to: "/reports",
      label: "Service-Reports",
      isAuthenticationRequired: false,
    },
    {
      to: "/users",
      label: "Users",
      isAuthenticationRequired: true,
    },
  ];
  return (
    <header className="d-flex-center">
      <Banner />
      <ul className="header__links d-flex-center">
        {navigtationLinks.map((headerLinkProp) => (
          <HeaderLink {...headerLinkProp} key={headerLinkProp.to} />
        ))}
      </ul>
      <AuthenticatedUserHeader />
    </header>
  );
}
