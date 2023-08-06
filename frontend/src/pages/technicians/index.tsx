import { useMatch } from "react-router-dom";
import Container from "../../common/Container";
import { PageLeftRight } from "../../common/PageLeftRight";
import AboutTechnician from "./AboutTechnician";
import TechiesList from "./TechiesList";
import EditTechnician from "./EditTechnician";

export default function TechnicansPage() {
  const pathnameMatch = useMatch(location.pathname);
  const showTechnicianNew = pathnameMatch?.pathnameBase === `/technicians/new`;
  return (
    <Container>
      <PageLeftRight>
        <TechiesList />
        {showTechnicianNew ? null : <AboutTechnician />}
        <EditTechnician />
      </PageLeftRight>
    </Container>
  );
}
