import { TbReportSearch } from "react-icons/tb";
import Button from "../../common/Button";
import NotfoundItem from "../../common/NotfoundItem";
import { ListSection } from "../../common/PageLeftRight";
import ReportsList from "./ReportsList";
import { ServiceReport } from "./interfaces";
import { AiOutlineDown } from "react-icons/ai";
export type ServiceReportLeftSmallListProps = {
  serviceReports: ServiceReport[] | null;
  onRemoveService: (serviceReportId: string) => void;
  hasMoreReports: boolean;
  onIncrementSkip: () => void;
  loading: boolean;
};
export default function ServiceReportLeftSmallList(
  props: ServiceReportLeftSmallListProps
) {
  const { serviceReports, onIncrementSkip, onRemoveService, hasMoreReports } =
    props;
  const showMoreClassName = `${
    props.loading ? "btn-loading" : ""
  } btn btn-small d-flex-center`;
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
              disabled={props.loading}
              children={<AiOutlineDown />}
              className={showMoreClassName}
              label="Show more"
              onClick={onIncrementSkip}
            />
          ) : null}
        </div>
      </section>
    </ListSection>
  );
}
