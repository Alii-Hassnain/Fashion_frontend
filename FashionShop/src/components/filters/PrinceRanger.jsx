import { useState } from "react";

const PriceFilter = ({ onPriceChange }) => {
  const [price, setPrice] = useState(0);

  const handlePriceChange = (value) => {
    if (value === "") {
      setPrice("");
      onPriceChange("");
      return;
    }
    let newPrice = parseInt(value, 10);
    if (!isNaN(newPrice)) {
      newPrice = Math.max(0, Math.min(newPrice, 20000));
      setPrice(newPrice);
      onPriceChange(newPrice);
    }
    // console.log("new price : ",newPrice)
  };

  return (
    // <fieldset className="p-4 rounded-lg w-6 shadow-md border ">
    <fieldset className="fieldset p-4 bg-base-100 border border-base-300 rounded-box ">
      <legend className="text-lg font-bold">Price Range</legend>

      <input
        type="range"
        min={0}
        max={20000}
        step={500}
        value={price}
        onChange={(e) => handlePriceChange(e.target.value)}
        className="w-full mt-2 cursor-pointer accent-blue-500"
      />

      <div className="flex items-center mt-2 gap-2">
        <label className="text-sm font-semibold ">Enter Price:</label>
        <input
          type="number"
          min={0}
          max={20000}
          value={price}
          onChange={(e) => handlePriceChange(e.target.value)}
          className="w-24 p-1 border rounded text-center text-white"
        />
      </div>

      <div className="text-center mt-2 font-semibold text-blue-600">
        Selected Price: PKR {price}
      </div>
    </fieldset>
  );
};

export default PriceFilter;
