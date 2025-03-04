import React from "react";
import Landing from "./Landing";
import { Navbar, Header } from "../components";
import { Outlet, useLocation } from "react-router-dom";
import { Hero } from "../components";
import { Footer } from "../components";

const HomeLayout = () => {
  return (
    <div>
      <Header />
      <Navbar />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default HomeLayout;
