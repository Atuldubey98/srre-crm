import { isAxiosError } from "axios";
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
import MessageBody, { MessageBodyProps } from "../../common/MessageBody";
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
  const [messageBody, setMessageBody] = useState<MessageBodyProps>({
    type: "success",
    body: "",
  });
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
      } catch (error) {
        setTechnician(null);
      }
    })();
  }, [technicianId]);
  const showForm = showTechnicianNew || showUpdateTechnician;
  const onChangeTechnician: ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (e) => {
    const { name, value } = e.currentTarget;
    setTechnician((prevTechnician) =>
      prevTechnician
        ? {
            ...prevTechnician,
            [name]: value,
          }
        : {
            contactNumber: "",
            email: "",
            currentlyActive: "Active",
            name: "",
          }
    );
  };
  const navigate = useNavigate();
  const onTechnicianFormSubmit: FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();

    try {
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
    } catch (error) {
      setMessageBody({
        type: "error",
        body: isAxiosError(error)
          ? error.response?.data.message
          : "Network error occured",
      });
    }
  };
  const submitBtnDisbaled = technician
    ? technician.name.length === 0 || technician.contactNumber.length === 0
    : true;
  return showForm ? (
    <EditSection>
      <section className="edit__technician">
        <form
          onSubmit={onTechnicianFormSubmit}
          className="d-grid edit__technicianForm"
        >
          <div className="form__labelField">
            <label htmlFor="name"> Technician Name :*</label>
            <Input
              name="name"
              autoComplete="name"
              id="name"
              placeholder="What is the name of technician?"
              required
              value={technician?.name || ""}
              onChange={onChangeTechnician}
            />
          </div>
          <div className="form__labelField">
            <label htmlFor="contactNumber">Technician Contact Number :*</label>
            <Input
              id="contactNumber"
              type="tel"
              placeholder="What is his contact number?"
              required
              name="contactNumber"
              value={technician?.contactNumber || ""}
              onChange={onChangeTechnician}
            />
          </div>
          <div className="form__labelField">
            <label htmlFor="email">Technician Email : </label>
            <Input
              type="email"
              autoComplete="email"
              id="email"
              placeholder="What is his email id?"
              value={technician?.email || ""}
              onChange={onChangeTechnician}
              name="email"
            />
          </div>
          <div className="form__labelField">
            <label htmlFor="currentlyActive">Is Employee active ?</label>
            <SelectOptions
              id="currentlyActive"
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
                disabled={submitBtnDisbaled}
                label="Update Technician"
                className="btn btn-info"
                type="submit"
              />
            ) : (
              <Button
                disabled={submitBtnDisbaled}
                label="Add technician"
                className="btn btn-success"
                type="submit"
              />
            )}
          </div>
          <MessageBody {...messageBody} />
        </form>
      </section>
    </EditSection>
  ) : null;
}
