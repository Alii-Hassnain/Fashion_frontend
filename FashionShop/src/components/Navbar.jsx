import React from "react";
import { Links } from "./Links";
import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import { NavLink } from "react-router-dom";
import { BsCart3, BsMoonFill, BsSunFill } from "react-icons/bs";
import { FaBarsStaggered } from "react-icons/fa6";

const Navbar = () => {
  return (
    <nav className="bg-base-200">
      <div className="navbar align-elements">
        {/* take all the content at the start of the navbar */}

        <div className="navbar-start">
          <NavLink to="/" className="flex lg:flex text-3xl items-center">
            <h1 className="font-bold text-xl">
              Fashion<span className="text-yellow-400">Vista</span>
            </h1>
          </NavLink>
        </div>
        <div className="navbar-end lg:hidden">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <FaBarsStaggered />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-dropdown-toggle menu-sm dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
              <NavLinks />
            </ul>
          </div>
        </div>

        {/* make the navbar center */}

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal">
            <NavLinks />
          </ul>
        </div>

        {/* navbar end */}
        <div className="lg:navbar-end">
          <div className="indicator">
            <span className="indicator-item badge badge-base-200">9</span>
            <div className="grid place-items-center">
            <NavLink to="cart">
              <BsCart3 className="text-2xl cursor-pointer" />
            </NavLink>
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
