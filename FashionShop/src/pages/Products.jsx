import { useState, useEffect } from "react";
import { CommonHeading } from "../components";
import { axiosFetchProducts } from "../utils/axiosFetch";
import { useLoaderData } from "react-router-dom";
import { ProductsContainer } from "../components";
import hero1 from "../assets/hero1.webp";

export const loader = async () => {
  try {
    const res = await axiosFetchProducts.get("/products");
    console.log(res.data);
    const products = res.data;
    return { products };
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

const Products = () => {
  const { products } = useLoaderData();

  // just for the reference...........................................
  // const [products, setProducts] = useState([]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await axiosFetch.get("/products");
  //       console.log(res.data);
  //       setProducts(res.data);
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  return (
    <div>
      <div className="w-full h-full bg-blue-50">
        <img className="object-cover object-right-bottom w-full h-60" src={hero1} alt="hero1" />
      </div>
      <div className="align-elements">
        <CommonHeading title="Products" />
        <ProductsContainer />
      </div>
    </div>
  );
};

export default Products;
