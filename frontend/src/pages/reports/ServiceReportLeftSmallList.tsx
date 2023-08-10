import { useEffect, useState } from "react";
import Button from "../../common/Button";
import { ListSection } from "../../common/PageLeftRight";
import { getServiceReports } from "./serviceReportsApi";
import useHasMore from "./useHasMore";
import ReportsList from "./ReportsList";
import { ServiceReport } from "./interfaces";

export default function ServiceReportLeftSmallList() {
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
  return (
    <ListSection>
      <section className="service__reportsList">
        <ReportsList serviceReports={serviceReports} />
        <div className="d-flex-center">
          {hasMoreReports ? (
            <Button
              className="btn btn-small"
              label="Show more"
              onClick={onIncrementSkip}
            />
          ) : null}
        </div>
      </section>
    </ListSection>
  );
}
