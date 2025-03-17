import React, { useState } from "react";
import { axiosFetchProducts } from "../utils/axiosFetch";
import { useLoaderData } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";

export const loader = async ({ params }) => {
  const id = params.id;
  try {
    const res = await axiosFetchProducts.get(`/product/${id}`);
    const singleProduct = res.data.data;
    return { singleProduct };
  } catch (error) {
    console.error("Error fetching product:", error);
    throw new Response("Product not found", { status: 404 });
  }
};

const SingleProduct = () => {
  const { singleProduct } = useLoaderData();
  const dispatch = useDispatch();
  
  const { title, description, price, product_image } = singleProduct;

  // ✅ Dummy data for sizes and colors
  const sizes = ["S", "M", "L", "XL", "2XL"];
  const colors = ["#000000", "#FF5733", "#1E90FF", "#32CD32", "#800080"]; // Black, Orange, Blue, Green, Purple

  // State for selection
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [showSizeChart, setShowSizeChart] = useState(false);

  return (
    <div className="align-elements grid grid-cols-1 md:grid-cols-2 h-screen items-center px-6 md:px-16">
      {/* Product Image */}
      <div className="flex justify-center">
        <img
          src={product_image}
          alt={title}
          className="w-80 max-w-xs md:max-w-md object-contain rounded-lg"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col gap-4 items-start">
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        <p className="text-gray-600">{description}</p>
        <p className="text-lg font-semibold text-gray-700">
          Price: <span className="text-blue-600">PKR {price}</span>
        </p>

        {/* 🔹 Size Selection */}
        <div>
          <label className="font-medium">Select Size:</label>
          <div className="flex gap-2 mt-1">
            {sizes.map((size) => (
              <button
                key={size}
                className={`btn btn-outline ${selectedSize === size ? "btn-primary" : ""}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
          <button
            className="text-blue-500 text-sm underline mt-2"
            onClick={() => setShowSizeChart(true)}
          >
            View Size Chart
          </button>
        </div>

        {/* 🔹 Color Selection */}
        <div>
          <label className="font-medium">Select Color:</label>
          <div className="flex gap-2 mt-1">
            {colors.map((color) => (
              <button
                key={color}
                className={`w-8 h-8 rounded-full border-2 ${selectedColor === color ? "border-blue-600" : ""}`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
              ></button>
            ))}
          </div>
        </div>

        {/* 🔹 Action Buttons */}
        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
          <button
            className="btn btn-primary w-full md:w-auto"
            onClick={() => dispatch(addToCart({ ...singleProduct, selectedSize, selectedColor }))}
            disabled={!selectedSize || !selectedColor}
          >
            Add to Cart
          </button>
          <button className="btn btn-secondary w-full md:w-auto">Try Virtually</button>
        </div>
      </div>

      {/* 🔹 Size Chart Modal */}
      {showSizeChart && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-2">Size Chart</h2>
            <table className="w-full border">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2">Size</th>
                  <th className="p-2">Chest (in)</th>
                  <th className="p-2">Waist (in)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="p-2">S</td><td className="p-2">36</td><td className="p-2">30</td></tr>
                <tr><td className="p-2">M</td><td className="p-2">38</td><td className="p-2">32</td></tr>
                <tr><td className="p-2">L</td><td className="p-2">40</td><td className="p-2">34</td></tr>
                <tr><td className="p-2">XL</td><td className="p-2">42</td><td className="p-2">36</td></tr>
                <tr><td className="p-2">2XL</td><td className="p-2">44</td><td className="p-2">38</td></tr>
              </tbody>
            </table>
            <button className="btn btn-error mt-4 w-full" onClick={() => setShowSizeChart(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleProduct;
