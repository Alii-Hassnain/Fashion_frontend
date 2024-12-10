import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SiGmail } from "react-icons/si";
import { FaKey } from "react-icons/fa";
import { FormInput, Header, Navbar } from "../components";
import { SubmitMe } from "../components";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { handleSuccess, handleError } from "../utils/tostify";
import { Outlet } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import background from "../assets/hero2.webp";

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const [isChecked, setIsChecked] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  const navigate = useNavigate();
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    console.log("email:", email, "password : ", password);
    try {
      const response = await fetch("http://localhost:8080/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();
      console.log("Data recieve from backend : ", result);
      const { success, error, message, data, token } = result;
      // console.log("mesage from backend", message);
      console.log("data from backend : ",data );
      // console.log("token from backend", token);
      if (success) {
        if(data.role==="admin"){ 
          handleSuccess("Admin login successful");
          setTimeout(() => {    
        navigate("/admin")
          },2000)
        }
        else{
        console.log("success status : ", success);
        handleSuccess(message);
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(data.username));
        setTimeout(() => {
          navigate("/")
        },2000)
        
        }
        }
      else if (error ){
        handleError(error)
        
      }
      
      else{
        handleError(message)
      }
      // setLoginInfo({ email: "", password: "" });
    } catch (error) {
      console.log(error);
    }
  };
  const hanldeOnChange = (e) => {
    const { name, value } = e.target;
    const newInfo = { ...loginInfo, [name]: value };
    setLoginInfo(newInfo);
    console.log(loginInfo);
  };
  const handleGoogleLogin = async () => {
    console.log("google login clicked");
    window.open("http://localhost:8080/auth/google", "_self");
  };
  return (
    <div className="relative h-screen">
      <div
        className="absolute top-0 left-0 w-full h-full z-0 bg-cover bg-center "
        style={{
          backgroundImage: `url(${background})`,
        }}
      ></div>
      <div className="relative z-10 flex flex-col justify-center items-center h-screen gap-3 ">

        {/* login container */}
        <div className="relative shadow-neutral-100 shadow-md p-12 rounded-xl backdrop-blur-sm">
        <div className="absolute top-5 right-5 text-2xl text-white hover:bg-red-600 cursor-pointer">
            <Link to={"/"}>
            <RxCross2/>
            </Link>
          </div>
          <form onSubmit={handleOnSubmit}>
            <div className="flex flex-col gap-2">
              <h1 className="font-bold text-center text-2xl mb-4 text-white">
                Login
              </h1>

          {/* EmailForm  */}
          <FormInput
            type="text"
            name="email"
            value={loginInfo.email}
            onChange={hanldeOnChange}
            placeholder="Email"
            icon={<SiGmail />}
          />
          {/* PasswordForm */}
          <FormInput
            type={isChecked ? "text" : "password"}
            name="password"
            value={loginInfo.password}
            onChange={hanldeOnChange}
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
          {/* <button className="my-2 btn btn-outline text-white">Login</button> */}
          <SubmitMe text={"Login"} />
          <button type="button" className="my-2 btn btn-outline text-white" onClick={handleGoogleLogin}>Login with Google</button>
          <div className="flex flex-col text-sm">
            

              <Link to="/forgotPassword" > 
                <p className="my-2 text-sm text-primary link-hover cursor-pointer">
                  Forgot password
                </p>
              </Link>
            <div className="flex flex-row gap-2 text-white">
              <p className="text-white">Does't have an account</p>
              <Link to={"/register"}>
                <p className="text-primary link-hover cursor-pointer">
                  Register
                </p>
              </Link>
            </div>
          </div>
        </div>
      </form>
      </div>
      <Outlet/>
    </div>
    </div>
  );
};

export default Login;
