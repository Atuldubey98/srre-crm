import Button from "../../common/Button";
import Input from "../../common/Input";
import "./Loginpage.css";
import useLoginForm from "./useLoginForm";
export default function Loginpage() {
  const { state, onChangeField, onSubmitForm } = useLoginForm();
  return (
    <main>
      <section className="form__container d-flex-center">
        <form onSubmit={onSubmitForm} className="login__form d-grid">
          <Input
            placeholder="Email"
            type="email"
            name="email"
            onChange={onChangeField}
            minLength={3}
            value={state.email}
            maxLength={30}
          />
          <Input
            placeholder="Password"
            type="password"
            value={state.password}
            name="password"
            onChange={onChangeField}
            minLength={3}
            maxLength={20}
          />
          <div className="d-flex-center">
            <Button type="submit" className="btn btn-success" label="Login" />
          </div>
        </form>
      </section>
    </main>
  );
}
