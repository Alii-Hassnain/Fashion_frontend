
// import GenderFilter from "./GenderFilter";
// import CategoryFilter from "./CategoryFilter";
// import ColorFilter from "./ColorFilter";
// import PriceRangeFilter from "./PriceRangeFilter";
// import SortingFilter from "./SortingFilter";
import GenderFilter from "./GenderFilter";
import CategoryFilter from "./CategoryFilter";
import ColorFilter  from "./ColorFilter";
import PriceRangeFilter  from "./PrinceRanger";
import SortingFilter  from "./SortingFilter";

const FiltersContainer = ({ onGenderChange, onCategoryChange, onColorChange, onPriceChange, onSortChange ,applyFilters}) => {
  return (
    <div className="w-64 p-4 bg-base-100 shadow-lg rounded-xl">
      <h2 className="text-xl font-bold mb-4">Filters</h2>

      {/* <ColorFilter onColorChange={onColorChange} /> */}
      <GenderFilter onFilterChange={onGenderChange} />
      <CategoryFilter onFilterChange={onCategoryChange} />
      {/* <PriceRangeFilter onPriceChange={onPriceChange} /> */}
      {/* <SortingFilter onSortChange={onSortChange} /> */}
      <div className="text-center my-2">
     <button 
  onClick={applyFilters}
  className="bg-blue-500 text-white px-4 py-2 rounded-md transition-transform duration-300 transform scale-100 hover:scale-95 hover:bg-blue-800"
>
  Apply Filters
</button>


              </div>  
    </div>
  );
};

export default FiltersContainer;






// import GenderFilter from "./GenderFilter";
// import CategoryFilter from "./CategoryFilter";
// import ColorFilter  from "./ColorFilter";
// import PriceRangeFilter  from "./PrinceRanger";
// import SortingFilter  from "./SortingFilter";

// const FiltersContainer = ({ onGenderChange, onCategoryChange , onColorChange }) => {
//   return (
//     <div className="w-64 p-4 bg-base-100 shadow-lg rounded-xl">
//       <h2 className="text-xl font-bold mb-4">Filters</h2>

//       <ColorFilter onColorChange={onColorChange}/>
//       {/* Gender Filter */}
//       <GenderFilter onFilterChange={onGenderChange} />
//       {/* Category Filter */}
//       <CategoryFilter onFilter Change={onCategoryChange} />
//       {/* Color Filter */}

//       <SortingFilter onSortChange={onCategoryChange} />


//     </div>
//   );
// };

// export default FiltersContainer;
