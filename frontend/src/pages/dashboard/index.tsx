import Container from "../../common/Container";
import { PageLeftRight } from "../../common/PageLeftRight";
import PrivateRoute from "../../common/PrivateRoute";
import DashLeft from "./DashLeft";
import DashRight from "./DashRight";
import "./DashboardPage.css";
import UploadDataCsv from "./UploadDataCsv";
export default function DashboardPage() {
  return (
    <PrivateRoute>
      <Container>
        <PageLeftRight>
          <DashLeft />
          <DashRight />
          <UploadDataCsv />
        </PageLeftRight>
      </Container>
    </PrivateRoute>
  );
}
