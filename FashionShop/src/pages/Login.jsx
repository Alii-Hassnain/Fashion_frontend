import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SiGmail } from "react-icons/si";
import { FaKey } from "react-icons/fa";
import { FormInput } from "../components";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";

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
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();
      console.log("Data recieve from backend : ", result);
      const { success, error, message, data, token } = result;
      console.log("mesage from backend", message);
      console.log("token from backend", token);

      if (success) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(data.username));
        // navigate("/products")
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    const newInfo = { ...loginInfo, [name]: value };
    setLoginInfo(newInfo);
    console.log(loginInfo);
  };
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-3">
      <form onSubmit={handleOnSubmit}>
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-center text-2xl mb-4">Login</h1>

          {/* EmailForm  */}
          <FormInput
            type="text"
            name="email"
            defaultvalue={loginInfo.email}
            placeholder="Email"
            icon={<SiGmail />}
          />
          {/* PasswordForm */}
          <FormInput
            type={isChecked ? "text" : "password"}
            name="password"
            defaultvalue={loginInfo.password}
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
          
          
          <button className="my-2 btn btn-outline">Login</button>
          <div className="flex flex-col text-sm">
            <p className="my-2 text-sm text-primary link-hover cursor-pointer">
              Forgot password
            </p>
            <div className="flex flex-row gap-2">
              <p>Does't have an account</p>
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
  );
};

export default Login;
