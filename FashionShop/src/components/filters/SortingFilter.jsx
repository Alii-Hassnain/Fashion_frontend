import React, { useState } from "react";

const SortingFilter = ({ onSortChange }) => {
  const [sortOption, setSortOption] = useState("");

  const handleSortChange = (event) => {
    const selectedSort = event.target.value;
    setSortOption(selectedSort);
    onSortChange(selectedSort);
    // console.log('sort option is :',sortOption)
    // console.log("selected sort is :", selectedSort);
  };

  return (
    <fieldset className="fieldset p-4 bg-base-100 border border-base-300 rounded-box ">
      <legend className="fieldset-legend text-lg font-semibold">Sort By</legend>

      <select
        value={sortOption}
        onChange={handleSortChange}
        className="select select-bordered w-full"
        name="sort"
        id="sort"
        defaultValue=""
      >
        <option value="">Select</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="newest">Newest</option>
        <option value="popularity">Most Popular</option>
      </select>
    </fieldset>
  );
};

export default SortingFilter;
