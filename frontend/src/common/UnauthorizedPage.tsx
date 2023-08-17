import Container from "./Container";
import PrivateRoute from "./PrivateRoute";

export default function UnauthorizedPage() {
  return (
    <PrivateRoute>
      <Container>
        <section className="page__notFound">Not Authorized</section>
      </Container>
    </PrivateRoute>
  );
}
