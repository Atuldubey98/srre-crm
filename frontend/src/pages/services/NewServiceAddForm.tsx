import { isAxiosError } from "axios";
import { FormEventHandler, Suspense, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../common/Button";
import Input from "../../common/Input";
import LoadingIndicatorAbout from "../../common/LoadingIndicatorAbout";
import MessageBody from "../../common/MessageBody";
import { AboutSection } from "../../common/PageLeftRight";
import SelectOptions from "../../common/SelectOptions";
import useFieldChange from "../../common/useFieldChange";
import "./NewServiceAddForm.css";
import { CreateServiceBody, acTypeOptions } from "./interfaces";
import { createNewService } from "./servicesApi";
export default function NewServiceAddForm() {

  const [message, setMessage] = useState<{
    type: "success" | "error";
    body: string;
  }>({
    type: "success",
    body: "",
  });

  const defaultService = {
    typeOfAC: "all",
    serviceName: "",
  };
  const {
    state: service,
    onChangeField,
    onSetField,
  } = useFieldChange<CreateServiceBody>(defaultService);
  const navigate = useNavigate();
  const onNewServiceFormSubmit: FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    try {
      const { data } = await createNewService(service);
      onSetField(defaultService);
      if (data.data.count > 1) {
        setMessage({
          type: "success",
          body: "Bulk services added reload to see services",
        });
      } else {
        navigate(`/services/${data.data.service._id}`);
      }
    } catch (error) {
      setMessage({
        type: "error",
        body: isAxiosError(error)
          ? error.response?.data.message
          : "Error occured !",
      });
    }
  };
  const submitBtnDisbaled = service.serviceName.length === 0;
  const submitBtnLabel =
    service.typeOfAC === "all" ? "Bulk Services add" : "Add Service";
  return (
    <Suspense fallback={<LoadingIndicatorAbout loading={true} />}>
      <AboutSection>
        <section className="new__serviceForm">
          <h1>New Service Add</h1>
          <form onSubmit={onNewServiceFormSubmit} className="d-grid">
            <div className="form__labelField">
              <label htmlFor="typeOfAC">Type of AC :</label>
              <SelectOptions
                onChange={onChangeField}
                name="typeOfAC"
                value={service.typeOfAC}
              >
                {acTypeOptions.map((acType) => (
                  <option value={acType.value} key={acType.value}>
                    {acType.field}
                  </option>
                ))}
              </SelectOptions>
            </div>
            <div className="form__labelField">
              <label htmlFor="serviceName">What type of service :</label>
              <Input
                required
                name="serviceName"
                minLength={1}
                value={service.serviceName}
                placeholder="Service Name"
                onChange={onChangeField}
              />
            </div>
            <div className="d-flex-center btn-group">
              <Button
                disabled={submitBtnDisbaled}
                label={submitBtnLabel}
                className="btn btn-success"
              />
            </div>
            <MessageBody {...message} />
          </form>
        </section>
      </AboutSection>
    </Suspense>
  );
}
