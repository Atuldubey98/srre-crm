import { FormEventHandler, useState } from "react";
import Button from "../../common/Button";
import FormLabelField from "../../common/FormLabelField";
import { EditSection } from "../../common/PageLeftRight";
import MessageBody, { MessageBodyProps } from "../../common/MessageBody";
import { isAxiosError } from "axios";
import useFieldChange from "../../common/useFieldChange";
import { registerEmployee } from "./usersApi";
import { Employee } from "../login/interfaces";

export type EmployeeUserFormFields = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};
export type AddNewEmployeeFormProps = {
  addToUsersList: (employeeUser: Employee) => void;
};
export default function AddNewEmployeeForm(props: AddNewEmployeeFormProps) {
  const defaultEmployeeUser = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const {
    state: employeeUser,
    onChangeField,
    onSetField,
  } = useFieldChange<EmployeeUserFormFields>(defaultEmployeeUser);
  const [messageBody, setMessageBody] = useState<MessageBodyProps>({
    type: "error",
    body: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const onSubmitRegisterForm: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const errorMessage =
        employeeUser.password !== employeeUser.confirmPassword
          ? "Confirm password and password should be equal"
          : null;
      if (errorMessage) {
        setMessageBody({
          type: "error",
          body: errorMessage,
        });
      } else {
        const { data } = await registerEmployee(employeeUser);
        setMessageBody({
          type: "success",
          body: data.message,
        });
        props.addToUsersList(data.data);
        onSetField(defaultEmployeeUser);
      }
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
  };
  return (
    <EditSection>
      <form onSubmit={onSubmitRegisterForm} className="form">
        <FormLabelField
          input={{
            type: "text",
            required: true,
            name: "name",
            disabled: loading,
            value: employeeUser.name,
            onChange: onChangeField,
          }}
          label="Name:*"
        />
        <FormLabelField
          input={{
            type: "email",
            name: "email",
            required: true,
            disabled: loading,
            value: employeeUser.email,
            onChange: onChangeField,
          }}
          label="Email:*"
        />
        <FormLabelField
          input={{
            type: "password",
            name: "password",
            required: true,
            disabled: loading,
            value: employeeUser.password,
            onChange: onChangeField,
          }}
          label="Password:*"
        />
        <FormLabelField
          input={{
            type: "password",
            name: "confirmPassword",
            required: true,
            disabled: loading,
            value: employeeUser.confirmPassword,
            onChange: onChangeField,
          }}
          label="Confirm Password:*"
        />
        <MessageBody {...messageBody} />
        <Button
          disabled={loading}
          label="Register Employee"
          className="btn btn-success"
          type="submit"
        />
      </form>
    </EditSection>
  );
}
