import { FormEventHandler, useState } from "react";
import useFieldChange from "../../common/useFieldChange";
import { LoginBody } from "./interfaces";
import { isAxiosError } from "axios";
import { login } from "./loginApi";
import { useAuth } from "../../common/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { MessageBodyProps } from "../../common/MessageBody";

export default function useLoginForm() {
  const { state, onChangeField } = useFieldChange<LoginBody>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const authContext = useAuth();
  const [message, setMessage] = useState<MessageBodyProps>({
    type: "success",
    body: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/customers";
  const onSubmitForm: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await login(state);
      authContext?.onSetCurrentUser(data.data.user);
      localStorage.setItem("token", data.data.token);
      navigate(from, { replace: true });
    } catch (error) {
      setMessage({
        ...message,
        type: "error",
        body: isAxiosError(error)
          ? error.response?.data.message
          : "Netowork Error occured",
      });
    } finally {
      setLoading(false);
    }
  };
  return { state, onChangeField, onSubmitForm, loading, message };
}
