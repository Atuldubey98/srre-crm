import { useNavigate } from "react-router-dom";
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
  return (
    <li onClick={onNavigateToAbout} key={service._id} className="service__item">
      <div className="service">
        <span className="service__acType">{acOptions[service.typeOfAC]}</span> :
        <span>{service.serviceName}</span>
      </div>
      <div className="service__dates">
        <span>{getDateByCustomerCreationDate(service.createdAt)}</span>
      </div>
    </li>
  );
}
