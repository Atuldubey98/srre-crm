import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Service } from "./interfaces";
import { getServiceById } from "./servicesApi";

export default function useServiceAbout() {
  const { serviceId = "" } = useParams();
  const [service, setService] = useState<Service | null>(null);

  useEffect(() => {
    (async () => {
      if (!serviceId) {
        setService(null);
        return;
      }
      const { data } = await getServiceById(serviceId);
      setService(data.data);
    })();
  }, [serviceId]);
 
  return { service, };
}
