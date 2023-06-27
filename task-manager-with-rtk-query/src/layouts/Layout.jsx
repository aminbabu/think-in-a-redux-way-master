import React from "react";
import Navbar from "../components/Header/Navbar";

const Layout = ({ children }) => {
  return (
    <div className="text-[#111827]">
      <Navbar />
      <div className="container relative">{children}</div>
    </div>
  );
};

export default Layout;
