import { axiosFetchUsers } from './../../../utils/axiosFetch';
const BASE_URL = "http://localhost:8080/user"
// export const checkAuth = async () => {
//     try {
//       const response = await axios.get(`${BASE_URL}/verify-session`, {
//         withCredentials: true, // Ensures cookies are sent with the request
//       });
//       console.log("user services response is : ",response.data)
//       return response.data.success;

//     } catch (error) {
//       console.error("Error checking session:", error);
//       return false;
//     }
//   };
  export const checkAuth = async () => {
    try {
   const response =await fetch("http://localhost:8080/user/verify-session", {
        method: "GET",
        credentials: "include", 
      });
      const result = await response.json();
      if(result.success){
        console.log("user services response is : ",result)
        return result; 
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