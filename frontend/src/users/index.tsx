import AdminRoute from "../common/AdminRoute";
import Container from "../common/Container";
import PrivateRoute from "../common/PrivateRoute";

export default function UsersPage() {
  return (
    <PrivateRoute>
      <AdminRoute>
        <Container></Container>
      </AdminRoute>
    </PrivateRoute>
  );
}
