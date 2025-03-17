import { useState } from "react";

const PriceFilter = ({ onFilterChange }) => {
  const [price, setPrice] = useState(40); // Default value

  const handlePriceChange = (event) => {
    const newPrice = event.target.value;
    setPrice(newPrice);
    onFilterChange(newPrice);
  };

  return (
    <fieldset className="fieldset p-4  rounded-box w-64">
      <legend className="fieldset-legend">Price Range</legend>

      <input
        type="range"
        min={0}
        max={20000}
        value={price}
        onChange={handlePriceChange}
        className="range range-info"
      />

      <div className="text-center mt-2 ">Up to: PKR {price}</div>
    </fieldset>
  );
};

export default PriceFilter;
