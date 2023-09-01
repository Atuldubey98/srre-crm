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
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<MessageBodyProps>({
    type: "success",
    body: "",
  });
  const btnClassName = `btn btn-danger ${loading ? "btn-loading" : ""}`;

  const onDeleteService = async () => {
    try {
      setLoading(true);
      await deleteServiceById(service?._id || "");
      navigate("/services");
    } catch (error) {
      setMessage({
        type: "error",
        body: isAxiosError(error)
          ? error.response?.data.message
          : "Network error occured",
      });
    } finally {
      setLoading(false);
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
          disabled={loading}
          label="Delete Service"
          className={btnClassName}
          onClick={onDeleteService}
        />
      </div>
      <MessageBody {...message} />
    </section>
  );
}
