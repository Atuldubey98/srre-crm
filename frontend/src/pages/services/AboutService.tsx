import { Suspense, lazy } from "react";
import { useLocation, useMatch, useParams } from "react-router-dom";
import LoadingIndicatorAbout from "../../common/LoadingIndicatorAbout";
import { AboutSection } from "../../common/PageLeftRight";
import OperationBtnsGroup from "../customers/OperationBtnsGroup";
import "./AboutService.css";
import ServiceNotfound from "./ServiceNotfound";
import useServiceAbout from "./useServiceAbout";
const NewServiceAddForm = lazy(() => import("./NewServiceAddForm"));
const ServiceDescription = lazy(() => import("./ServiceDescription"));

export default function AboutService() {
  const { service, loading } = useServiceAbout();
  const location = useLocation();
  const pathnameMatch = useMatch(location.pathname);
  const showNewServiceForm = pathnameMatch?.pathnameBase === `/services/new`;
  const { serviceId } = useParams();

  return (
    <AboutSection>
      <OperationBtnsGroup
        navigationUrl="/services/new"
        operationLabel="Add new Service"
        searchPlaceHolder="Search service by id"
        searchUrl="/services"
      />
      {loading ? (
        <LoadingIndicatorAbout loading={true} />
      ) : service ? (
        <Suspense fallback={<LoadingIndicatorAbout loading={true} />}>
          <ServiceDescription service={service} />
        </Suspense>
      ) : serviceId ? (
        <ServiceNotfound />
      ) : null}
      {showNewServiceForm ? (
        <Suspense fallback={<LoadingIndicatorAbout loading={true} />}>
          <NewServiceAddForm />
        </Suspense>
      ) : null}
    </AboutSection>
  );
}
