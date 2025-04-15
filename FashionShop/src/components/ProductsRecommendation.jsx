import React, { useState, useEffect } from "react";
import { useLoaderData, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { handleError } from "../utils/tostify";

const ProductsRecommendation = () => {
  const { recommendedProducts } = useLoaderData();
  const navigate = useNavigate();

  // Check if data is still loading (optional if you want to handle it from loader)
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!recommendedProducts) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [recommendedProducts]);

  return (
    <div>
      {loading ? (
        <p>Loading products...</p>
      ) : recommendedProducts?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {recommendedProducts.map((product) => {
            const { _id, product_image, price, title } = product;
            return (
              <div
                key={_id}
                className="bg-white shadow-md rounded-md p-4 cursor-pointer"
              >
                <Link
                  to={`/singleproduct/${_id}`}
                  className="block"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  <img
                    src={product_image}
                    alt={title}
                    className="w-full h-56 object-contain"
                  />
                  <h2 className="text-sm font-semibold text-gray-800 mt-2">
                    {title}
                  </h2>
                  <p className="text-gray-800 mt-2 text-sm">PKR {price}</p>
                </Link>

                <button
                  className="btn btn-secondary w-full mt-4"
                  onClick={() => {
                    // Handle error and navigation logic here
                    handleError("First Select Size and Quantity");
                    setTimeout(() => {
                      navigate(`/singleproduct/${_id}`);
                    }, 1000);
                  }}
                >
                  🛒 Add to cart
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

export default ProductsRecommendation;
