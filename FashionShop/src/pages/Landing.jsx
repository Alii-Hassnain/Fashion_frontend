import React from "react";
import { CommonHeading, Hero, ProductsContainer } from "../components";
import { Features } from "../components";
import { Footer } from "../components";
import { useState } from "react";

  
const tabs = [
  "New Products",
  "Best Sellers",
  "Featured Products",
  "Big Discount",
];

const Landing = () => {
  const [activeTab, setActiveTab] = useState("New Products");
  return (
    <div>
      <Hero />
      <div className="align-elements">
        <Features />
        <div className="flex flex-row justify-center items-center gap-3 mt-10 text-gray-700">
        {tabs.map((tab) => (
          <p
            key={tab}
            className={`cursor-pointer px-4 py-2 ${
              activeTab === tab ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-700"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </p>
        ))}
        </div>
        <CommonHeading title={activeTab} />
        <ProductsContainer />
      </div>

      <div className="mt-40">
        <Footer />
      </div>
    </div>
  );
};

export default Landing;
