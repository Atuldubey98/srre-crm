import Container from "../../common/Container";
import PrivateRoute from "../../common/PrivateRoute";
import DashLeft from "./DashLeft";
import DashRight from "./DashRight";
import "./DashboardPage.css";
export default function DashboardPage() {
  return (
    <PrivateRoute>
      <Container>
        <section className="dashboard__section">
          <DashLeft />
          <DashRight />
        </section>
      </Container>
    </PrivateRoute>
  );
}
