import { useState } from 'react';
import { FormInput } from "../components";
import { handleError, handleSuccess } from './../utils/tostify';
import { useNavigate ,useParams} from 'react-router-dom';
const   ForgotPassword=() => {
const [Email , setEmail]= useState("")
const navigate = useNavigate();

    const handleSubmit=async(e)=>{
        e.preventDefault();
        console.log("email from frontend",Email)
        try{
           const response= await  fetch("http://localhost:8080/user/forgot-password",{
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                  },
                body:JSON.stringify({email:Email})
        });
        const result = await response.json();
        console.log("result from backend",result.message);
        if(result.success){
            handleSuccess(result.message)
        }
        else{
            handleError(result.message)
        }
        setTimeout(()=>{
            navigate("/reset-password/:token")
        },2000 )
        
    }catch(error){
        console.log("error on frontend in forgot password",error)
        handleError(error.message)

}
    }
    const handleOnChange=(e)=>{
        setEmail(e.target.value)
        console.log("email :",Email)
    }
    return ( 
        <div className='flex flex-col justify-center items-center h-screen gap-3'>
            <h1 className='font-bold text-center text-2xl mb-4'>Enter Your Registered Email</h1>
            <FormInput 
            type="email"
            name="email"
            defaultvalue={Email}
            onChange={handleOnChange}
            placeholder="Enter your email"
            />
            {/* <Link to="/newPassword"> */}
            <button className='my-2 btn btn-outline' onClick={handleSubmit}>
                Submit
            </button>
            {/* </Link> */}
        </div>
     );
}
export default ForgotPassword;
