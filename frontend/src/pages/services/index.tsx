import { useLocation, useMatch } from "react-router-dom";
import Container from "../../common/Container";
import { PageLeftRight } from "../../common/PageLeftRight";
import AboutService from "./AboutService";
import ServicesList from "./ServicesList";
import "./ServicesPage.css";
import useServiceAbout from "./useServiceAbout";
import NewServiceAddForm from "./NewServiceAddForm";
export default function ServicesPage() {
  const { service } = useServiceAbout();
  const location = useLocation();
  const pathnameMatch = useMatch(location.pathname);
  const showNewServiceForm = pathnameMatch?.pathnameBase === `/services/new`;
  return (
    <Container>
      <PageLeftRight>
        <ServicesList />
        {showNewServiceForm ? null : <AboutService service={service} />}
        <NewServiceAddForm />
      </PageLeftRight>
    </Container>
  );
}
