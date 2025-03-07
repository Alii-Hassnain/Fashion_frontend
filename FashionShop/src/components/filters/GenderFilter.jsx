import { useState } from "react";

const GenderFilter = ({ onFilterChange }) => {
  const [selectedGender, setSelectedGender] = useState("");

  const handleGenderChange = (gender) => {
    setSelectedGender(gender);
    onFilterChange(gender); // Pass selected value to parent component
  };
  return (
    <div className="p-4 bg-base-100 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold mb-2">Gender</h3>
      <div className="flex flex-col space-y-2">
        {["Men", "Women", "Kids"].map((gender) => (
          <label key={gender} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              name="gender"
              value={gender}
              checked={selectedGender === gender}
              onChange={() => handleGenderChange(gender)}
              className="checkbox-primary "
            />
            <span>{gender}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default GenderFilter;
