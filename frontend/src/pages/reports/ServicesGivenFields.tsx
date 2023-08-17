import { ChangeEventHandler, useEffect, useState } from "react";
import Button from "../../common/Button";
import { Service } from "../services/interfaces";
import { getAllServices } from "../services/servicesApi";
import ACMetaInfoForm from "./ACMetaInfoForm";
import ACMetaInfosList from "./ACMetaInfosList";
import "./ServicesGivenFields.css";
import { AcMetaInfo } from "./interfaces";
export type ServicesGivenFieldsProps = {
  acMetaInfoList: AcMetaInfo[];
  onAddService: (service: AcMetaInfo) => void;
  onUpdateService: (acmeta: AcMetaInfo) => void;
  onRemoveService: (serviceId: string) => void;
};
export default function ServicesGivenFields(props: ServicesGivenFieldsProps) {
  const { acMetaInfoList } = props;
  const defaultACMetaInfo = {
    modelNumber: "",
    tonnage: "",
    typeOfAC: "",
    services: [],
  };
  const [acMetaForm, setAcMetaForm] = useState<AcMetaInfo | null>(null);
  const [services, setServices] = useState<Service[] | null>(null);

  const onChangeACType: ChangeEventHandler<HTMLSelectElement> = (e) => {
    if (acMetaForm) {
      setServices(null);
      props.onUpdateService({ ...acMetaForm, services: [] });
      setAcMetaForm({
        ...acMetaForm,
        typeOfAC: e.currentTarget.value,
        services: [],
      });
    }
  };
  const onSetACMetaInfo = (acMeta: AcMetaInfo | null) => {
    setAcMetaForm(acMeta);
  };

  useEffect(() => {
    (async () => {
      if (acMetaForm?.typeOfAC) {
        const { data } = await getAllServices(acMetaForm?.typeOfAC);
        setServices(data.data);
      }
    })();
  }, [acMetaForm?.typeOfAC]);
  return (
    <fieldset className="field__section">
      <legend>Work Done</legend>
      <ACMetaInfosList
        onRemoveService={props.onRemoveService}
        acMetaInfos={acMetaInfoList}
        onSetACMetaInfo={onSetACMetaInfo}
      />
      {acMetaForm ? null : (
        <div className="d-flex-center">
          <Button
            className="btn btn-small"
            label="Add More AC"
            onClick={() => setAcMetaForm(defaultACMetaInfo)}
          />
        </div>
      )}

      {acMetaForm ? (
        <ACMetaInfoForm
          onUpdateService={props.onUpdateService}
          onAddService={props.onAddService}
          onSetACMetaInfo={onSetACMetaInfo}
          acMetaForm={acMetaForm}
          acMetaInfoList={acMetaInfoList}
          onChangeACType={onChangeACType}
          services={services}
        />
      ) : null}
    </fieldset>
  );
}
