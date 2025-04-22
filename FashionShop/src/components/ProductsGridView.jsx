import React, { useState, useEffect } from "react";
import { useNavigate, useLoaderData, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleError } from "../utils/tostify";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
 import { addToCart, addToCartAsync } from "../features/cartSlice";

 const shuffleArray = (array) => {
  let shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

 
const ProductsGridView = ({
  product,
  loading,
  resetFilters,
  success,
  count,
  activeTab
}) => {
  const { products } = useLoaderData();
  const [userId, setUserId] = useState("");
  const [displayProducts, setDisplayProducts] = useState(products);
  const [filterApplied, setFilterApplied] = useState(false);
  
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);


  const filterProductsByTab = (products, activeTab) => {
    let filtered = [...products];
    switch (activeTab) {
      case "New Products":
        return filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case "Best Sellers":
        return filtered.filter((product) => product.rating > 0);
      case "Big Discount":
        return filtered.filter((product) => product.price < 5000);
      case "Featured Products":
        return shuffleArray(filtered).slice(0, 12);
      default:
        return filtered;
    }
  };
  

  useEffect(() => {
    if (userData?._id) {
      setUserId(userData._id);
    }
  }, [userData]);

  useEffect(() => {
    if (products && products.length > 0) {
      setDisplayProducts(shuffleArray(products));
    }
  }, [products]);
  
 

  useEffect(() => {
    if (success && count > 0) {
      setDisplayProducts(product);
      setFilterApplied(true);
      return;
    }
  
    if (success && count === 0) {
      setDisplayProducts([]);
      setFilterApplied(true);
      return;
    }
  
    if (activeTab && products?.length > 0) {
      const filtered = filterProductsByTab(products, activeTab);
      setDisplayProducts(filtered);
      setFilterApplied(false);
    } else {
      setDisplayProducts(products);
      setFilterApplied(false);
    }
  }, [product, success, count, activeTab, products]);
  

    const checkUser = () => {
    if (!userId) {
      handleError("please Login first");
    }
  };

  const handleRemoveFilter = () => {
    resetFilters();
    setDisplayProducts(products);
    setFilterApplied(false);
    setCurrentPage(1); // Reset to the first page when filters are removed
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = displayProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(displayProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {loading ? (
        <p>Loading products...</p>
      ) : displayProducts?.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {currentProducts.map((product) => {
              const { _id, product_image, price, title , rating } = product;
              return (
                <div
                  key={_id}
                  className="bg-white shadow-md rounded-md p-4 cursor-pointer"
                >
                  <Link to={`/singleproduct/${_id}`} key={_id} className="block"
                  onClick={() => window.scrollTo(0, 0)}
                  >
                        {/* Discount Tag */}
                        {activeTab === "Big Discount" && (
                        <div className=" text-right bg-red-100 text-red-600 font-bold py-2 rounded mb-4 text-xs shadow w-fit px-2 ">
                          🔥 10% OFF
                        </div>
                    )} 
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
                 
                  {
                    rating?<p className="text-green-500 text-sm">
                    {"⭐".repeat(rating)}
                  </p>:<p className="text-red-500 text-sm">Not reviewed yet</p>

                  }

                  <button
                    className="btn btn-secondary w-full mt-4"
                    onClick={() => {
                      handleError("First Select Size and Quantity");
                      setTimeout(() => {
                        navigate(`/singleproduct/${_id}`);
                      }, 1000);
                    }}
                  >
                    🛒Add to cart
                  </button>
                </div>
              );
            })}
          </div>

          {/* Pagination Buttons */}
          <div className="flex justify-center m-14">
            <nav className="flex gap-4 items-center">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 border rounded ${
                  currentPage === 1
                    ? "bg-gray-300 cursor-not-allowed"
                    : "hover:bg-gray-200"
                }`}
              >
                <FaArrowLeft />
              </button>

              {[...Array(totalPages).keys()].map((num) => {
                if (
                  num + 1 === 1 ||
                  num + 1 === totalPages ||
                  (num + 1 >= currentPage - 1 && num + 1 <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={num}
                      onClick={() => paginate(num + 1)}
                      className={`px-3 py-1 border rounded ${
                        currentPage === num + 1
                          ? "bg-blue-500 text-white"
                          : "hover:bg-gray-400"
                      }`}
                    >
                      {num + 1}
                    </button>
                  );
                } else if (
                  num + 1 === currentPage - 2 ||
                  num + 1 === currentPage + 2
                ) {
                  return <span key={num}>...</span>;
                } else {
                  return null;
                }
              })}

              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 border rounded ${
                  currentPage === totalPages
                    ? "bg-gray-300 cursor-not-allowed"
                    : "hover:bg-gray-400"
                }`}
              >
                <FaArrowRight />
              </button>
            </nav>
          </div>
        </>
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
};

export default ProductsGridView;







