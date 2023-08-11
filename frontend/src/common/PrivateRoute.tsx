import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Fullloading from "./Fullloading";

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  let auth = useAuth();
  let location = useLocation();
  if (auth?.currentUserLoading) {
    return <Fullloading />;
  }
  if (!auth?.currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}
