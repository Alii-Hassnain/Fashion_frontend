import React from "react";
import { Hero } from "../components";
import { Features } from "../components";

const Landing = () => {
  return (
    <div className="mb-40">
      <Hero />
      <Features />
      <div className="flex w-full align-elements mt-10 cursor-pointer">
        <div className="card bg-base-300 grid h-20 flex-grow place-items-center">
          NewArrival
        </div>
        <div className="divider divider-horizontal"></div>
        <div className="card bg-base-300 grid h-20 flex-grow place-items-center">
          Featured
        </div>
        <div className="divider divider-horizontal"></div>
        <div className="card bg-base-300 grid flex-grow place-items-center">
          Big Discount
        </div>
      </div>
    </div>
  );
};

export default Landing;
