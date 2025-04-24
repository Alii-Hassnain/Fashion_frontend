import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { RiAdminFill } from 'react-icons/ri';
import { HiMenu } from 'react-icons/hi';
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaShoppingCart,
  FaUsers,
  FaRegStar,
} from 'react-icons/fa';
import logo from "../../assets/featureImg/LOGO.png";

// ✅ Navigation links with icons
const navLinks = [
  { id: 1, name: "Dashboard", path: "/admin", icon: <FaTachometerAlt />, exact: true },
  { id: 2, name: "Products", path: "/admin/products", icon: <FaBoxOpen /> },
  { id: 3, name: "Orders", path: "/admin/orders", icon: <FaShoppingCart /> },
  { id: 4, name: "Users", path: "/admin/Users", icon: <FaUsers /> },
  { id: 5, name: "Reviews", path: "/admin/reviews", icon: <FaRegStar /> },
];

const AdminSidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/*  Toggle button for small screens */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 text-white bg-gray-800 p-2 rounded"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <HiMenu size={24} />
      </button>

      {/*  Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-[#1F2937] text-white shadow-xl flex flex-col transform transition-transform duration-300 z-40 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        {/*  Branding */}
        <div className="p-6 flex flex-col justify-center items-center gap-3 border-b border-gray-700">
          <div className="text-4xl text-blue-400">
            <RiAdminFill />
          </div>
          <h1 className="text-2xl font-semibold">Admin Panel</h1>
        </div>

        {/*  Navigation */}
        <nav className="flex-grow overflow-y-auto">
          <ul className="flex flex-col gap-2 px-4 py-6">
            {navLinks.map((link) => (
              <li key={link.id}>
                <NavLink
                  to={link.path}
                  end={link.exact}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`
                  }
                  onClick={() => setSidebarOpen(false)} // Auto close on mobile
                >
                  {link.icon}
                  <span>{link.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/*  Footer */}
        <footer className="p-4 text-center text-xs text-gray-400 bg-[#111827]">
          <p>&copy; 2025 Admin Panel</p>
        </footer>
      </div>
    </>
  );
};

export default AdminSidebar;
