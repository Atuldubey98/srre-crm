import { Route, Routes } from "react-router-dom";
import CustomerPage from "./pages/customers";
import Loginpage from "./pages/login";
import ServicesPage from "./pages/services";
import TechnicansPage from "./pages/technicians";
import ServiceReportsPage from "./pages/reports";

export default function App() {
  return (
    <Routes>
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
      <Route path="/login" element={<Loginpage />} />
    </Routes>
  );
}
