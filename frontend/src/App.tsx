import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
const CustomerPage = lazy(() => import("./pages/customers"));
import Loginpage from "./pages/login";
const ServiceReportsPage = lazy(() => import("./pages/reports"));
const ServicesPage = lazy(() => import("./pages/services"));
const TechnicansPage = lazy(() => import("./pages/technicians"));
import LoadingIndicatorAbout from "./common/LoadingIndicatorAbout";
import PageNotFound from "./common/PageNotFound";
import UnauthorizedPage from "./common/UnauthorizedPage";
import UsersPage from "./users";

export default function App() {
  return (
    <Suspense fallback={<LoadingIndicatorAbout loading={true} />}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/customers">
          <Route path="" element={<CustomerPage />} />
          <Route path="new" element={<CustomerPage />} />
          <Route path=":customerId" element={<CustomerPage />} />
          <Route path=":customerId/edit" element={<CustomerPage />} />
        </Route>
        <Route path="/services">
          <Route path="" element={<ServicesPage />} />
          <Route path="new" element={<ServicesPage />} />
          <Route path=":serviceId" element={<ServicesPage />} />
        </Route>
        <Route path="/technicians">
          <Route path="" element={<TechnicansPage />} />
          <Route path="new" element={<TechnicansPage />} />
          <Route path=":technicianId" element={<TechnicansPage />} />
          <Route path=":technicianId/edit" element={<TechnicansPage />} />
        </Route>
        <Route path="/reports">
          <Route path="" element={<ServiceReportsPage />} />
          <Route path="new" element={<ServiceReportsPage />} />
          <Route path=":reportId" element={<ServiceReportsPage />} />
          <Route path=":reportId/edit" element={<ServiceReportsPage />} />
        </Route>
        <Route path="/users">
          <Route path="" element={<UsersPage />} />
          <Route path="new" element={<UsersPage />} />
          <Route path=":userId" element={<UsersPage />} />
          <Route path=":userId/edit" element={<UsersPage />} />
        </Route>
        <Route path="/login" element={<Loginpage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
}
