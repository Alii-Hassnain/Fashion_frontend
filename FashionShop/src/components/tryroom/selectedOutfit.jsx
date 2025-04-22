import React from "react";

const SelectedOutfit = ({
  selectImageScr,
  handleClick,
  startProcess,
  statusData,
}) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-xl font-bold">Selected Shirt</h2>
      <img
        src={selectImageScr}
        alt="Shirt"
        className="w-64 h-64 object-contain border"
      />
    </div>
  );
};

export default SelectedOutfit;
