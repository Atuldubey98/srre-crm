import { ChangeEventHandler, useEffect, useState } from "react";
import { Technician } from "./interfaces";
import { useParams } from "react-router-dom";
import { getAllTechnicials } from "./techiesApi";

export default function useTechnicians() {
  const [technicians, setTechnicians] = useState<Technician[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { technicianId = "" } = useParams();
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
  }, [technicianId]);
  const onChangeFilter: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFilter(e.currentTarget.value);
  };
  const filterProps = {
    onChangeFilter,
    filter,
  };
  return { technicians, loading, filterProps };
}
