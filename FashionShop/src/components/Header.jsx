import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import { handleSuccess } from "../utils/tostify";

const deleteCookie = (name) => {
  document.cookie = `${name}=; Max-Age=0; path=/;`; // 
};
const Header = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    handleSuccess("User Successfully logged out ");
    alert("User Successfully logged out ");
    localStorage.removeItem("token"); 
    localStorage.removeItem("user");  
    deleteCookie("token");
    setTimeout(() => {
      navigate("/login"); 
    },2000)
};


  return (
    <header className="bg-neutral py-2 text-neutral-content">
      <div className="align-elements flex justify-center sm:justify-between">
        {/* left */}
        <div className="flex gap-2">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="mt-1">
              <div className="flex flex-row gap-1">
                <p className="link-hover text-sm">Currency</p>
                <FaChevronDown className="mt-1" />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box z-[1] w-52 p-2 shadow"
            >
              <li>
                <a>PKR</a>
              </li>
              <li>
                <a>USD</a>
              </li>
            </ul>
          </div>
        </div>

        {/* right */}
        <div className="flex gap-5">
          {/* Conditionally render based on whether the user is logged in */}
              <Link to={"/login"}>
                <p className="link-hover text-sm">Log in</p>
              </Link>
              <Link to={"/register"}>
                <p className="link-hover text-sm">Register</p>
              </Link>
          
            <button
              className="link-hover text-sm hover:text-red-400"
              onClick={handleLogout} // Trigger the logout function when clicked
            >
              Logout
            </button>
        </div>
        {/* <div className="flex gap-5">
          <Link to={"/login"}>
            <p className="link-hover text-sm">Log in</p>
          </Link>
          <Link to={"/register"}>
            <p className="link-hover text-sm">Register</p>
          </Link>
          
          <button
  className="link-hover text-sm hover:text-red-400"
  onClick={handleLogout} 
>
  Logout
</button>
        </div> */}
      </div>
    </header>
  );
};


 export default Header;

 // import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FaChevronDown } from "react-icons/fa";

// // Function to get a specific cookie by name
// const getCookie = (name) => {
//   const cookies = document.cookie.split("; ");
//   for (const cookie of cookies) {
//     const [key, value] = cookie.split("=");
//     if (key === name) return value;
//   }
//   return null;
// };

// // Function to delete a cookie by name
// const deleteCookie = (name) => {
//   document.cookie = `${name}=; Max-Age=0; path=/;`; // Set Max-Age to 0 to remove the cookie
// };

// const Header = () => {
//   const navigate = useNavigate();
//   const [isLoggedIn, setIsLoggedIn] = useState(false); 
//   useEffect(() => {
//     const authToken = getCookie("accessToken");
//      // Check for the auth cookie
//     setIsLoggedIn(!!authToken); // Update state based on cookie presence
//   }, []);

//   // Handle logout
//   const handleLogout = () => {
//     deleteCookie("accessToken");
//     deleteCookie("refreshToken");           
//     setIsLoggedIn(false); // Update state to reflect logout
//     navigate("/login"); // Redirect to login page
//   };

//   return (
//     <header className="bg-neutral py-2 text-neutral-content">
//       <div className="align-elements flex justify-center sm:justify-between">
//         {/* left */}
//         <div className="flex gap-2">
//           <div className="dropdown">
//             <div tabIndex={0} role="button" className="mt-1">
//               <div className="flex flex-row gap-1">
//                 <p className="link-hover text-sm">Currency</p>
//                 <FaChevronDown className="mt-1" />
//               </div>
//             </div>
//             <ul
//               tabIndex={0}
//               className="dropdown-content menu rounded-box z-[1] w-52 p-2 shadow"
//             >
//               <li>
//                 <a>PKR</a>
//               </li>
//               <li>
//                 <a>USD</a>
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* right */}
//         <div className="flex gap-5">
//           {/* Conditional rendering based on login state */}
//           {isLoggedIn ? (
//             <button
//               className="link-hover text-sm hover:text-red-400"
//               onClick={handleLogout}
//             >
//               Logout
//             </button>
//           ) : (
//             <>
//               <Link to={"/login"}>
//                 <p className="link-hover text-sm">Log in</p>
//               </Link>
//               <Link to={"/register"}>
//                 <p className="link-hover text-sm">Register</p>
//               </Link>
//             </>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;
