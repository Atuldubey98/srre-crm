import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import {
  useLocation,
  useMatch,
  useNavigate,
  useParams,
} from "react-router-dom";
import Button from "../../common/Button";
import Input from "../../common/Input";
import { EditSection } from "../../common/PageLeftRight";
import SelectOptions from "../../common/SelectOptions";
import "./EditTechnician.css";
import { Technician } from "./interfaces";
import {
  createNewTechnician,
  getAllTechnicianById,
  udpateNewTechnician,
} from "./techiesApi";
export default function EditTechnician() {
  const location = useLocation();
  const { technicianId = "" } = useParams();
  const pathnameMatch = useMatch(location.pathname);

  const showTechnicianNew = pathnameMatch?.pathnameBase === `/technicians/new`;
  const [technician, setTechnician] = useState<Technician | null>(null);
  const showUpdateTechnician =
    technician &&
    pathnameMatch?.pathnameBase === `/technicians/${technicianId}/edit`;
  useEffect(() => {
    (async () => {
      if (!technicianId) {
        setTechnician({
          contactNumber: "",
          email: "",
          currentlyActive: "Active",
          name: "",
        });
        return;
      }
      try {
        const { data } = await getAllTechnicianById(technicianId);
        setTechnician(data.data);
      } catch (error) {}
    })();
  }, [technicianId]);
  const showForm = showTechnicianNew || showUpdateTechnician;
  const onChangeTechnician: ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (e) => {
    setTechnician(
      technician
        ? { ...technician, [e.currentTarget.name]: e.currentTarget.value }
        : null
    );
  };
  const navigate = useNavigate();
  const onTechnicianFormSubmit: FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();

    if (showUpdateTechnician) {
      if (technician) {
        const { data } = await udpateNewTechnician(
          {
            name: technician.name,
            contactNumber: technician.contactNumber,
            currentlyActive: technician.currentlyActive,
            email: technician.email,
          },
          technicianId
        );
        navigate(`/technicians/${data.data._id}`);
      }
    } else {
      if (technician) {
        const { data } = await createNewTechnician({
          name: technician?.name,
          contactNumber: technician?.contactNumber,
          currentlyActive: technician?.currentlyActive,
          email: technician?.email,
        });
        navigate(`/technicians/${data.data._id}`);
      }
    }
  };
  return showForm ? (
    <EditSection>
      <section className="edit__technician">
        <form
          onSubmit={onTechnicianFormSubmit}
          className="d-grid edit__technicianForm"
        >
          <div className="form__control">
            <label htmlFor="name"> Technician Name : </label>
            <Input
              name="name"
              required
              value={technician?.name || ""}
              onChange={onChangeTechnician}
            />
          </div>
          <div className="form__control">
            <label htmlFor="contactNumber">Technician Contact Number : </label>
            <Input
              type="tel"
              required
              name="contactNumber"
              value={technician?.contactNumber || ""}
              onChange={onChangeTechnician}
            />
          </div>
          <div className="form__control">
            <label htmlFor="email">Technician Email : </label>
            <Input
              type="email"
              value={technician?.email || ""}
              onChange={onChangeTechnician}
              name="email"
            />
          </div>
          <div className="form__control">
            <label htmlFor="currentlyActive">Is Employee active ?</label>
            <SelectOptions
              name="currentlyActive"
              onChange={onChangeTechnician}
              value={technician?.currentlyActive || "Active"}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </SelectOptions>
          </div>
          <div className="d-flex-center">
            {showUpdateTechnician ? (
              <Button
                label="Update Technician"
                className="btn btn-succes"
                type="submit"
              />
            ) : (
              <Button
                label="Add technician"
                className="btn btn-info"
                type="submit"
              />
            )}
          </div>
        </form>
      </section>
    </EditSection>
  ) : null;
}
