import { useLocation, useNavigate } from "react-router-dom";
import { getDateByCustomerCreationDate } from "../../utils/dateUtils";
import { Service, acOptions } from "./interfaces";
import "./ServiceItem.css";
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
  const className = `service__item ${
    location.pathname === `/services/${service._id}`
      ? "selected__serviceItem"
      : ""
  }`;
  return (
    <li onClick={onNavigateToAbout} key={service._id} className={className}>
      <div className="service">
        <span className="service__acType">{service.serviceName}</span>
      </div>
      <div className="service__dates">
        <span>{`${getDateByCustomerCreationDate(service.createdAt)} | `}</span>
        <span className="service">{acOptions[service.typeOfAC]}</span>
      </div>
    </li>
  );
}
