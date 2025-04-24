import React from 'react'
import { FaTachometerAlt } from "react-icons/fa";
import { FaBoxOpen } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { Link } from 'react-router-dom'


const navLinks =
 [
    { id: 1, name: "Dashboard", path: "/admin", icon: <FaTachometerAlt /> },
    { id: 2, name: "Products", path: "/admin/products", icon: <FaBoxOpen /> },
    { id: 3, name: "Orders", path: "/admin/orders", icon: <FaShoppingCart /> },
    { id: 4, name: "Users", path: "/admin/Users", icon: <FaUsers/> },
    { id: 5, name: "Reviews", path: "/admin/reviews", icon: <FaRegStar/> },
  ];

const AdminSidebar = () => {


  return (
    <div className="fixed bottom-0 left-0 h-screen w-64 bg-gray-800 text-white shadow-lg flex flex-col">
      {/* Logo or Branding */}
      <div className="p-4 text-center bg-gray-900">
        <h1 className="text-xl font-bold">Admin Panel</h1>
      </div>
      {/* Navigation Links */}
      <nav className="flex-grow">
        <ul className="flex flex-col gap-4 p-4">
          {navLinks.map((link) => (
            <li key={link.id}>
              <Link
                to={link.path}
                className="flex items-center gap-3 px-4 py-2     hover:bg-gray-700 rounded"
             
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <footer className="p-4 text-center text-sm bg-gray-900">
        <p>&copy; 2025 Admin Panel</p>
      </footer>
    </div>
  )
}

export default AdminSidebar