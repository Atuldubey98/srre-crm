import Button from "../../common/Button";
import { ListSection } from "../../common/PageLeftRight";
import ReportsList from "./ReportsList";
import { ServiceReport } from "./interfaces";
export type ServiceReportLeftSmallListProps = {
  serviceReports: ServiceReport[] | null;
  onRemoveService: (serviceReportId: string) => void;
  hasMoreReports: boolean;
  onIncrementSkip: () => void;
};
export default function ServiceReportLeftSmallList(
  props: ServiceReportLeftSmallListProps
) {
  const { serviceReports, onIncrementSkip, onRemoveService, hasMoreReports } =
    props;
  return (
    <ListSection>
      <section className="service__reportsList">
        <ReportsList
          serviceReports={serviceReports}
          onRemoveService={onRemoveService}
        />
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
