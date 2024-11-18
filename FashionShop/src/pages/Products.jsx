import { useState, useEffect } from "react";
import { CommonHeading } from "../components";
import { axiosFetch } from "../utils/axiosFetch";
import { useLoaderData } from "react-router-dom";
import { ProductsContainer} from "../components";

export const loader = async ()=>{
  try {
    const res = await axiosFetch.get("/products");
    console.log(res.data);
    const products = res.data;
    return {products}
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

const Products = () => {
  const {products} = useLoaderData();

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
    <>
      <CommonHeading title="Products" />
      <ProductsContainer />
      
    </>
  );
};

export default Products;
