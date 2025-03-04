import React from 'react'
import { Link } from "react-router-dom";

export const SuccessPayment = () => {
  return (
    <div>
       <div className="flex flex-col gap-5 items-center">
          <div className="flex flex-col h-fit p-10 w-80 gap-4 border rounded-lg bg-slate-200 mt-4 border-l">
            <h1 className="text-lg text-center text-slate-800 ">Payment Success</h1>
            <h3 className="text-sm text-center text-slate-700">Thank you for shopping with us </h3>
           
              <Link to = "/">
            <button className="btn btn-success w-full" >Go To Home  
            </button>
              </Link>
          </div>
        </div>
    </div>
  )
}
