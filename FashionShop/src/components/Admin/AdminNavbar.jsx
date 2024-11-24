import React from "react";
import { NavLink } from "react-router-dom";

const AdminNavbar = () => {
  return (
    <nav className="bg-base-200 ml-64">
      <div className="navbar align-elements">
        <div className="navbar-start">
          <NavLink to="/admin" className="flex lg:flex text-3xl items-center">
            <h1 className="font-bold text-xl">Welcome: Ali Hassnain</h1>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
