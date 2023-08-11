import { useNavigate, useParams } from "react-router-dom";
import Button from "../../common/Button";
import { AboutSection } from "../../common/PageLeftRight";
import { getDateByCustomerCreationDate } from "../../utils/dateUtils";
import OperationBtnsGroup from "../customers/OperationBtnsGroup";
import "./AboutService.css";
import { Service, acOptions } from "./interfaces";
import { deleteServiceById } from "./servicesApi";
import ServiceNotfound from "./ServiceNotfound";
export type AboutSectionProps = {
  service: Service | null;
};
export default function AboutService(props: AboutSectionProps) {
  const { service } = props;
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const onDeleteService = async () => {
    try {
      await deleteServiceById(service?._id || "");
      navigate("/services");
    } catch (error) {}
  };
  return (
    <AboutSection>
      <OperationBtnsGroup
        navigationUrl="/services/new"
        operationLabel="Add new Service"
      />
      {service ? (
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
        </section>
      ) : serviceId ? (
        <ServiceNotfound />
      ) : null}
    </AboutSection>
  );
}
