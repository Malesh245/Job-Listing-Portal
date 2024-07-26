import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./shared/Footer";
import Navbar from "./shared/Navbar";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <Outlet /> {/* This will render the current route's component */}
      <Footer />
    </div>
  );
};

export default Layout;
