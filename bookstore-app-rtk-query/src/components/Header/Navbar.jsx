import React from "react";
import NavList from "./NavList";
import SearchBox from "./SearchBox";
import logo from "../../assets/images/logo.svg";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="py-4 2xl:px-6">
      <div className="container flex items-center justify-between">
        <Link to="/">
          <img
            src={logo}
            width="150px"
            className="object-contain"
            alt="Learn with Sumit"
          />
        </Link>

        <NavList />
        <SearchBox />
      </div>
    </nav>
  );
};

export default Navbar;
