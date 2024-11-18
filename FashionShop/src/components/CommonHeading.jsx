import React from "react";

const CommonHeading = ({ title }) => {
  return (
    <div className="m-8 my-8">
      <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      <div className="w-full h-0.5 bg-gray-500 mx-auto mt-2"></div>
    </div>
  );
};

export default CommonHeading;
