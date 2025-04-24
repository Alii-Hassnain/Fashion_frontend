
import React ,{useEffect,useState}from "react";
import { NavLink , useNavigate} from "react-router-dom";
import { handleSuccess,handleError } from "../../utils/tostify";
const baseURL = import.meta.env.VITE_SERVER_URI;

const AdminNavbar = () => {
    const [userName,setUserName]=useState("");
    const navigate=useNavigate();
    const getAdminDetails=async()=>{
      try{
       const response =await fetch(`${baseURL}/admin/admin-details`,{
        method:"GET",
        credentials:"include",
       });
       const result=await response.json();
       const {success,message,data,userName}=result;
       setUserName(userName);
       console.log("result from backend : ",result);
       if(!success){
        handleError(message);
        navigate("/login");
      }
       } 
      catch(error){
        console.log("errror in getting admin details",error);
      }
    }

    const handleLogout = async () => {
      try {
        const response = await fetch(`${baseURL}/user/logout`, {
          method: "POST",
          credentials: "include", 
        });
  
        const result = await response.json();
        const { success, message } = result;
  
        if (success) {
          handleSuccess(message);
          console.log("Logout result: ", message);
          localStorage.removeItem("token"); 
          localStorage.removeItem("user");
  
          setTimeout(() => {
            navigate("/login"); 
          },2000)        
        }else if (!success) {
          console.error("Logout error: ", message);
          handleError(message);
        } 
        else {
          console.error("Logout error: ", message);
          handleError(message);
        }
      } catch (error) {
        // Network or other unexpected errors
        console.error("Error during logout: ", error);
        handleError(error);
      }
    };
useEffect(()=>{
  getAdminDetails();
},[])

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm ml-64">
    <div className="navbar align-elements px-4 py-3">
      <div className="navbar-start">
        <NavLink to="/admin" className="flex items-center text-gray-800">
          <h1 className="font-bold text-2xl">Welcome: {userName}</h1>
        </NavLink>
      </div>
      <div className="navbar-end">
        <button
          type="button"
          onClick={handleLogout}
          className="text-red-600 font-medium hover:text-red-800 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  </nav>
  
  );
};

export default AdminNavbar;



