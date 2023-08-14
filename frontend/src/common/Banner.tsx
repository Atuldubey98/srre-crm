import { memo } from "react";
import logo from "../assets/logo.webp";
import "./Banner.css";
function BannerComponent() {
  return (
    <div className="banner d-flex-center">
      <img src={logo} alt="srre" width={90} height={50} />
      <h2>SRRE</h2>
    </div>
  );
}
const Banner = memo(BannerComponent);
export default Banner;
