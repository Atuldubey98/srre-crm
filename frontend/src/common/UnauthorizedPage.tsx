import { GoStop } from "react-icons/go";
import Container from "./Container";
import PrivateRoute from "./PrivateRoute";
import './UnauthorizedPage.css'
export default function UnauthorizedPage() {
  return (
    <PrivateRoute>
      <Container>
        <section className="unauthorized">
          <GoStop color="red" size={60} />
          <h1>Unauthorized</h1>
        </section>
      </Container>
    </PrivateRoute>
  );
}
