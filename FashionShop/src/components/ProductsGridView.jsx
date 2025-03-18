import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart, addToCartAsync } from "../features/cartSlice";
import { handleError, handleSuccess } from "../utils/tostify";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const ProductsGridView = ({
  product,
  loading,
  resetFilters,
  success,
  count,
}) => {
  const { products } = useLoaderData();
  const [userId, setUserId] = useState("");
  const [displayProducts, setDisplayProducts] = useState(products);
  const [filterApplied, setFilterApplied] = useState(false);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);

  useEffect(() => {
    if (userData?._id) {
      setUserId(userData._id);
    }
  }, [userData]);

  useEffect(() => {
    if (success && count > 0) {
      setDisplayProducts(product);
      setFilterApplied(true);
    } else if (success && count === 0) {
      setDisplayProducts([]);
      setFilterApplied(true);
    } else {
      // resetFilters();
      setDisplayProducts(products);
      setFilterApplied(false);
    }
  }, [product, success, count, products]);

  const checkUser = () => {
    if (!userId) {
      handleError("please Login first");
    }
  };

  const handleRemoveFilter = () => {
    resetFilters();
    setDisplayProducts(products);
    setFilterApplied(false);
  };
  // const userId = "67a44f834ed50d8f0ad68ae9";
  return (
    <div>
      {loading ? (
        <p>Loading products...</p>
      ) : displayProducts?.length > 0 ? (
        // {products?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
          {displayProducts.map((product) => {
            const { _id, product_image, price, title, description } = product;
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
                <div className="rating rating-md">
                  <input
                    type="radio"
                    name="rating-10"
                    className="rating-hidden"
                    aria-label="clear"
                  />
                  <input
                    type="radio"
                    name="rating-10"
                    className="mask mask-star-2"
                    aria-label="1 star"
                  />
                  <input
                    type="radio"
                    name="rating-10"
                    className="mask mask-star-2"
                    aria-label="2 star"
                    defaultChecked
                  />
                  <input
                    type="radio"
                    name="rating-10"
                    className="mask mask-star-2"
                    aria-label="3 star"
                  />
                  <input
                    type="radio"
                    name="rating-10"
                    className="mask mask-star-2"
                    aria-label="4 star"
                  />
                  <input
                    type="radio"
                    name="rating-10"
                    className="mask mask-star-2"
                    aria-label="5 star"
                  />
                </div>

                <button
                  className="btn btn-secondary w-full mt-4"
                  onClick={() => {
                    checkUser();
                    dispatch(addToCartAsync({ userId, productId: _id }));
                  }}
                >
                  🛒Add to cart
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
