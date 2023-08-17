import Container from "./Container";
import PrivateRoute from "./PrivateRoute";
import "./PageNotFound.css";
import notfound from "../assets/notfound.svg";
export default function PageNotFound() {
  const message = "Page you are trying to look for is not found";
  return (
    <PrivateRoute>
      <Container>
        <section className="page__notFound">
          <img src={notfound} alt={message} width={60} height={60}/>
          <h2>{message}</h2>
        </section>
      </Container>
    </PrivateRoute>
  );
}
