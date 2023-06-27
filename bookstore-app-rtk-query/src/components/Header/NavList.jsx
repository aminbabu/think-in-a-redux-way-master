import React from "react";
import { Link, useMatch } from "react-router-dom";

const NavList = () => {
  const match = useMatch("/");

  return (
    <ul className="hidden md:flex items-center space-x-6">
      <li>
        <Link
          className={`cursor-pointer ${match ? "font-semibold" : ""}`}
          to="/"
          id="lws-bookStore"
        >
          Book Store
        </Link>
      </li>
      <li>
        <Link
          className={`cursor-pointer ${!match ? "font-semibold" : ""}`}
          to="/new-book"
          id="lws-addBook"
        >
          Add Book
        </Link>
      </li>
    </ul>
  );
};

export default NavList;
