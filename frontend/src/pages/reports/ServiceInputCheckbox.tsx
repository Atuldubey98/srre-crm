import { Service } from "../services/interfaces";

export type ServiceInputCheckboxProps = {
  service: Service;
  selectedServices: Service[];
  onChangeServiceCheckBox: (service: Service) => void;
};
export default function ServiceInputCheckbox(props: ServiceInputCheckboxProps) {
  const { service, selectedServices, onChangeServiceCheckBox } = props;
  return (
    <div className="form__select d-flex">
      <label htmlFor={service._id}>{service.serviceName}</label>
      <input
        type="checkbox"
        onChange={() => onChangeServiceCheckBox(service)}
        name={service._id}
        checked={
          selectedServices.filter((ser) => ser._id === service._id).length > 0
        }
      />
    </div>
  );
}
