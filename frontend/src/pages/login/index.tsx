import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import Banner from "../../common/Banner";
import MessageBody from "../../common/MessageBody";
import IconInput from "./IconInput";
import LoginSpinnerWithButton from "./LoginbuttonWithSpinner";
import "./Loginpage.css";
import useLoginForm from "./useLoginForm";
export default function Loginpage() {
  const { state, onChangeField, onSubmitForm, message, loading } =
    useLoginForm();
  const emailProps = {
    placeholder: "Email",
    type: "email",
    name: "email",
    required: true,
    onChange: onChangeField,
    minLength: 3,
    value: state.email,
    maxLength: 50,
  };
  const passwordProps = {
    placeholder: "Password",
    type: "password",
    name: "password",
    required: true,
    onChange: onChangeField,
    minLength: 8,
    value: state.password,
    maxLength: 30,
  };
  return (
    <main>
      <section className="form__container d-flex-center">
        <form
          onSubmit={onSubmitForm}
          id="login__formID"
          className="login__form d-grid"
        >
          <Banner />
          <i>S R Refrigeration and Electricals - Login (CRMS)</i>
          <IconInput inputProps={emailProps} Icon={HiOutlineMail} />
          <IconInput inputProps={passwordProps} Icon={RiLockPasswordLine} />
          <LoginSpinnerWithButton loading={loading} />
          <div className="login__message">
            <MessageBody {...message} />
          </div>
        </form>
      </section>
    </main>
  );
}
