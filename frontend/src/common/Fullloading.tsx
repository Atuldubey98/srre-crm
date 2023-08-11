import { ClipLoader } from "react-spinners";
import "./Fullloading.css";
export default function Fullloading() {
  return (
    <main className="full__loading">
      <ClipLoader color="var(--secondary-color)" />
    </main>
  );
}
