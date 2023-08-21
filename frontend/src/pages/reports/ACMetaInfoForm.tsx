import { ChangeEventHandler } from "react";
import Button from "../../common/Button";
import FormLabelField from "../../common/FormLabelField";
import SelectOptions from "../../common/SelectOptions";
import {
  Service,
  acTypeOptionsWithoutAll
} from "../services/interfaces";
import { AcMetaInfo } from "./interfaces";

export type ACMetaInfoFormProps = {
  acMetaForm: AcMetaInfo;
  onChangeACType: ChangeEventHandler<HTMLSelectElement>;
  services: Service[] | null;
  acMetaInfoList: AcMetaInfo[];
  onUpdateService: (acmeta: AcMetaInfo) => void;
  onAddService: (service: AcMetaInfo) => void;
  onSetACMetaInfo: (acMetaForm: AcMetaInfo | null) => void;
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
  const onChangeACModelNumber: ChangeEventHandler<HTMLInputElement> = (e) => {
    onSetACMetaInfo({
      ...acMetaForm,
      modelNumber: e.currentTarget.value.toLocaleUpperCase(),
    });
  };
  return (
    <div className="ac__form form">
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
          onChange: onChangeACModelNumber,
        }}
        label="Model Number :"
      />
      <div className="form__labelField">
        <label htmlFor="typeOfAC">Type of AC</label>
        <SelectOptions
          required
          value={acMetaForm ? acMetaForm.typeOfAC : ""}
          onChange={onChangeACType}
          name="typeOfAC"
        >
          <option value="">Please select type of AC</option>
          {acTypeOptionsWithoutAll.map((acType) => (
            <option value={acType.value} key={acType.value}>
              {acType.field}
            </option>
          ))}
        </SelectOptions>
      </div>
      {services ? (
        <fieldset className="field__section">
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
      <div className="d-flex-center btn-group">
        <Button
          label="Cancel"
          className="btn btn-small btn-info"
          onClick={() => {
            onSetACMetaInfo(null);
          }}
        />
        {acMetaForm._id ? (
          <Button
            label="Update Serviced"
            className="btn btn-small"
            onClick={() => {
              props.onUpdateService(acMetaForm);
              onSetACMetaInfo(null);
            }}
          />
        ) : (
          <Button
            label="Add AC Serviced"
            className="btn btn-small"
            onClick={() => {
              props.onAddService({
                ...acMetaForm,
                _id: Math.random().toString(36).substring(2, 9),
              });
              onSetACMetaInfo(null);
            }}
          />
        )}
      </div>
    </div>
  );
}
