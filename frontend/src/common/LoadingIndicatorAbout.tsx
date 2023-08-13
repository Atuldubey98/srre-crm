import { ClockLoader } from "react-spinners";
import './LoadingIndicatorAbout.css';
export type LoadingIndicatorAboutProps = {
  loading: boolean;
};
export default function LoadingIndicatorAbout(
  props: LoadingIndicatorAboutProps
) {
  return props.loading ? (
    <div className="loading__indiAbout d-flex-center">
      <ClockLoader color="var(--secondary-color)" />
    </div>
  ) : null;
}
