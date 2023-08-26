import { ClipLoader } from "react-spinners";

export default function SmallLoading() {
  return (
    <div className="d-flex-center">
      <ClipLoader color="var(--secondary-color)" />
    </div>
  );
}
