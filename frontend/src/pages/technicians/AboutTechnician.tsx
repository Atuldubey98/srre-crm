import { useEffect, useState } from "react";
import { AboutSection } from "../../common/PageLeftRight";
import "./AboutTechnician.css";
import { useLocation, useMatch, useNavigate, useParams } from "react-router-dom";
import { Technician } from "./interfaces";
import { getAllTechnicianById } from "./techiesApi";
import OperationBtnsGroup from "../customers/OperationBtnsGroup";
import Button from "../../common/Button";
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
      } catch (error) {}
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
      />
      {technician ? (
        <section className="technician__about d-grid">
          <h1>Technician Name : {technician.name}</h1>
          {technician.email ? (
            <h3>Technician Email Id : {technician.email}</h3>
          ) : null}
          <h4>Technician Contact Number :{technician.contactNumber}</h4>
          <h4>Technician Current Status :{technician.currentlyActive}</h4>

          <div className="btn-group d-flex-center">
            <Button
              label="Edit Technician"
              className="btn btn-info"
              onClick={onTechyEdit}
            />
          </div>
        </section>
      ) : null}
    </AboutSection>
  );
}
