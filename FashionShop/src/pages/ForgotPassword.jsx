import { useState } from "react";
import { FormInput } from "../components";
import { handleError, handleSuccess } from "./../utils/tostify";
import { useNavigate, useParams } from "react-router-dom";
import background from "../assets/hero1.webp";
import { Link } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
const ForgotPassword = () => {
  console.log("this is frogot password commponent ");
  const [Email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("email from frontend", Email);
    try {
      const response = await fetch(
        "https://fashionbackendfork.up.railway.app/user/forgot-password",
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
        // navigate("/reset-password/:token");
        navigate("/login");
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
        className="absolute top-0 left-0 w-full h-full z-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${background})`,
        }}
      ></div>
      <div className="relative flex justify-center z-10 items-center h-screen gap-3 ">
        <div className="relative shadow-md shadow-neutral-100 p-12 rounded-xl backdrop-blur-sm">
          <div className="absolute top-5 right-5 text-2xl text-white hover:bg-red-600 cursor-pointer">
            <Link to={"/login"}>
              <RxCross2 />
            </Link>
          </div>
          <div className="flex flex-col justify-center items-center gap-3">
            <h1 className="font-bold text-center text-white text-2xl mb-4">
              Enter your Registered Email
            </h1>
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
            {/* </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
