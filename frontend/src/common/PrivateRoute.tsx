import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./useAuth";
import Fullloading from "./Fullloading";

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const auth = useAuth();
  const location = useLocation();
  if (auth?.currentUserLoading) {
    return <Fullloading />;
  }
  if (!auth?.currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}
