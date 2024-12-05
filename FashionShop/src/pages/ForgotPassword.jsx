import { useState } from "react";
import { FormInput } from "../components";
import { handleError, handleSuccess } from "./../utils/tostify";
import { useNavigate, useParams } from "react-router-dom";
import background from "../assets/hero1.webp";
const ForgotPassword = () => {
  const [Email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("email from frontend", Email);
    try {
      const response = await fetch(
        "http://localhost:8080/user/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: Email }),
        }
      );
      const result = await response.json();
      console.log("result from backend", result.message);
      if (result.success) {
        handleSuccess(result.message);
      } else {
        handleError(result.message);
      }
      setTimeout(() => {
        navigate("/reset-password/:token");
      }, 2000);
    } catch (error) {
      console.log("error on frontend in forgot password", error);
      handleError(error.message);
    }
  };

  const handleOnChange = (e) => {
    setEmail(e.target.value);
    console.log("email :", Email);
  };

  return (
    <div className="relative h-screen">
      <div
        className="absolute top-0 left-0 w-full h-full z-0 bg-cover bg-center filter blur-[2px]"
        style={{
          backgroundImage: `url(${background})`,
        }}
      ></div>

      <div className="relative z-10 flex flex-col justify-center items-center h-screen">
        <div className="relative border border-1 p-12 rounded-xl">
          <form onSubmit={handleOnChange}>
            <div className="flex flex-col gap-2">

            <h1 className="text-white font-bold text-center text-2xl mb-4">
              Forgot Password ?
            </h1>
            <p className="text-start text-white">
              Enter your email to reset your password
            </p>
            <FormInput
              type="email"
              name="email"
              value={Email}
              onChange={handleOnChange}
              placeholder="Enter your email"
            />
            {/* <Link to="/newPassword"> */}
            <button
              className="my-2 btn btn-outline text-white w-full"
              onClick={handleSubmit}
            >
              Submit
            </button>
            </div>
          </form>

          {/* </Link> */}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
