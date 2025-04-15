import React, { useState } from "react";

const ColorFilter = ({ onFilterChange }) => {
  const [selectedColors, setSelectedColors] = useState([]);

  const colors = [
    { name: "Red", hex: "#ff0000" },
    { name: "Blue", hex: "#0000ff" },
    { name: "Green", hex: "#008000" },
    { name: "Black", hex: "#000000" },
    { name: "White", hex: "#ffffff" },
    { name: "Yellow", hex: "#ffff00" },
  ];

  const handleColorChange = (event) => {
    const color = event.target.value;
    let updatedColors = [...selectedColors];

    if (updatedColors.includes(color)) {
      updatedColors = updatedColors.filter((c) => c !== color);
    } else {
      updatedColors.push(color);
    }

    setSelectedColors(updatedColors);
    onFilterChange(updatedColors);
  };

  return (
    <fieldset className="fieldset p-4 bg-base-100 border border-base-300 rounded-box ">
      <legend className="fieldset-legend text-lg font-semibold">Color</legend>

      <div className="flex flex-wrap gap-2">
        {colors.map(({ name, hex }) => (
          <label key={name} className="cursor-pointer">
            <input
              type="checkbox"
              value={name}
              checked={selectedColors.includes(name)}
              onChange={handleColorChange}
              className="hidden peer"
            />
            <div
              className={`w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center`}
              style={{ backgroundColor: hex }}
            >
              {selectedColors.includes(name) && (
                <span className="text-white text-xl font-bold">✓</span>
              )}
            </div>
          </label>
        ))}
      </div>
    </fieldset>
  );
};

export default ColorFilter;
