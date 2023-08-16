import { TbReportSearch } from "react-icons/tb";
import Button from "../../common/Button";
import NotfoundItem from "../../common/NotfoundItem";
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
        {serviceReports && serviceReports.length > 0 ? (
          <ReportsList
            serviceReports={serviceReports}
            onRemoveService={onRemoveService}
          />
        ) : (
          <NotfoundItem Icon={TbReportSearch} message="No reports available" />
        )}
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
