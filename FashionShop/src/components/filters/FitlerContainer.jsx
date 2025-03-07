import GenderFilter from "./GenderFilter";
import CategoryFilter from "./CategoryFilter";
import ColorFilter  from "./ColorFilter";
import PriceRangeFilter  from "./PrinceRanger";
import SortingFilter  from "./SortingFilter";

const FiltersContainer = ({ onGenderChange, onCategoryChange , onColorChange }) => {
  return (
    <div className="w-64 p-4 bg-base-100 shadow-lg rounded-xl">
      <h2 className="text-xl font-bold mb-4">Filters</h2>

      <ColorFilter onColorChange={onColorChange}/>
      {/* Gender Filter */}
      <GenderFilter onFilterChange={onGenderChange} />
      {/* Category Filter */}
      <CategoryFilter onFilterChange={onCategoryChange} />
      {/* Color Filter */}

      <SortingFilter />


    </div>
  );
};

export default FiltersContainer;
