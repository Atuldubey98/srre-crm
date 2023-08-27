import { Link } from "react-router-dom";
import { Service } from "../services/interfaces";
import './ServiceGivenInACList.css';
export type ServiceGivenInACListProps = {
  services: Service[] | undefined | null;
};
export default function ServiceGivenInACList(props: ServiceGivenInACListProps) {
  const { services } = props;
  return services ? (
    <div className="report__field">
      <h4 className="field">Services Given in AC :</h4>
      <ul className="services__givenList">
        {services.map((service) => (
          <li key={service._id} className="service__given">
            <Link to={`/services/${service._id}`}>{service.serviceName}</Link>
          </li>
        ))}
      </ul>
    </div>
  ) : null;
}
