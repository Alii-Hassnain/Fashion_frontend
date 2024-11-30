import { useState } from "react";
import { FormInput } from "../components";
import { Link, useNavigate, useParams } from "react-router-dom";
import { handleError, handleSuccess } from "./../utils/tostify";
// import { set } from "mongoose";
const ResetPassword = () => {
  const [password, setPassowrd] = useState("");

  const { token } = useParams();
  console.log("token from frontend before reset password: ", token);
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setPassowrd(e.target.value);
    console.log("password :", password);
  };

  const handleSubmit = async () => {
    console.log("password from frontend", password);
    console.log("token from frontend : ", token);
    try {
      const response = await fetch(
        `http://localhost:8080/user/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password, token }),
        }
      );
      const result = await response.json();
      console.log("result from backend", result);
      const { success, message, data } = result;
      if (success) {
        console.log("message from backend : ", message);
        handleSuccess(message);
        setPassowrd("");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log("error in reset password", error);
      handleError(error.message);
    }
  };
  return (
    <div className="relative h-screen">
        <div
         className="absolute top-0 left-0 w-full h-full z-0 bg-cover bg-center filter blur-[2px]"
         style={{
           backgroundImage: `url(${background})`,
         }}
      >
      </div>
      
      <div className="flex flex-col justify-center items-center h-screen gap-3">
        <h1 className="font-bold text-center text-2xl mb-4">
          Reset Password ...
        </h1>
        <p className="text-start text-white">
             Enter your new password
        </p>
        <FormInput
          type="password"
          name="password"
          value={password}
          onChange={handleOnChange}
          placeholder="Enter your password "
        />
        {/* <Link to="/newPassword"> */}
        <button className="my-2 btn btn-outline" onClick={handleSubmit}>
          Submit
        </button>
        {/* </Link> */}
      </div>
    </div>
  );
};

export default ResetPassword;
