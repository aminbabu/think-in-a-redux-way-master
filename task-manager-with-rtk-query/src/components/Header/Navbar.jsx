import React from "react";
import { Link } from "react-router-dom";
import Searchbox from "./Searchbox";
import logo from "/images/logo.svg";

const Navbar = () => {
  return (
    <nav className="container relative py-3">
      <div className="flex items-center justify-between">
        <Link to="/">
          <img src={logo} />
        </Link>
        <Searchbox />
      </div>
    </nav>
  );
};

export default Navbar;
