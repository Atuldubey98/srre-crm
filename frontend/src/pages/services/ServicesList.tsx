import { useMemo } from "react";
import { ListSection } from "../../common/PageLeftRight";
import FilterServices from "./FilterServices";
import ServiceItem from "./ServiceItem";
import useServiceList from "./useServiceList";
import "./ServicesList.css";
export default function ServicesList() {
  const { filterProps, services: serviceList } = useServiceList();
  const services = useMemo(() => {
    return serviceList.filter(
      (service) =>
        service.serviceName
          .toLocaleLowerCase()
          .indexOf(filterProps.filter.serviceName.toLocaleLowerCase()) > -1
    );
  }, [serviceList, filterProps.filter]);
  return (
    <ListSection>
      <FilterServices {...filterProps} />
      <ul className="services__list d-grid">
        {services.map((service) => (
          <ServiceItem service={service} key={service._id} />
        ))}
      </ul>
    </ListSection>
  );
}
