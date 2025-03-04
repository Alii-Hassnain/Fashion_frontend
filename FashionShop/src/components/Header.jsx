import React,{ useState, useEffect } from "react";
import { Link , useNavigate } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import { handleSuccess,handleError } from "../utils/tostify";
import axios from "axios";
import { useDispatch } from "react-redux";


const deleteCookie = (name) => {
  document.cookie = `${name}=; Max-Age=0; path=/;`; // 
};
const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const checkAuthCookie = async () => {
    try {
      const response = await axios.get("http://localhost:8080/user/verify-session", {
        withCredentials: true, // Ensures cookies are sent with the request
      });
      return response.data.success;

    } catch (error) {
      console.error("Error checking session:", error);
      return false;
    }
  };
  useEffect(() => {
    const checkLoginState = async () => {
      const isLoggedIn = await checkAuthCookie();
      setIsLoggedIn(isLoggedIn);
    };
    checkLoginState();
  }, []);

  const handleLogout = async () => {
    try {
      // Call the logout API
      const response = await fetch("http://localhost:8080/user/logout", {
        method: "POST",
        credentials: "include", // Ensures cookies are sent with the request
      });

      // Handle the API response
      const result = await response.json();
      const { success, message } = result;

      if (success) {
        handleSuccess(message);
        console.log("Logout result: ", message);
        setIsLoggedIn(false); 
        localStorage.removeItem("token"); // Clear local storage (if needed)
        localStorage.removeItem("user");


       
        
        setTimeout(() => {
          navigate("/login"); // Redirect to login page
          
        },2000)        
      }
    } catch (error) {
      // Network or other unexpected errors
      console.error("Error during logout: ", error);
      handleError(error);
    }


  };
  console.log(isLoggedIn);
  
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
          {/* <Link to={"/login"}>
            <p className="link-hover text-sm">Log in</p>
          </Link> */}
          <Link to={"/register"}>
            <p className="link-hover text-sm">Register</p>
          </Link>
          { isLoggedIn ? (
          <p className="link-hover text-sm hover:text-red-400 cursor-pointer" onClick={handleLogout} >Logout</p>
          ):(
            <Link to={"/login"}>
            <p className="link-hover text-sm">Log in</p>
            </Link>
          )}
        </div>
      </div>
    </header>

  );
};


 export default Header;

    //     right
    //     <div className="flex gap-5">
         
    //           <Link to={"/login"}>
    //             <p className="link-hover text-sm">Log in</p>
    //           </Link>
    //           <Link to={"/register"}>
    //             <p className="link-hover text-sm">Register</p>
    //           </Link>
          
    //         <button
    //           className="link-hover text-sm hover:text-red-400"
    //           onClick={handleLogout} 
    //         >
    //           Logout
    //         </button>
    //     </div>
      
    //       </Link> */}
    //       <Link to={"/register"}>
    //         <p className="link-hover text-sm">Register</p>
    //       </Link>
    //       { isLoggedIn ? (
    //       <button className="link-hover text-sm hover:text-red-400" onClick={handleLogout} >logout</button>
    //       ):(
    //         <Link to={"/login"}>
    //         <p className="link-hover text-sm">Log in</p>
    //         </Link>
    //       )}
    //     </div>
    // </header>