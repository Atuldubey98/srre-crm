import Container from "../../common/Container";
import PrivateRoute from "../../common/PrivateRoute";
import DashRight from "./DashRight";
import "./DashboardPage.css";
export default function DashboardPage() {
  return (
    <PrivateRoute>
      <Container>
        <section className="dashboard__section">
          <section className="dash__left"></section>
          <DashRight />
        </section>
      </Container>
    </PrivateRoute>
  );
}
