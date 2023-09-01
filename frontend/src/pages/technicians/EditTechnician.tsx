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
  const [loading, setLoading] = useState<boolean>(false);
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
        setLoading(true);
        const { data } = await getAllTechnicianById(technicianId);
        setTechnician(data.data);
      } catch (error) {
        setTechnician(null);
      } finally {
        setLoading(false);
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
    if (technician) {
      try {
        setLoading(true);
        const { _id, ...restTechncian } = technician;
        const { data } = _id
          ? await udpateNewTechnician(restTechncian, technicianId)
          : await createNewTechnician(restTechncian);
        navigate(`/technicians/${data.data._id}`);
      } catch (error) {
        setMessageBody({
          type: "error",
          body: isAxiosError(error)
            ? error.response?.data.message
            : "Network error occured",
        });
      } finally {
        setLoading(false);
      }
    }
  };
  const submitBtnDisbaled = technician
    ? technician.name.length === 0 || technician.contactNumber.length === 0
    : true;
  const btnClassName = `btn ${technician?._id ? "btn-info" : "btn-success"} ${
    loading ? "btn-loading" : ""
  }`;
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
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
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
                disabled={submitBtnDisbaled || loading}
                label="Update Technician"
                className={btnClassName}
                type="submit"
              />
            ) : (
              <Button
                disabled={submitBtnDisbaled || loading}
                label="Add technician"
                className={btnClassName}
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
