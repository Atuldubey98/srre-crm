import { memo } from "react";
import logo from "../assets/logo.webp";
import "./Banner.css";
import { Link } from "react-router-dom";
function BannerComponent() {
  return (
    <div className="banner d-flex-center">
      <img src={logo} alt="srre" width={90} height={50} />
      <Link to={"https://s-r-refrigeration.onrender.com"} target="_blank">
        <h2>SRRE</h2>
      </Link>
    </div>
  );
}
const Banner = memo(BannerComponent);
export default Banner;
