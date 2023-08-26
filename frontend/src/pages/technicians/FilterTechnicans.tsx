import { ChangeEventHandler } from "react";
import Input from "../../common/Input";

export type FilterTechnicansProps = {
  filter: string;
  onChangeFilter: ChangeEventHandler<HTMLInputElement>;
};
export default function FilterTechnicans(props: FilterTechnicansProps) {
  return (
    <section className="filter__techies">
      <Input
        type="search"
        id="searchTechnician"
        value={props.filter}
        onChange={props.onChangeFilter}
      />
    </section>
  );
}
