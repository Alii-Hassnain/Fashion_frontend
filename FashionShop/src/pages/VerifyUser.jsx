import React, { useState } from "react";
import OtpInput from "react-otp-input";
import {handleSuccess,handleError} from "../utils/tostify"
import { useNavigate } from "react-router-dom";
import { Header } from "../components";

const VerifyUser = () => {
  const [otp, setOtp] = useState(""); 
  const  navigate = useNavigate()
  
  const handleOnChange = (otp) => {
    setOtp(otp); 
    console.log("Verification code:", otp); 
  };

  const handleOnSubmit = async () => {
    console.log("OTP submitted:", otp);
    try {
        const response = await fetch("http://localhost:8080/user/verify-user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({verificationCode:otp }),
          });
           const result = await response.json();
        console.log("result from backend",result);
        const {success,message,data} = result;
        if(success){
           handleSuccess(message)
            setOtp("")
            setTimeout(() => {
                navigate("/login")
            },2000)
        }else if(!success){
            console.log("error from backend : ",message)
          handleError(message)

        }
        else{
            handleError(message)
        }

        setOtp("")
    } catch (error) {
        console.log("error in verify user : ",error)
        handleError(error.message)
    }
  }
  const handleInputProps = (props) => ({
    ...props,
    type: "tel", // Ensures numeric input
    inputMode: "numeric", // Opens numeric keypad on mobile
    pattern: "[0-9]*", // Enforces numeric input
    className:
      " w-10 h-10 text-center border-2 border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 text-3xl text-gray-400  bg-gray-50 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 mx-1.5",
      style: { outline: "none" }, // Enhanced styles
  });

  return (
    <>
    <Header />
    <div className="bg-gray-50 min-h-screen flex flex-col justify-center items-center">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h1 className="font-extrabold text-center text-3xl text-gray-600 mb-6">
          Verify Your OTP
        </h1>
        <h2 className="text-center text-lg font-semibold text-gray-600 bg-gray-200 rounded-md p-2 mb-6">
          Enter the OTP sent to your email
        </h2>

        <OtpInput
          value={otp} // Bind the value to the OTP state
          onChange={handleOnChange} // Update state on input change
          numInputs={6} // Number of OTP input fields
          renderSeparator={<span>-</span>} // Separator between OTP inputs
          renderInput={(props) => <input {...handleInputProps(props)} />} // Custom input styling and behavior
        />

        <button
          onClick={handleOnSubmit} // Log OTP code on button click
          className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg font-medium text-lg hover:bg-indigo-600 transition duration-200 mt-4"
        >
          Submit
        </button>

      </div>
    </div>
    </>
  );
};

export default VerifyUser;


