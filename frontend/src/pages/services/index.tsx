import { Suspense, lazy } from "react";
import { useLocation, useMatch } from "react-router-dom";
import Container from "../../common/Container";
import LoadingIndicatorAbout from "../../common/LoadingIndicatorAbout";
import { PageLeftRight } from "../../common/PageLeftRight";
import PrivateRoute from "../../common/PrivateRoute";
import ServicesList from "./ServicesList";
import "./ServicesPage.css";
import useServiceAbout from "./useServiceAbout";
const AboutService = lazy(() => import("./AboutService"));
const NewServiceAddForm = lazy(() => import("./NewServiceAddForm"));
export default function ServicesPage() {
  const { service } = useServiceAbout();
  const location = useLocation();
  const pathnameMatch = useMatch(location.pathname);
  const showNewServiceForm = pathnameMatch?.pathnameBase === `/services/new`;
  return (
    <PrivateRoute>
      <Container>
        <PageLeftRight>
          <ServicesList />
          {service && !showNewServiceForm ? (
            <Suspense fallback={<LoadingIndicatorAbout loading={true} />}>
              <AboutService service={service} />
            </Suspense>
          ) : null}
          {showNewServiceForm ? (
            <Suspense fallback={<LoadingIndicatorAbout loading={true} />}>
              <NewServiceAddForm />
            </Suspense>
          ) : null}
        </PageLeftRight>
      </Container>
    </PrivateRoute>
  );
}
