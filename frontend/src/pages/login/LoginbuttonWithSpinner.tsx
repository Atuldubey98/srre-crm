import { ClipLoader } from "react-spinners";
import Button from "../../common/Button";
export type LoginSpinnerWithButtonProps = {
  loading: boolean;
};
export default function LoginSpinnerWithButton(
  props: LoginSpinnerWithButtonProps
) {
  const { loading } = props;
  return (
    <div className="d-flex-center">
      {loading ? (
        <ClipLoader color="var(--secondary-color)" />
      ) : (
        <Button
          form="login__formID"
          type="submit"
          disabled={loading}
          className="btn btn-success"
          label="Login"
        />
      )}
    </div>
  );
}
