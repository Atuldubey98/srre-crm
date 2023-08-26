import { Suspense, lazy, useEffect, useState } from "react";
import { useLocation, useMatch, useParams } from "react-router-dom";
import { AboutSection } from "../../common/PageLeftRight";
import OperationBtnsGroup from "../customers/OperationBtnsGroup";
import "./AboutTechnician.css";
const TechnicianNotfound = lazy(() => import("./TechnicianNotfound"));
const TechnicianFieldsSection = lazy(() => import("./TechnicianFieldsSection"));

import { Technician } from "./interfaces";
import { getAllTechnicianById } from "./techiesApi";
import LoadingIndicatorAbout from "../../common/LoadingIndicatorAbout";
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

  return (
    <AboutSection>
      <OperationBtnsGroup
        navigationUrl="/technicians/new"
        operationLabel="Add new Technician"
        searchPlaceHolder="Search technician by id"
        searchUrl="/technicians"
      />
      <Suspense fallback={<LoadingIndicatorAbout loading={true} />}>
        {technician ? (
          <TechnicianFieldsSection technician={technician} />
        ) : technicianId ? (
          <TechnicianNotfound />
        ) : null}
      </Suspense>
    </AboutSection>
  );
}
