import { useLocation, useNavigate } from "react-router-dom";
import "./ServiceItem.css";
import { Service, acOptions } from "./interfaces";
export interface ServiceItemProps {
  service: Service;
}
export default function ServiceItem(props: ServiceItemProps) {
  const { service } = props;

  const navigate = useNavigate();
  const onNavigateToAbout = () => {
    navigate(`/services/${service._id}`);
  };
  const location = useLocation();
  const className = `border-radius-3 service__item ${
    location.pathname === `/services/${service._id}`
      ? "selected__serviceItem"
      : ""
  }`;
  return (
    <li onClick={onNavigateToAbout} key={service._id} className={className}>
      <div className="service">
        <span className="text-wrap service__acType">{service.serviceName}</span>
      </div>
      <div className="service__dates">
        <span>{`${new Date(service.createdAt || "").toLocaleDateString(
          "en-US",
          {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }
        )} | `}</span>
        <span className="service">{acOptions[service.typeOfAC]}</span>
      </div>
    </li>
  );
}
