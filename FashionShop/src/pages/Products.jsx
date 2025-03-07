import { useState, useEffect } from "react";
import { CommonHeading } from "../components";
import { axiosFetchProducts } from "../utils/axiosFetch";
import { axiosAdminUrl } from "../utils/axiosFetch";
import { useLoaderData } from "react-router-dom";
import { ProductsContainer } from "../components";
import { FilterContainer, PriceRangeFilter } from "../components/filters"
import { SearchProducts } from "../components";


import hero1 from "../assets/hero1.webp";
import { GenderFilter } from "../components/filters";

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const searchParams = url.searchParams.toString();
  console.log(searchParams);

  try {
    const res = await axiosFetchProducts.get(`/products?${searchParams}`);
    console.log(res.data.data);
    const products = res.data.data;
    console.log(products);
    return { products };
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

const Products = () => {
  return (
    <div>
      <div className="w-full h-full bg-blue-50">
        <img
          className="object-cover object-right-bottom w-full h-60"
          src={hero1}
          alt="hero1"
        />
      </div>
      <div className="align-elements mt-3">
        {/* <div className="flex flex-row">
        <PriceRangeFilter/>

        </div> */}
        <SearchProducts />
        <CommonHeading title="Products" />

        <div className="flex flex-row">
          {/* <div className="w-64 p-4 bg-base-100 shadow-lg rounded-xl">
            <h2 className="text-xl font-bold mb-4">Filters</h2>
            <GenderFilter/>
          </div> */}

          <FilterContainer />
          <ProductsContainer />
        </div>
      </div>
    </div>
  );
};

export default Products;
