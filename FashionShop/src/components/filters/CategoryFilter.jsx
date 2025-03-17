import { useEffect, useState } from "react";

const CategoryFilter = ({ onFilterChange }) => {
  const categories = ["All","Shirt", "Pants", "Shoes", "Accessories"];
  // const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState("");

  const handleCategoryChange = (category) => {
    // let updatedCategories = [...selectedCategories];

    // if (updatedCategories.includes(category)) {
    //   updatedCategories = updatedCategories.filter((cat) => cat !== category);
    // } else {
    //   updatedCategories.push(category);
    // }

    // 
    setSelectedCategories(category)
    onFilterChange(category)
    console.log("catogery is : ",category)
    // setSelectedCategories(updatedCategories);
    // onFilterChange(updatedCategories); // Pass selected categories to parent
    // console.log("selected catogery : ",selectedCategories)
    // console.log("updated catogery is : ",updatedCategories)
  };
useEffect(()=>{
  console.log("selected catogery in use effect is : ",selectedCategories)

},[selectedCategories])
  return (
    <fieldset className="fieldset p-4 bg-base-100 border border-base-300 rounded-box ">
      <legend className="fieldset-legend text-lg font-semibold">Category</legend>

      {categories.map((category) => (
        <label key={category} className="fieldset-label flex items-center space-x-2 cursor-pointer mt-2">
          <input
            type="radio"
            value={category}
            // checked={selectedCategories.includes(category)}
            checked={selectedCategories===category}
            onChange={() => handleCategoryChange(category)}
            className="radio radio-primary"
          />
          <span>{category}</span>
        </label>
      ))}
    </fieldset>
  );
};

export default CategoryFilter;
