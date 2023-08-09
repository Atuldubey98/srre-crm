import { ChangeEventHandler, useEffect, useState } from "react";
import Button from "../../common/Button";
import { Service } from "../services/interfaces";
import { getAllServices } from "../services/servicesApi";
import ACMetaInfoForm from "./ACMetaInfoForm";
import ACMetaInfosList from "./ACMetaInfosList";
import "./ServicesGivenFields.css";
import { AcMetaInfo } from "./interfaces";
export type ServicesGivenFieldsProps = {
  acMetaInfo: AcMetaInfo[];
};
export default function ServicesGivenFields(props: ServicesGivenFieldsProps) {
  const { acMetaInfo } = props;
  const defaultACMetaInfo = {
    modelNumber: "",
    tonnage: "",
    typeOfAC: "",
    services: [],
  };
  const [acMetaForm, setAcMetaForm] = useState<AcMetaInfo | null>(null);
  const onChangeACType: ChangeEventHandler<HTMLSelectElement> = (e) => {
    if (acMetaForm) {
      setAcMetaForm({
        ...acMetaForm,
        typeOfAC: e.currentTarget.value,
      });
    }
  };
  const onSetACMetaInfo = (acMeta: AcMetaInfo) => {
    setAcMetaForm(acMeta);
  };

  const [services, setServices] = useState<Service[] | null>(null);
  useEffect(() => {
    (async () => {
      if (acMetaForm && acMetaForm.typeOfAC) {
        const { data } = await getAllServices(acMetaForm.typeOfAC);
        setServices(data.data);
      }
    })();
  }, [acMetaForm?.typeOfAC]);
  return (
    <fieldset>
      <legend>Work Done</legend>
      {acMetaForm ? null : (
        <Button
          className="btn btn-small"
          label="Add More AC"
          onClick={() => setAcMetaForm(defaultACMetaInfo)}
        />
      )}
      <ACMetaInfosList
        acMetaInfos={acMetaInfo}
        onSetACMetaInfo={onSetACMetaInfo}
      />
      {acMetaForm ? (
        <ACMetaInfoForm
          onSetACMetaInfo={onSetACMetaInfo}
          acMetaForm={acMetaForm}
          onChangeACType={onChangeACType}
          services={services}
        />
      ) : null}
    </fieldset>
  );
}
