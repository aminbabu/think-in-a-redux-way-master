import { useSelector } from "react-redux";
import logo from "../assets/images/logo.png";

export default function Navbar({ handler }) {
  const products = useSelector((state) => state.cart);

  return (
    <nav className="bg-[#171C2A] py-4">
      <div className="navBar">
        <a href="/" onClick={(e) => handler(e, "home")}>
          <img src={logo} alt="LWS" className="max-w-[140px]" />
        </a>

        <div className="flex gap-4">
          <a
            href="#home"
            className="navHome"
            id="lws-home"
            onClick={(e) => handler(e, "home")}
          >
            Home
          </a>
          <a
            href="#cart"
            className="navCart"
            id="lws-cart"
            onClick={(e) => handler(e, "cart")}
          >
            <i className="text-xl fa-sharp fa-solid fa-bag-shopping"></i>
            <span id="lws-totalCart">
              {products.reduce(
                (total, product) => total + product?.quantity,
                0
              )}
            </span>
          </a>
        </div>
      </div>
    </nav>
  );
}
