import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils/tostify";
import { FaUser } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { FaKey } from "react-icons/fa";
import { FormInput } from "../components";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import { Navbar, Header } from "../components";
import { SubmitMe } from "../components";
import { axiosFetchUsers } from "../utils/axiosFetch";
import { RxCross2 } from "react-icons/rx";
import background from "../assets/hero1.webp";

const Register = () => {
  const [register, setRegister] = useState({
    username: "",
    password: "",
    email: "",
    secret: "",
  });
  const [isChecked, setIsChecked] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    const newInfo = { ...register, [name]: value };
    setRegister(newInfo);
    console.log(register);
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const { username, password, email, secret } = register;
    console.log(
      "username : ",
      username,
      "password: ",
      password,
      "email : ",
      email,
      "secret : ",
      secret
    );

    try {
      const response = await fetch("http://localhost:8080/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, email, secret }),
      });
      const result = await response.json();
      //  console.log("Data recieve from backend : ",result)
      const { success, error, message, data } = result;
      console.log("mesage from backend", message);
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/verify-user");
        }, 1000);
      } else if (error) {
        handleError(message);
        //  setRegister({ username: "", password: "", email: "" });
        console.error("error: ", error);
      } else if (success === false) {
        handleError(message);
        setRegister({ username: "", password: "", email: "", secret: "" });
        console.error("error: ", message);
      } else {
        handleError(message);
        console.error("error ", message);
        // setRegister({ username: "", password: "", email: "" });
      }
      setRegister({ username: "", password: "", email: "", secret: "" });
    } catch (error) {
      handleError(error);
      console.error("submition error: ", error);
      setRegister({ username: "", password: "", email: "", secret: "" });
    }
  };
  const handleGoogleLogin = async () => {
    console.log("google login clicked");
    window.open("http://localhost:8080/auth/google", "_self");
  };

  return (
    <div className="relative h-screen">
      <div
        className="absolute top-0 left-0 w-full h-full z-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${background})`,
        }}
      ></div>
      <div className="relative flex justify-center z-10 items-center h-screen gap-3 ">
        
        {/* Register container */}
        <div className="relative shadow-md shadow-neutral-100 p-12 rounded-xl backdrop-blur-sm">
          <div className="absolute top-5 right-5 text-2xl text-white hover:bg-red-600 cursor-pointer">
            <Link to={"/"}>
            <RxCross2/>
            </Link>
          </div>
          <form onSubmit={handleOnSubmit}>
            <div className="flex flex-col gap-2 ">
              <h1 className="font-bold text-center text-2xl mb-4 text-white">
                Register
              </h1>

              {/* button are here */}
              {/* <div className="flex justify-center items-center gap-2">
                <button
                  type="button"
                  className={`bg-gray-500 text-white py-2 rounded mr-6 ${
                    isAdmin && "bg-blue-500"
                  }`}
                  onClick={() => setIsAdmin(true)}
                >
                  As Admin
                </button>
                <button
                  type="button"
                  className={`bg-gray-500 text-white py-2 rounded mr-6 ${
                    !isAdmin && "bg-blue-500"
                  }`}
                  onClick={() => setIsAdmin(false)}
                >
                  As User
                </button>
              </div> */}
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
                  isHidden ? (
                    <IoEyeOff
                      className="cursor-pointer"
                      onClick={() => {
                        setIsChecked(!isChecked);
                        setIsHidden(!isHidden);
                      }}
                    />
                  ) : (
                    <IoEye
                      className="cursor-pointer"
                      onClick={() => {
                        setIsChecked(!isChecked);
                        setIsHidden(!isHidden);
                      }}
                    />
                  )
                }
              />

              {isAdmin && (
                <FormInput
                  name="secret"
                  type={isChecked ? "text" : "password"}
                  value={register.secret}
                  onChange={handleOnChange}
                  placeholder="Admin Secret Key"
                  icon={<FaKey />}
                  icon2={
                    isHidden ? (
                      <IoEyeOff
                        className="cursor-pointer"
                        onClick={() => {
                          setIsChecked(!isChecked);
                          setIsHidden(!isHidden);
                        }}
                      />
                    ) : (
                      <IoEye
                        className="cursor-pointer"
                        onClick={() => {
                          setIsChecked(!isChecked);
                          setIsHidden(!isHidden);
                        }}
                      />
                    )
                  }
                />
              )}
              {/* buttons */}
              <div className="flex flex-col w-full gap-2">
                <SubmitMe text="Register" />
                <button
                  onClick={handleGoogleLogin}
                  className="btn btn-outline w-full text-white"
                >
                  Sign in with Google
                </button>
                {/* <button className="btn btn-outline w-full">Register</button>  */}
                <Link to={"/login"}>
                  <button type="submit" className="btn btn-neutral w-full">
                    Have Account
                  </button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
