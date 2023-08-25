import { Link } from "react-router-dom";
import "./AddNewEntitiesListSidebar.css";
export default function AddNewEntitiesListSidebar() {
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
    <details>
      <summary
        style={{
          fontWeight: "bold",
        }}
      >
        Add new entities
      </summary>
      <ul className="links__list">
        {list.map((linkItem) => (
          <li key={linkItem.to}>
            <Link to={linkItem.to}>{linkItem.label}</Link>
          </li>
        ))}
      </ul>
    </details>
  );
}
