import Banner from "../../common/Banner";
import Input from "../../common/Input";
import MessageBody from "../../common/MessageBody";
import LoginSpinnerWithButton from "./LoginbuttonWithSpinner";
import "./Loginpage.css";
import useLoginForm from "./useLoginForm";
export default function Loginpage() {
  const { state, onChangeField, onSubmitForm, message, loading } =
    useLoginForm();
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
          <Input
            placeholder="Email"
            type="email"
            name="email"
            required
            onChange={onChangeField}
            minLength={3}
            value={state.email}
            maxLength={30}
          />
          <Input
            placeholder="Password"
            type="password"
            required
            value={state.password}
            name="password"
            onChange={onChangeField}
            minLength={3}
            maxLength={20}
          />
          <LoginSpinnerWithButton loading={loading} />
          <MessageBody {...message} />
        </form>
      </section>
    </main>
  );
}
