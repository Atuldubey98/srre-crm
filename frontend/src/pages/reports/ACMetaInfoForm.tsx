import { ChangeEventHandler } from "react";
import FormLabelField from "../../common/FormLabelField";
import SelectOptions from "../../common/SelectOptions";
import { Service, acTypeOptions } from "../services/interfaces";
import { AcMetaInfo } from "./interfaces";

export type ACMetaInfoFormProps = {
  acMetaForm: AcMetaInfo;
  onChangeACType: ChangeEventHandler<HTMLSelectElement>;
  services: Service[] | null;
  onSetACMetaInfo: (acMetaForm: AcMetaInfo) => void;
};
export default function ACMetaInfoForm(props: ACMetaInfoFormProps) {
  const { acMetaForm, onChangeACType, services, onSetACMetaInfo } = props;
  const onChangeServiceCheckBox = (service: Service) => {
    const alreadyThere: boolean = (acMetaForm.services || [])
      ?.map((ser) => ser._id)
      .includes(service._id);
    if (alreadyThere) {
      onSetACMetaInfo({
        ...acMetaForm,
        services: (acMetaForm.services || []).filter(
          (ser) => ser._id !== service._id
        ),
      });
    } else {
      onSetACMetaInfo({
        ...acMetaForm,
        services: [...(acMetaForm.services || []), service],
      });
    }
  };
  const onChangeTonnage: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (/^\d*\.?\d*$/.test(e.currentTarget.value)) {
      onSetACMetaInfo({
        ...acMetaForm,
        tonnage: e.currentTarget.value,
      });
    }
  };
  const onChangeACMetaForm: ChangeEventHandler<HTMLInputElement> = (e) => {
    onSetACMetaInfo({
      ...acMetaForm,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };
  return (
    <div className="ac__form">
      <FormLabelField
        input={{
          name: "tonnage",
          type: "text",
          value: acMetaForm.tonnage.toString(),
          onChange: onChangeTonnage,
        }}
        label="Ton of AC :"
      />
      <FormLabelField
        input={{
          name: "modelNumber",
          type: "string",
          value: acMetaForm.modelNumber,
          onChange: onChangeACMetaForm,
        }}
        label="Model Number :"
      />
      <div className="form__labelField">
        <label htmlFor="typeOfAC">Type of AC</label>
        <SelectOptions
          value={acMetaForm ? acMetaForm.typeOfAC : ""}
          onChange={onChangeACType}
          name="typeOfAC"
        >
          <option value="">Please select type of AC</option>
          {acTypeOptions.map((acType) => (
            <option value={acType.value} key={acType.value}>
              {acType.field}
            </option>
          ))}
        </SelectOptions>
      </div>
      {services ? (
        <fieldset>
          <legend>Work Done </legend>
          {services.map((service) => (
            <div key={service._id} className="form__select d-flex">
              <label htmlFor={service._id}>{service.serviceName}</label>
              <input
                type="checkbox"
                onChange={() => onChangeServiceCheckBox(service)}
                name={service._id}
                checked={
                  (acMetaForm.services || []).filter(
                    (ser) => ser._id === service._id
                  ).length > 0
                }
              />
            </div>
          ))}
        </fieldset>
      ) : null}
    </div>
  );
}
