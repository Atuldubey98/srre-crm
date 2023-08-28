import { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import Button from "../../common/Button";
import MessageBody, { MessageBodyProps } from "../../common/MessageBody";
import { getDateByCustomerCreationDate } from "../../utils/dateUtils";
import { Service, acOptions } from "./interfaces";
import { deleteServiceById } from "./servicesApi";
import { useEffect, useState } from "react";

export type ServiceDescriptionProps = {
  service: Service;
};
export default function ServiceDescription(props: ServiceDescriptionProps) {
  const { service } = props;
  const navigate = useNavigate();
  const [message, setMessage] = useState<MessageBodyProps>({
    type: "success",
    body: "",
  });

  const onDeleteService = async () => {
    try {
      await deleteServiceById(service?._id || "");
      navigate("/services");
    } catch (error) {
      setMessage({
        type: "error",
        body: isAxiosError(error)
          ? error.response?.data.message
          : "Network error occured",
      });
    }
  };
  useEffect(() => {
    setMessage({
      type: "success",
      body: "",
    });
  }, []);
  return (
    <section className="about__sectionService">
      <h2>{acOptions[service.typeOfAC]}</h2>
      <p>{service.serviceName}</p>
      <div className="about__serviceMeta">
        <p>Added on :{getDateByCustomerCreationDate(service.createdAt)}</p>
      </div>
      <div className="btn-group d-flex-center">
        <Button
          label="Delete Service"
          className="btn btn-danger"
          onClick={onDeleteService}
        />
      </div>
      <MessageBody {...message} />
    </section>
  );
}
