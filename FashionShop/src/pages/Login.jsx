import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  const handleOnSubmit = async(e) => { 
    e.preventDefault();
    const {email,password}=loginInfo;
    console.log("email:",email,"password : ",password);
    try {
      const response=await fetch("http://localhost:8080/user/login",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify({email,password})
      })
      const result=await response.json();
      console.log("Data recieve from backend : ",result)
      const {success,error,message,data,token}=result;
      console.log("mesage from backend",message)
      console.log("token from backend",token)

      if(success){
         localStorage.setItem("token",token);
         localStorage.setItem("user",JSON.stringify(data.username));
        // navigate("/products")
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleOnChange = (e) => { 
    const {name,value}=e.target;
    const newInfo={...loginInfo,[name]:value}
    setLoginInfo(newInfo);
    console.log(loginInfo);
  } 
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-3 ">
      <form onSubmit={handleOnSubmit}>
        <h1 className="font-bold text-center text-2xl mb-4">Login</h1>
        <label className="input input-bordered flex items-center gap-2" htmlFor="email">
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
          type="text" 
          name="email"
          id="email"
          value={loginInfo.email}
          onChange={handleOnChange}
          className="grow" 
          placeholder="Email & Username" />
        </label>
        <label className="input input-bordered flex items-center gap-2" htmlFor="password">
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
          value={loginInfo.password}
          className="grow" 
          placeholder="password" />
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
        <div className="flex flex-row gap-6">
          <button className="my-2 btn btn-outline">Login</button>
          <p className="my-2 text-primary link-hover cursor-pointer">
            Forgot password
          </p>
        </div>
        <div className="flex flex-row gap-2">
          <p>Does't have an account</p>
          <Link to={"/register"}>
            <p className="text-primary link-hover cursor-pointer">Register</p>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
