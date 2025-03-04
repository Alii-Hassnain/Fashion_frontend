import { useState, useEffect } from "react";
import { CommonHeading } from "../components";
import { axiosFetchProducts } from "../utils/axiosFetch";
import { axiosAdminUrl } from "../utils/axiosFetch";
import { useLoaderData } from "react-router-dom";
import { ProductsContainer } from "../components";

import {SearchProducts} from "../components"
import hero1 from "../assets/hero1.webp";

export const loader = async () => {
  // {request}

  // const url = new URL(request.url);
  // const searchParams = url.searchParams.toString();
  // console.log(searchParams);
  
  try {
    const res = await axiosFetchProducts.get(
      // `/products?${searchParams}`
      '/products'
    );
    console.log(res.data);
    const products = res.data.products;

    // console.log(res.data.data);
    // const products = res.data.data;
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
        <SearchProducts/>
        <CommonHeading title="Products" />
        <ProductsContainer />
      </div>
    </div>
  );
};

export default Products;
