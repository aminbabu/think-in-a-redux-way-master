import { Link } from "react-router-dom";
import logo from "../../assets/image/learningportal.svg";

const Brand = () => {
  return (
    <Link to="/">
      <img
        src={logo}
        alt="LWS Learning Portal"
        className="w-44 xs:w-52 sm:w-64 transition-all duration-200"
      />
    </Link>
  );
};

export default Brand;
