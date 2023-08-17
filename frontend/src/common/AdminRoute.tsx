import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./useAuth";

export default function AdminRoute({
  children,
}: {
  children?: React.ReactNode;
}) {
  const auth = useAuth();
  const location = useLocation();
  return auth?.currentUser?.role === "ADMIN" ? (
    children
  ) : (
    <Navigate to={"/unauthorized"} state={{ from: location }} replace />
  );
}
