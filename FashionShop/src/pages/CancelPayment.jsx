import React from 'react'
import { Link } from "react-router-dom";

export const CancelPayment = () => {
  return (
    <div>
       <div className="flex flex-col gap-5 items-center">
          <div className="flex flex-col h-fit p-10 w-80 gap-4 border rounded-lg bg-slate-200 mt-4 border-l">
            <h1 className="text-lg text-center text-rose-400 ">Payment Cancelled</h1>
            <h3 className="text-sm text-center text-rose-400">Please try again </h3>
           
              <Link to = "/checkout">
            <button className="btn btn-error w- w-full" >Go To Checkout  
            </button>
              </Link>
          </div>
        </div>
    </div>
  )
}
