import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Service } from "./interfaces";
import { getServiceById } from "./servicesApi";

export default function useServiceAbout() {
  const { serviceId = "" } = useParams();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      try {
        if (!serviceId) {
          setService(null);
          return;
        }
        setLoading(true);
        const { data } = await getServiceById(serviceId);
        setService(data.data);
      } catch (error) {
        setService(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [serviceId]);

  return { service, loading };
}
