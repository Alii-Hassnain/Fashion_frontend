import React from "react";
// import { FeaturesData } from "./Links";
import { Link, Navigate } from "react-router-dom";
<<<<<<< HEAD
import support24Hours from "../assets/featureImg/support24hours.png";
import freeShipping from "../assets/featureImg/freeShipping.png";
import tryVirtually from "../assets/featureImg/tryVirtually.png";
import easyReturn from "../assets/featureImg/easyReturn.png";
=======
// import support24Hours from "/assets/featureImg/support24Hours.png";
// import freeShipping from "/assets/featureImg/freeShipping.png";
// import tryVirtually from "public/assets/featureImg/tryVirtually.png";
// import easyReturn from "public/assets/featureImg/easyReturn.png";

>>>>>>> endingg_tryroomUiImprove

const Features = () => {
  return (
    <div className="align-elements grid grid-cols-4 gap-3 mt-4 ">
      {/* {FeaturesData.map((features) => {
        const { id, title, desc, img } = features;
        return (
          <div
            key={id}
            className="bg-slate-200 p-4 justify-center
                     hover:bg-gray-400 text-black w-full h-36 rounded-md 
                     flex flex-col cursor-pointer
                     items-center
                     "
             >
            <div className="h-10 w-10 mb-3">
              <img src={img} alt={img} />
            </div>
            <h2>{title}</h2>
          </div>
        );
      })} */}
      <Link to="/tryroom">
        <div
          className="bg-slate-200 p-4 justify-center
                     hover:bg-gray-400 text-black w-full h-36 rounded-md 
                     flex flex-col cursor-pointer
                     items-center
                     "
        >
          <div className="h-10 w-10 mb-3">
            <img src="/assets/featureImg/tryVirtually.png" alt="try Virtually" />
          </div>
          <h2>Try Room</h2>
        </div>
      </Link>

      <div
        className="bg-slate-200 p-4 justify-center
                     hover:bg-gray-400 text-black w-full h-36 rounded-md 
                     flex flex-col cursor-pointer
                     items-center
                     "
      >
        <div className="h-10 w-10 mb-3">
          <img src="/assets/featureImg/support.png" alt="support 24Hours" />
        </div>
        <h2>Chatbot Support</h2>
      </div>
      <div
        className="bg-slate-200 p-4 justify-center
                     hover:bg-gray-400 text-black w-full h-36 rounded-md 
                     flex flex-col cursor-pointer
                     items-center
                     "
      >
        <div className="h-10 w-10 mb-3">
          <img src="/assets/featureImg/freeShipping.png" alt="free Shipping" />
        </div>
        <h2>Free Shipping</h2>
      </div>
      <div
        className="bg-slate-200 p-4 justify-center
                     hover:bg-gray-400 text-black w-full h-36 rounded-md 
                     flex flex-col cursor-pointer
                     items-center
                     "
      >
        <div className="h-10 w-10 mb-3">
          <img src="/assets/featureImg/easyReturn.png" alt="easy Return" />
        </div>
        <h2>Easy Return</h2>
      </div>
    </div>
  );
};

export default Features;
