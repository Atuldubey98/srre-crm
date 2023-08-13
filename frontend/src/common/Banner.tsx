import { memo } from "react";
import logo from "../assets/logo.webp";
import "./Banner.css";
function Banner() {
  return (
    <div className="banner d-flex-center">
      <img src={logo} alt="srre" width={90} height={50} />
      <h2>SRRE</h2>
    </div>
  );
}
export default memo(Banner);
