import React from "react";
import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { addToCart, addToCartAsync } from "../features/cartSlice";
import {handleSuccess} from "../utils/tostify"
import { addToCartAsync } from "../features/cartSlice";
import Cookies from "js-cookie";
const ProductsGridView = () => {
  const { products } = useLoaderData();
  const dispatch = useDispatch();
 
  

  //const userId = Cookies.get("id");
   //console.log("userId :",userId)
  // const userId = "67a44f834ed50d8f0ad68ae9";
  return (
    <div>
      {products?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
          {products.map((product) => {
            const { _id, product_image, price, title, description } = product;
            
            // console.log(product_image);
            return (
              <div
                key={_id}
                className="bg-white shadow-md rounded-md p-4 cursor-pointer"
              >
                <Link to={`/singleproduct/${_id}`} key={_id} className="block">
                  <img
                    src={product_image}
                    alt={title}
                    className="w-full h-56 object-contain"
                  />
                  <h2 className="text-lg font-semibold text-gray-800 mt-2">
                    {title}
                  </h2>
                  {/* <p className="text-gray-600 mt-2">{description}</p> */}
                  <p className="text-gray-800 mt-2">PKR {price}</p>
                </Link>
                <button
                  className="btn btn-secondary w-full mt-4"
                  onClick={() => {
                    dispatch(addToCartAsync({productId:_id,quantity:1}))
                  }}
                  
                >
                  Add to cart
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
};

export default ProductsGridView;
