import { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../common/Button";
import LoadingIndicatorAbout from "../../common/LoadingIndicatorAbout";
import { AboutSection } from "../../common/PageLeftRight";
import OperationBtnsGroup from "../customers/OperationBtnsGroup";
import { Employee } from "../login/interfaces";
import EmployeeNotfound from "./EmployeeNotfound";
import EmployeeUserDisplay from "./EmployeeUserDisplay";
import { deleteUserById, getUserById } from "./usersApi";
export type AboutEmployeeProps = {
  removeUserFromList: (employeeId: string) => void;
};
export default function AboutEmployee(props: AboutEmployeeProps) {
  const { userId } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [employeeUser, setEmployeeUser] = useState<Employee | null>(null);
  useEffect(() => {
    (async () => {
      try {
        if (userId) {
          setLoading(true);
          const { data } = await getUserById(userId);
          setEmployeeUser(data.data);
        }
      } catch (error) {
        setErrorMessage(
          isAxiosError(error)
            ? error.response?.data.message
            : "Network error occured"
        );
      } finally {
        setLoading(false);
      }
    })();
  }, [userId]);
  const navigate = useNavigate();
  const onRemoveEmployee = async () => {
    try {
      await deleteUserById(employeeUser?._id || "");
      props.removeUserFromList(employeeUser?._id || "");
      setEmployeeUser(null);
      navigate("/users");
    } catch (error) {
      setErrorMessage(
        isAxiosError(error)
          ? error.response?.data.message
          : "Network error occured"
      );
    }
  };
  return (
    <AboutSection>
      <OperationBtnsGroup
        navigationUrl="/users/new"
        operationLabel="Add Employee"
        searchPlaceHolder="Search Employee"
        searchUrl="/users"
      />
      {loading ? (
        <LoadingIndicatorAbout loading={loading} />
      ) : employeeUser ? (
        <>
          <EmployeeUserDisplay {...employeeUser} />
          <div className="d-flex-center">
            <Button
              disabled={loading}
              label="Deactivate"
              className="btn btn-danger"
              onClick={onRemoveEmployee}
            />
          </div>
        </>
      ) : (
        <EmployeeNotfound errorMessage={errorMessage} />
      )}
    </AboutSection>
  );
}
