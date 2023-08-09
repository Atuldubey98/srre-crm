import { useLocation, useMatch } from "react-router-dom";
import Container from "../../common/Container";
import { PageLeftRight } from "../../common/PageLeftRight";
import FormServiceReport from "./FormServiceReport";
import ServiceReportAboutSection from "./ServiceReportAboutSection";
import ServiceReportLeftSmallList from "./ServiceReportLeftSmallList";

export default function ServiceReportsPage() {
  const location = useLocation();
  const pathnameMatch = useMatch(location.pathname);
  const showNewReport = pathnameMatch?.pathnameBase === "/reports/new";
  return (
    <Container>
      <PageLeftRight>
        <ServiceReportLeftSmallList />
        {showNewReport ? <FormServiceReport /> : <ServiceReportAboutSection />}
      </PageLeftRight>
    </Container>
  );
}
