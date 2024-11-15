import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils/tostify";
import { FaUser } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { FaKey } from "react-icons/fa";
import { FormInput } from "../components";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
const Register = () => {
  const [register, setRegister] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [isChecked, setIsChecked] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  const navigate = useNavigate();
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    const newInfo = { ...register, [name]: value };
    setRegister(newInfo);
    console.log(register);
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const { username, password, email } = register;
    console.log(
      "usernme : ",
      username,
      "password: ",
      password,
      "email : ",
      email
    );

   try { 
     const response = await fetch("http://localhost:8080/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, email }),
    });
     const result = await response.json();
    //  console.log("Data recieve from backend : ",result)
     const { success, error,message,data } = result;
     console.log("mesage from backend",message)
     if (success) {
       handleSuccess(message);
      setTimeout(() => {
        navigate("/login");
      }, 1000);
     }else if (error) {
       handleError(message);
       console.error("error: ", error);
     } 
     else{
       handleError(message);
       console.error("error ", message);
     }
     setRegister({ username: "", password: "", email: "" });

   } catch (error) {
    handleError(error)
    console.error('submition error: ', error)
   }
  };

  return (
    <div className="flex justify-center items-center h-screen gap-3 ">
      <form onSubmit={handleOnSubmit}
      >
        <div className="flex flex-col gap-2 ">
          <h1 className="font-bold text-center text-2xl mb-4">Register</h1>

          {/* Username */}
          <FormInput
            name="username"
            type="text"
            value={register.username}
            onChange={handleOnChange}
            placeholder="Username"
            icon={<FaUser />}
          />

          {/* Email Form */}
          <FormInput
            name="email"
            type="email"
            value={register.email}
            onChange={handleOnChange}
            placeholder="Email"
            icon={<SiGmail />}
          />
          
          {/* Password */}
          <FormInput
            name="password"
            type={isChecked ? "text" : "password"}
            value={register.password}
            onChange={handleOnChange}
            placeholder="Password"
            icon={<FaKey />}
            icon2={
              isHidden ?
              <IoEyeOff
              className="cursor-pointer"
              onClick={() => {
                setIsChecked(!isChecked)
                setIsHidden(!isHidden)
              }}
              
            />:<IoEye
              className="cursor-pointer"
              onClick={() => {
                setIsChecked(!isChecked)
                setIsHidden(!isHidden)
              }}
            />}
          />
          
          {/* buttons */}
          <div className="flex flex-col w-full gap-2">
            <button className="btn btn-outline w-full">Register</button>
            <Link to={"/login"}>
              <button type="submit" className="btn btn-neutral w-full">
                Have Account
              </button>
            </Link>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Register;
