import Container from "../../common/Container";
import { PageLeftRight } from "../../common/PageLeftRight";
import PrivateRoute from "../../common/PrivateRoute";
import AboutService from "./AboutService";
import ServicesList from "./ServicesList";
import "./ServicesPage.css";
export default function ServicesPage() {
  return (
    <PrivateRoute>
      <Container>
        <PageLeftRight>
          <ServicesList />
          <AboutService />
        </PageLeftRight>
      </Container>
    </PrivateRoute>
  );
}
