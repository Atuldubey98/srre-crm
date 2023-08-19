import { useEffect, useState } from "react";
import {
  useLocation,
  useMatch,
  useNavigate,
  useParams,
} from "react-router-dom";
import Button from "../../common/Button";
import { AboutSection } from "../../common/PageLeftRight";
import OperationBtnsGroup from "../customers/OperationBtnsGroup";
import "./AboutTechnician.css";
import TechnicianNotfound from "./TechnicianNotfound";
import { Technician } from "./interfaces";
import { getAllTechnicianById } from "./techiesApi";
import ReportTechnician from "../reports/ReportTechnician";
import ReportField from "../reports/ReportField";
export default function AboutTechnician() {
  const { technicianId = "" } = useParams();
  const location = useLocation();
  const pathnameMatch = useMatch(location.pathname);
  const updateTechnician =
    pathnameMatch?.pathnameBase === `/technicians/${technicianId}/edit`;
  const [technician, setTechnician] = useState<Technician | null>(null);
  useEffect(() => {
    (async () => {
      if (!technicianId) {
        setTechnician(null);
        return;
      }
      try {
        const { data } = await getAllTechnicianById(technicianId);
        setTechnician(data.data);
      } catch (error) {
        setTechnician(null);
      }
    })();
  }, [technicianId, updateTechnician]);
  const navigate = useNavigate();
  const onTechyEdit = () => {
    navigate(`/technicians/${technicianId}/edit`);
  };

  return (
    <AboutSection>
      <OperationBtnsGroup
        navigationUrl="/technicians/new"
        operationLabel="Add new Technician"
        searchPlaceHolder="Search technician by id"
        searchUrl="/technicians"
      />
      {technician ? (
        <section className="technician__about d-grid">
          <ReportTechnician technician={technician} />
          <ReportField value={technician.email} fieldName="Technician Email" />
          <ReportField value={technician._id} fieldName="Technician Id" />
          <div className="btn-group d-flex-center">
            <Button
              label="Edit Technician"
              className="btn btn-info"
              onClick={onTechyEdit}
            />
          </div>
        </section>
      ) : technicianId ? (
        <TechnicianNotfound />
      ) : null}
    </AboutSection>
  );
}
