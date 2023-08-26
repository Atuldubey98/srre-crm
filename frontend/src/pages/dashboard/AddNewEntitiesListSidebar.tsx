import { lazy } from "react";
import SummaryDetailsWrapper from "../../common/SummaryDetailsWrapper";
import "./AddNewEntitiesListSidebar.css";
const GoToLinksList = lazy(() => import("./GoToLinksList"));
export default function AddNewEntitiesListSidebar() {
  return (
    <SummaryDetailsWrapper summaryText="Add new entities">
      <GoToLinksList />
    </SummaryDetailsWrapper>
  );
}
