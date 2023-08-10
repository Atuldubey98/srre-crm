import { useLocation, useMatch, useParams } from "react-router-dom";
import Container from "../../common/Container";
import { PageLeftRight } from "../../common/PageLeftRight";
import FormServiceReport from "./FormServiceReport";
import ServiceReportAboutSection from "./ServiceReportAboutSection";
import ServiceReportLeftSmallList from "./ServiceReportLeftSmallList";

export default function ServiceReportsPage() {
  const location = useLocation();
  const { reportId = "" } = useParams();
  const pathnameMatch = useMatch(location.pathname);
  const showNewReport = pathnameMatch?.pathnameBase === "/reports/new";
  const showEditReport =
    pathnameMatch?.pathnameBase === `/reports/${reportId}/edit`;
  return (
    <Container>
      <PageLeftRight>
        <ServiceReportLeftSmallList />
       
        {showNewReport || showEditReport ? (
          <FormServiceReport />
        ) : (
          <ServiceReportAboutSection />
        )}
      </PageLeftRight>
    </Container>
  );
}
