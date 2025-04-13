import { axiosFetchUsers } from './../../../utils/axiosFetch';
const BASE_URL = "http://localhost:8080/user"

  export const checkAuth = async () => {
    try {
   const response =await fetch("http://localhost:8080/user/verify-session", {
        method: "GET",
        credentials: "include", 
      });
      const result = await response.json();
      if(result){
        // console.log("user verify-session in user services  is : ",result)
        return result; 
      }else{
        console.log("user services response  is : ",result)
        return false; 
      }
      

    } catch (error) {
      console.error("Error checking session:", error);
      return false;
    }
  };
  
  export const logoutUser = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/logout`, {}, {
        withCredentials: true, // Ensures cookies are sent with the request
      });
      console.log("logout response is : ",response.data.success)
      return response.data.success;
    } catch (error) {
      console.error("Error during logout:", error);
      return false;
    }
  };
  export const getAllUsers = async () => {
    try {
      const response = await fetch ("http://localhost:8080/admin/get-users", {
        method: "GET",
        credentials: "include", 
      });
      const data = await response.json();
      console.log("getAllUsers response is : ",data)
      if(data.success){
        return data;
      }
      else {
        console.log("getAllUsers response is : ",data)
        return false; 
      }
    }
    catch (error) {
      console.error("Error fetching users:", error);
      return false; 
    }
  }; 
  export const getAllUsersOrderSummary = async () => {
    try {
      const response = await fetch ("http://localhost:8080/admin/getAllUsersOrderSummary", {
        method: "GET",
        credentials: "include", 
      });
      const data = await response.json();
      console.log("getAllUsersOrderSummary response is : ",data)
      if(data.success){
        return data;
      }
      else {
        console.log("getAllUsersOrderSummary response is : ",data)
        return false; 
      }
    }
    catch (error) {
      console.error("Error fetching users:", error);
      return false; 
    }
  } 
export const deleteUserById=async (userId) => {
  try {
    const response = await fetch(`http://localhost:8080/admin/delete-user/${userId}`, {
      method: "DELETE",
      credentials: "include",
    });
    const data = await response.json();
    console.log("data from backend for deleting user in user services : ", data);
    if (data.success) {
      return data;
    } else {
      handleError(data.message);
      return false;

    }
  }
  catch (error) {
    console.log("error in deleting user in userServices : ", error);
    handleError("Error deleting user");
    return false;
  }
}