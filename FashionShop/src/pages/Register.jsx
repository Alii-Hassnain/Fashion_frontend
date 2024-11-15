import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils/tostify";

const Register = () => {
  const [register, setRegister] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [isChecked, setIsChecked] = useState(false);

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
          <label
            className="input input-bordered flex items-center gap-2"
            htmlFor="username"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              name="username"
              type="text"
              id="username"
              onChange={handleOnChange}
              value={register.username}
              className="grow"
              placeholder="Username"
            />
          </label>
          <label
            className="input input-bordered flex items-center gap-2"
            htmlFor="email"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              name="email"
              type="email"
              id="email"
              onChange={handleOnChange}
              value={register.email}
              className="grow"
              placeholder="Email"
            />
          </label>

          <label
            className="input input-bordered flex items-center gap-2"
            htmlFor="password"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type={isChecked ? "text" : "password"}
              name="password"
              id="password"
              onChange={handleOnChange}
              value={register.password}
              className="grow"
              placeholder="password"
            />
            <svg
              onClick={() => setIsChecked(!isChecked)}
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeWidth="0.1"
                d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
              />
              <path
                stroke="currentColor"
                strokeWidth="0.1"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </label>
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
