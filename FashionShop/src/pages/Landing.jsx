import React from "react";
import { CommonHeading, Hero, ProductsContainer } from "../components";
import { Features } from "../components";
import { Footer } from "../components";

const Landing = () => {
  return (
    <div>
      <Hero />
      <div className="align-elements">
        <Features />
        <div className="flex flex-row justify-center items-center gap-3 mt-10 text-gray-700">
          <p className="cursor-pointer link-hover">New Products</p>
          <p>||</p>
          <p className="cursor-pointer link-hover">Best Sellers</p>
          <p>||</p>
          <p className="cursor-pointer link-hover">Featured Products</p>
          <p>||</p>
          <p className="cursor-pointer link-hover">Big Discount</p>
        </div>
        <CommonHeading title="New Products" />
        <ProductsContainer />
      </div>

      <div className="mt-40">
        <Footer />
      </div>
    </div>
  );
};

export default Landing;
