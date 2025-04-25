import React, { useState, useEffect } from "react";
import { Links } from "./Links";
import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import { NavLink } from "react-router-dom";
import { BsCart3, BsMoonFill, BsSunFill } from "react-icons/bs";
import { FaBarsStaggered } from "react-icons/fa6";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import axios from "axios";

// const username = Cookies.get("username");
// console.log("Username from cookie:", username);
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Navbar = () => {
  const baseURL = import.meta.env.VITE_SERVER_URI;
  const cartNumber = useSelector((state) => state.cart.totalQuantity);
  const [userName, setUserName] = useState(null);
  const checkAuthCookie = async () => {
    try {
      const response = await fetch(`${baseURL}/user/verify-session`, {
        method: "GET",
        credentials: "include",
      });
      const result = await response.json();
      console.log("reseult from verify session is : ", result);
      setUserName(result.user.username);
      console.log(result.success);
      return result.success;
    } catch (error) {
      console.error("Error checking session:", error);
      return false;
    }
  };
  useEffect(() => {
    checkAuthCookie();
  }, []);

  return (
    <nav className="bg-base-200">
    <div className="navbar align-elements">
  
      {/* LEFT: Brand Name */}
      <div className="navbar-start">
        <NavLink to="/" className="flex items-center text-3xl">
          <h1 className="font-bold text-xl">
            Fashion<span className="text-yellow-400">Vista</span>
          </h1>
        </NavLink>
      </div>
  
      {/* RIGHT (Mobile): Hamburger Menu */}
      <div className="navbar-end lg:hidden">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost">
            <FaBarsStaggered />
          </label>
          <ul
            tabIndex={0}
            className="menu dropdown-content menu-sm bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
          >
            <NavLinks />
          </ul>
        </div>
      </div>
  
      {/* CENTER (Desktop): Main Links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <NavLinks />
        </ul>
      </div>
  
      {/* RIGHT: Cart, Username, Avatar (visible on all screen sizes) */}
      <div className="navbar-end flex gap-4 items-center">
        
        {/* Cart Icon with Item Count */}
        <div className="indicator">
          <span className="indicator-item badge badge-base-200">
            {userName ? cartNumber || 0 : 0}
          </span>
          <NavLink to="/cart">
            <BsCart3 className="text-2xl cursor-pointer" />
          </NavLink>
        </div>
  
        {/* Username (optional) */}
        {userName && <div className="text-sm font-light">{userName}</div>}
  
        {/* Dropdown Avatar */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="avatar w-10">
              <div className="w-24 rounded-full">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{userName}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link to="/profile">
              <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
  
      </div>
    </div>
  </nav>
  

  );
};

export default Navbar;
