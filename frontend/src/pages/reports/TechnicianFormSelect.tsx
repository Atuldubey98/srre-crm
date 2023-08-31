import { ChangeEventHandler, useEffect, useState } from "react";
import SelectOptions from "../../common/SelectOptions";
import TechnicianFieldsSection from "../technicians/TechnicianFieldsSection";
import { Technician } from "../technicians/interfaces";
import { getAllTechnicials } from "../technicians/techiesApi";
import "./TechnicianFormSelect.css";
import { ServiceReportStatus } from "./interfaces";
export type TechnicianFormSelectProps = {
  technician: string;
  onChangeReportField: ChangeEventHandler<HTMLSelectElement>;
  status: ServiceReportStatus;
};
export default function TechnicianFormSelect(props: TechnicianFormSelectProps) {
  const [technicians, setTechnicians] = useState<Technician[] | null>(null);
  useEffect(() => {
    (async () => {
      const { data } = await getAllTechnicials();
      setTechnicians(data.data);
    })();
  }, []);
  const technicianSelected = technicians
    ? technicians.find((tech) => tech._id === props.technician)
    : null;
  return (
    <fieldset className="field__section">
      <legend>Technician</legend>
      <div className="form__labelField">
        <label htmlFor="technician">Select the Technician Visiting*</label>
        <SelectOptions
          required
          value={props.technician}
          onChange={props.onChangeReportField}
          name="technician"
        >
          <option value="">Please choose the technician</option>
          {technicians
            ? technicians.map((technician) => (
                <option value={technician._id} key={technician._id}>
                  {technician.name}
                </option>
              ))
            : null}
        </SelectOptions>
      </div>
      {technicianSelected ? (
        <TechnicianFieldsSection technician={technicianSelected} />
      ) : null}
      <div className="form__labelField">
        <label htmlFor="status">Work Status :</label>
        <SelectOptions
          value={props.status}
          onChange={props.onChangeReportField}
          name="status"
        >
          <option value={"Complete"}>Complete</option>
          <option value={"Incomplete"}>Incomplete</option>
          <option value={"Material Pending"}>Material Pending</option>
        </SelectOptions>
      </div>
    </fieldset>
  );
}
