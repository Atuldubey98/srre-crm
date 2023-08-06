import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  let auth = useAuth();
  let location = useLocation();
  if (auth?.currentUserLoading) {
    return <h1>loading ...</h1>;
  }
  if (!auth?.currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}
