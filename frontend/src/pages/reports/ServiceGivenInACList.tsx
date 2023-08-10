import { Service } from "../services/interfaces";

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
            {service.serviceName}
          </li>
        ))}
      </ul>
    </div>
  ) : null;
}
