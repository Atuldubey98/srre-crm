import { useLocation, useMatch, useParams } from "react-router-dom";
import Container from "../../common/Container";
import { PageLeftRight } from "../../common/PageLeftRight";
import FormServiceReport from "./FormServiceReport";
import ServiceReportAboutSection from "./ServiceReportAboutSection";
import ServiceReportLeftSmallList from "./ServiceReportLeftSmallList";
import ReportGenerationUtilities from "./ReportGenerationUtilities";
import PrivateRoute from "../../common/PrivateRoute";
import { useState, useEffect } from "react";
import { ServiceReport } from "./interfaces";
import { getServiceReports } from "./serviceReportsApi";
import useHasMore from "./useHasMore";

export default function ServiceReportsPage() {
  const location = useLocation();
  const { reportId = "" } = useParams();
  const pathnameMatch = useMatch(location.pathname);
  const showNewReport = pathnameMatch?.pathnameBase === "/reports/new";
  const showEditReport =
    pathnameMatch?.pathnameBase === `/reports/${reportId}/edit`;
  const {
    queryParams: queryParamsReports,
    onSetHasMoreReports: setHashMoreReports,
    hasMore: hasMoreReports,
    onIncrementSkip,
  } = useHasMore();
  const [serviceReports, setServiceReports] = useState<ServiceReport[] | null>(
    null
  );
  useEffect(() => {
    (async () => {
      try {
        const { data } = await getServiceReports(
          queryParamsReports.limit,
          queryParamsReports.skip
        );
        setServiceReports([...(serviceReports || []), ...data.data]);
        setHashMoreReports(data.data.length > 0);
      } catch (error) {}
    })();
  }, [queryParamsReports]);
  const onRemoveService = (serviceReportId: string) => {
    setServiceReports(
      (serviceReports || []).filter((rep) => rep._id !== serviceReportId)
    );
  };
  return (
    <PrivateRoute>
      <Container>
        <PageLeftRight>
          <ServiceReportLeftSmallList
            onIncrementSkip={onIncrementSkip}
            onRemoveService={onRemoveService}
            serviceReports={serviceReports}
            hasMoreReports={hasMoreReports}
          />
          {showNewReport || showEditReport ? (
            <FormServiceReport />
          ) : (
            <ServiceReportAboutSection onRemoveService={onRemoveService} />
          )}
          <ReportGenerationUtilities />
        </PageLeftRight>
      </Container>
    </PrivateRoute>
  );
}
