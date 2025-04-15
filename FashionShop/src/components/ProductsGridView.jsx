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
    } else if (success && count === 0) {
      setDisplayProducts([]);
      setFilterApplied(true);
    } else {
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







// import React, { useState } from "react";
// import {  useNavigate, useLoaderData } from "react-router-dom";
// import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { addToCart, addToCartAsync } from "../features/cartSlice";
// import { handleError, handleSuccess } from "../utils/tostify";
// import { useSelector } from "react-redux";
// import { useEffect } from "react";

// const ProductsGridView = ({
//   product,
//   loading,
//   resetFilters,
//   success,
//   count,
// }) => {
//   const { products } = useLoaderData();
//   const [userId, setUserId] = useState("");
//   const [displayProducts, setDisplayProducts] = useState(products);
//   const [filterApplied, setFilterApplied] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);//--- 
//   const productsPerPage = 8; // -- Number of products per page

//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const userData = useSelector((state) => state.user.userData);


//   useEffect(() => {
//     if (userData?._id) {
//       setUserId(userData._id);
//     }
//   }, [userData]);

//   useEffect(() => {
//     if (success && count > 0) {
//       setDisplayProducts(product);
//       setFilterApplied(true);
//     } else if (success && count === 0) {
//       setDisplayProducts([]);
//       setFilterApplied(true);
//     } else {
//       // resetFilters();
//       setDisplayProducts(products);
//       setFilterApplied(false);
//     }
//   }, [product, success, count, products]);

//   const checkUser = () => {
//     if (!userId) {
//       handleError("please Login first");
//     }
//   };

//   const handleRemoveFilter = () => {
//     resetFilters();
//     setDisplayProducts(products);
//     setFilterApplied(false);
//     setCurrentPage(1); // Reset to the first page when filters are removed
//   };
// //--
//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentProducts = displayProducts.slice(
//     indexOfFirstProduct,
//     indexOfLastProduct
//   );

//   const totalPages = Math.ceil(displayProducts.length / productsPerPage);

//   const handlePageChange = (pageNumber) => {

//     setCurrentPage(pageNumber);
//   };
//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage((prevPage) => prevPage + 1);
//     }
//   };
//   const handlePrevPage = () => {    
//     if (currentPage > 1) {
//       setCurrentPage((prevPage) => prevPage - 1);
//     }
//   };
//   const handleFirstPage = () => {
//     setCurrentPage(1);
//   };
//   const handleLastPage = () => {
//     setCurrentPage(totalPages);
//   };
//   const handlePageClick = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };
//   const handlePageNumbers = () => {
//     const pageNumbers = [];
//     for (let i = 1; i <= totalPages; i++) {
//       pageNumbers.push(
//         <button 
//           key={i}
//           className={`px-3 py-1 rounded-md ${
//             currentPage === i ? "bg-blue-500 text-white" : "bg-gray-200"
//           }`}
//           onClick={() => handlePageClick(i)}
//         >
//           {i}
//         </button>
//       );
//     }
//     return pageNumbers;
//   }

//   // const userId = "67a44f834ed50d8f0ad68ae9";
//   return (
//     <div>
//       {loading ? (
//         <p>Loading products...</p>
//       ) : displayProducts?.length > 0 ? (
//         // {products?.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
//           {displayProducts.map((product) => {
//             const { _id, product_image, price, title, description } = product;
//             return (
//               <div
//                 key={_id}
//                 className="bg-white shadow-md rounded-md p-4 cursor-pointer"
//               >
//                 <Link to={`/singleproduct/${_id}`} key={_id} className="block">
//                   <img
//                     src={product_image}
//                     alt={title}
//                     className="w-full h-56 object-contain"
//                   />
//                   <h2 className="text-sm font-semibold text-gray-800 mt-2">
//                     {title}
//                   </h2>
//                   {/* <p className="text-gray-600 mt-2">{description}</p> */}
//                   <p className="text-gray-800 mt-2 text-sm">PKR {price}</p>

//                 </Link>
//                 <div className="rating rating-md">
//                   <input
//                     type="radio"
//                     name="rating-10"
//                     className="rating-hidden"
//                     aria-label="clear"
//                   />
//                   <input
//                     type="radio"
//                     name="rating-10"
//                     className="mask mask-star-2"
//                     aria-label="1 star"
//                   />
//                   <input
//                     type="radio"
//                     name="rating-10"
//                     className="mask mask-star-2"
//                     aria-label="2 star"
//                     defaultChecked
//                   />
//                   <input
//                     type="radio"
//                     name="rating-10"
//                     className="mask mask-star-2"
//                     aria-label="3 star"
//                   />
//                   <input
//                     type="radio"
//                     name="rating-10"
//                     className="mask mask-star-2"
//                     aria-label="4 star"
//                   />
//                   <input
//                     type="radio"
//                     name="rating-10"
//                     className="mask mask-star-2"
//                     aria-label="5 star"
//                   />
//                 </div>

//                 <button
//                   className="btn btn-secondary w-full mt-4"
//                   // onClick={() => {
//                   //   checkUser();
//                   //   dispatch(addToCartAsync({ userId, productId: _id }));
//                   // }}
//                   onClick={() => {
//                     handleError("First Select Size and Quantity"); 
//                     setTimeout(() => {
                      
//                    navigate(`/singleproduct/${_id}`);
//                     },1000)
//                   }}
//                 >
//                   🛒Add to cart
//                 </button>
//               </div>
//             );
//           })}
//         </div>
//       ) : (
//         <p>No products available</p>
//       )}
//     </div>
//   );
// };

// export default ProductsGridView;
