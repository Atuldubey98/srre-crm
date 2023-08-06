import { FormEventHandler, useState } from "react";
import { useLocation, useMatch, useNavigate } from "react-router-dom";
import Button from "../../common/Button";
import Input from "../../common/Input";
import { AboutSection } from "../../common/PageLeftRight";
import SelectOptions from "../../common/SelectOptions";
import useFieldChange from "../../common/useFieldChange";
import "./NewServiceAddForm.css";
import { CreateServiceBody, acTypeOptions } from "./interfaces";
import { createNewService } from "./servicesApi";
import { isAxiosError } from "axios";
import MessageBody from "../../common/MessageBody";
export default function NewServiceAddForm() {
  const location = useLocation();
  const pathnameMatch = useMatch(location.pathname);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    body: string;
  }>({
    type: "success",
    body: "",
  });
  const showNewServiceForm = pathnameMatch?.pathnameBase === `/services/new`;
  const { state: service, onChangeField } = useFieldChange<CreateServiceBody>({
    typeOfAC: "all",
    serviceName: "",
  });
  const navigate = useNavigate();
  const onNewServiceFormSubmit: FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    try {
      const { data } = await createNewService(service);
      if (data.data.count > 1) {
        setMessage({ type: "success", body: "Bulk services added" });
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
  return showNewServiceForm ? (
    <AboutSection>
      <section className="new__serviceForm">
        <h1>New Service Add</h1>
        <form onSubmit={onNewServiceFormSubmit} className="d-grid">
          <div className="form__control">
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
          <div className="form__control">
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
            <Button label="Add Service" className="btn btn-success" />
          </div>
          <MessageBody {...message} />
        </form>
      </section>
    </AboutSection>
  ) : null;
}
