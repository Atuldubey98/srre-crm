import { ChangeEventHandler } from "react";
import Input from "../../common/Input";
import SelectOptions from "../../common/SelectOptions";
import "./FilterServices.css";
import { ServiceFilter, acTypeOptions } from "./interfaces";
export type FilterServicesProps = {
  onChangeACType: ChangeEventHandler<HTMLSelectElement>;
  onChangeServiceName: ChangeEventHandler<HTMLInputElement>;
  filter: ServiceFilter;
};
export default function FilterServices(props: FilterServicesProps) {
  const { onChangeACType, onChangeServiceName, filter } = props;

  return (
    <section className="filter__services">
      <fieldset className="filter__form d-grid">
        <legend>Search for services by ac types</legend>
        <SelectOptions onChange={onChangeACType} value={filter.typeOfAC}>
          {acTypeOptions.map((acType) => (
            <option value={acType.value} key={acType.value}>
              {acType.field}
            </option>
          ))}
        </SelectOptions>
        <Input
          type="search"
          value={filter.serviceName}
          onChange={onChangeServiceName}
          placeholder="Search for service"
        />
      </fieldset>
    </section>
  );
}
