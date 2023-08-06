import { FormEventHandler, useState } from "react";
import useFieldChange from "../../common/useFieldChange";
import { LoginBody } from "./interfaces";
import { isAxiosError } from "axios";
import { login } from "./loginApi";
import { useAuth } from "../../common/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

export default function useLoginForm() {
  const { state, onChangeField } = useFieldChange<LoginBody>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const authContext = useAuth();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  let location = useLocation();
  let from = location.state?.from?.pathname || "/customers";
  const onSubmitForm: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await login(state);
      authContext?.onSetCurrentUser(data.data.user);
      navigate(from, { replace: true });
      localStorage.setItem("token", data.data.token);
    } catch (error) {
      if (isAxiosError(error)) {
        setError(error.response?.data.message);
      }
    } finally {
      setLoading(false);
    }
  };
  return { state, onChangeField, onSubmitForm, loading, error };
}
