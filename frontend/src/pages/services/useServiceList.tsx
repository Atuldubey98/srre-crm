import { useState, ChangeEventHandler, useEffect } from "react";
import { FilterServicesProps } from "./FilterServices";
import { Service, ServiceFilter } from "./interfaces";
import { getAllServices } from "./servicesApi";
import { useParams } from "react-router-dom";

export default function useServiceList() {
  const [filter, setFilter] = useState<ServiceFilter>({
    typeOfAC: "all",
    serviceName: "",
  });
  const onChangeACType: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setFilter({ ...filter, typeOfAC: e.currentTarget.value });
  };
  const onChangeServiceName: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFilter({ ...filter, serviceName: e.currentTarget.value });
  };
  const [services, setServices] = useState<Service[]>([]);
  const { serviceId = "" } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const { data: response } = await getAllServices(filter.typeOfAC);
        setServices(response.data);
      } catch (error) {}
    })();
  }, [filter.typeOfAC, serviceId]);
  const filterProps: FilterServicesProps = {
    onChangeACType,
    onChangeServiceName,
    filter,
  };
  return { filterProps, services };
}
