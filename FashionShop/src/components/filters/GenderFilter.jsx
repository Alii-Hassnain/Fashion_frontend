import React, { useState } from "react";

const GenderFilter = ({ onFilterChange }) => {
  const [selectedGender, setSelectedGender] = useState("");

  const handleGenderChange = (gender) => {
    setSelectedGender(gender);
    onFilterChange(gender);
    console.log("gender:", gender);
    // console.log("selected gender:", selectedGender);
  };
  // useEffect(() => {
  //   console.log("Updated selectedGender:", selectedGender);
  // }, [selectedGender]);
  return (
    <fieldset className="fieldset p-4 bg-base-100 border border-base-300 rounded-box ">
      <legend className="fieldset-legend text-lg font-semibold">Gender</legend>

      {["All", "Men", "Women", "Kids"].map((gender) => (
        <label
          key={gender}
          className="fieldset-label flex items-center space-x-2 cursor-pointer mt-2"
        >
          <input
            type="radio"
            name="gender"
            value={gender}
            checked={selectedGender === gender}
            onChange={() => handleGenderChange(gender)}
            className="radio radio-primary"
          />
          <span>{gender}</span>
        </label>
      ))}
    </fieldset>
  );
};

export default GenderFilter;
