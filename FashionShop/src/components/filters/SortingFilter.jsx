import { useState } from "react";

const SortingFilter = ({ onSortChange }) => {
  const [sortOption, setSortOption] = useState("");

  const handleSortChange = (event) => {
    const selectedSort = event.target.value;
    setSortOption(selectedSort);
    onSortChange(selectedSort); // Pass selected sort option to parent
  };

  return (
    <fieldset className="fieldset p-4 bg-base-100 border border-base-300 rounded-box ">
      <legend className="fieldset-legend text-lg font-semibold">Sort By</legend>

      <select
        value={sortOption}
        onChange={handleSortChange}
        className="select select-bordered w-full"
      >
        <option value="">Select</option>
        <option value="price_low_high">Price: Low to High</option>
        <option value="price_high_low">Price: High to Low</option>
        <option value="newest">Newest</option>
        <option value="popularity">Most Popular</option>
      </select>
    </fieldset>
  );
};

export default SortingFilter;
