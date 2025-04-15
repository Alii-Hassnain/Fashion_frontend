import GenderFilter from "./GenderFilter";
import CategoryFilter from "./CategoryFilter";
import ColorFilter from "./ColorFilter";
import PriceRangeFilter from "./PrinceRanger";
import SortingFilter from "./SortingFilter";
import React, { useEffect } from "react";

const FiltersContainer = ({
  onGenderChange,
  onCategoryChange,
  onColorChange,
  onPriceChange,
  onSortChange,
  applyFilters,
  filters,
  removeFilters,
  isFilterApplied,
}) => {
  useEffect(() => {
    console.log("filter in filter component : ", filters);
  }, [filters]);
  return (
    <div className="w-64 p-4 bg-base-100 shadow-lg rounded-xl">
      <h2 className="text-xl font-bold mb-4">Filters</h2>

      {/* <ColorFilter onColorChange={onColorChange} /> */}
      <GenderFilter onFilterChange={onGenderChange} />
      <CategoryFilter onFilterChange={onCategoryChange} />
      <PriceRangeFilter onPriceChange={onPriceChange} />
      <SortingFilter onSortChange={onSortChange} />

      <div className="text-center my-2">
        <button
          onClick={isFilterApplied ? removeFilters : applyFilters}
          className={`text-white px-4 py-2 rounded-md transition-transform duration-300 transform scale-100 hover:scale-95 ${
            isFilterApplied
              ? "bg-red-500 hover:bg-red-700"
              : "bg-blue-500 hover:bg-blue-700"
          }`}
        >
          {isFilterApplied ? "Remove Filters" : "Apply Filters"}
        </button>
      </div>
    </div>
  );
};

export default FiltersContainer;
