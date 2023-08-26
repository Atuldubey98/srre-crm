import { Link } from "react-router-dom";

export default function GoToLinksList() {
  const list = [
    {
      to: "/customers/new",
      label: "Add new customers",
    },
    {
      to: "/services/new",
      label: "Add new services",
    },
    {
      to: "/technicians/new",
      label: "Add new technician",
    },
    {
      to: "/reports/new",
      label: "Add new service report",
    },
  ];
  return (
    <ul className="links__list">
      {list.map((linkItem) => (
        <li key={linkItem.to}>
          <Link to={linkItem.to}>{linkItem.label}</Link>
        </li>
      ))}
    </ul>
  );
}
