import { useMemo } from "react";
import { RiCustomerService2Line } from "react-icons/ri";
import NotfoundItem from "../../common/NotfoundItem";
import { ListSection } from "../../common/PageLeftRight";
import FilterTechnicans from "./FilterTechnicans";
import "./TechiesList.css";
import TechnicianItem from "./TechnicianItem";
import useTechnicians from "./useTechnicians";
export default function TechiesList() {
  const { technicians, filterProps } = useTechnicians();

  const filteredTechnicians = useMemo(() => {
    return (technicians || []).filter((techy) =>
      filterProps.filter
        ? (techy.email || "").startsWith(filterProps.filter) ||
          techy.name.startsWith(filterProps.filter)
        : true
    );
  }, [filterProps.filter, technicians]);
  return (
    <ListSection>
      <FilterTechnicans {...filterProps} />
      {filteredTechnicians.length ? (
        <ul className="techies__list">
          {filteredTechnicians.map((techy) => (
            <TechnicianItem key={techy._id} technician={techy} />
          ))}
        </ul>
      ) : (
        <NotfoundItem
          Icon={RiCustomerService2Line}
          message="No technicians were found"
        />
      )}
    </ListSection>
  );
}
