import { useState } from "react";

const CategoryFilter = ({ onFilterChange }) => {
  const categories = ["All","Shirts", "Pants", "Shoes", "Accessories"];
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryChange = (category) => {
    let updatedCategories = [...selectedCategories];

    if (updatedCategories.includes(category)) {
      updatedCategories = updatedCategories.filter((cat) => cat !== category);
    } else {
      updatedCategories.push(category);
    }

    setSelectedCategories(updatedCategories);
    onFilterChange(updatedCategories); // Pass selected categories to parent
  };

  return (
    <fieldset className="fieldset p-4 bg-base-100 border border-base-300 rounded-box ">
      <legend className="fieldset-legend text-lg font-semibold">Category</legend>

      {categories.map((category) => (
        <label key={category} className="fieldset-label flex items-center space-x-2 cursor-pointer mt-2">
          <input
            type="checkbox"
            value={category}
            checked={selectedCategories.includes(category)}
            onChange={() => handleCategoryChange(category)}
            className="checkbox checkbox-primary"
          />
          <span>{category}</span>
        </label>
      ))}
    </fieldset>
  );
};

export default CategoryFilter;
