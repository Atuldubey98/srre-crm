import { ChangeEventHandler, useEffect, useState } from "react";
import { Technician } from "./interfaces";
import { useLocation, useParams } from "react-router-dom";
import { getAllTechnicials } from "./techiesApi";

export default function useTechnicians() {
  const [technicians, setTechnicians] = useState<Technician[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const location = useLocation();
  const { technicianId = "" } = useParams();
  const isUpdateForm =
    location.pathname === `/technicians/${technicianId}/edit`;
  const [filter, setFilter] = useState<string>("");
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await getAllTechnicials();
        setTechnicians(data.data);
      } catch (error) {
        setTechnicians(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [technicianId, isUpdateForm]);
  const onChangeFilter: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFilter(e.currentTarget.value);
  };
  const filterProps = {
    onChangeFilter,
    filter,
  };
  return { technicians, loading, filterProps };
}
