import React from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SearchProducts = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");  
const applyFilter = ()=>{
    const params = new URLSearchParams();
    if (search.trim()) params.append("search", search);
    // if (category) params.append("category", category);
    // if (minPrice) params.append("minPrice", minPrice);
    // if (maxPrice) params.append("maxPrice", maxPrice);
    navigate(`/products?${params.toString()}`);
    
};
const clearSearch = () => {
  setSearch(""); // Clear search field
  applyFilter(); // Apply the filter with an empty query
};
  return (
    <div className="flex justify-center items-center gap-2">
      <div className="relative w-full max-w-md ">
        <input
          className="input border-0 border-b-2 p-2 pl-10 w-full rounded-md focus:outline-none"
          type="text"
          placeholder="Search products..."
          // value={searchQuery}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        {search && (
          <FaTimes
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
          onClick={clearSearch} // Clear search when clicked
        />
        )}
      </div>
      <button className="btn btn-outline" onClick={applyFilter}>Search</button>
    </div>
  );
};

export default SearchProducts;
