import React from "react";
import { axiosFetchProducts } from "../utils/axiosFetch";
import { useLoaderData } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";
import { handleSuccess } from "../utils/tostify";

export const loader = async ({ params }) => {
  const id = params.id;
  console.log(id);
  try {
    const res = await axiosFetchProducts.get(`/product/${id}`);
    const singleProduct = res.data.data;
    return { singleProduct };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Response("product not found", { status: 404 });
  }
};

const SingleProduct = () => {
  const { singleProduct } = useLoaderData();
  const dispatch = useDispatch();

  console.log("this is the single product here", singleProduct);
  const { title, description, price, product_image } = singleProduct;
  console.log(title);
  return (
    <div className="align-elements grid grid-cols-1 md:grid-cols-2 h-screen items-center px-6 md:px-16 ">
      {/* Product Image */}
      <div className="flex justify-center">
        <img
          src={product_image}
          alt={title}
          className="w-80 max-w-xs md:max-w-md object-contain rounded-lg "
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col gap-4 items-start">
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        <p className="text-gray-600">{description}</p>
        <p className="text-lg font-semibold text-gray-700">
          Price: <span className="text-blue-600">PKR {price}</span>
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
          <button
            className="btn btn-primary w-full md:w-auto"
            onClick={()=>dispatch(addToCart(singleProduct))}
          >
            Add to Cart
          </button>
          <button className="btn btn-secondary w-full md:w-auto">
            Try Virtually
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
