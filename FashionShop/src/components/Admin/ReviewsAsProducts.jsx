import React, { useEffect, useState } from "react";
import { getProducts } from "./Services/ProductServices";
import { getReviewByProductId } from "./Services/ReviewServices";
import { handleError, handleSuccess } from "../../utils/tostify";

const ReviewsAsProducts = () => {
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false); 

  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      if (res && res.success) {
        setProducts(res.data);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.log("Error fetching products => ", error);
    }
  };

  const handleFetchReviews = async (productId) => {
    setLoading(true);
    try {
      const res = await getReviewByProductId(productId);
      if (res && res.success) {
        setReviews(res.reviews);
        setShowModal(true); 
        handleSuccess("Reviews fetched successfully");
      } else {
        setReviews([]);
        handleError("No reviews found for this product");
      }
    } catch (error) {
      console.log("Error fetching reviews => ", error);
      handleError("Error while fetching reviews");
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">
        🛒 All Products List
      </h2>
      <h3 className="text-xl font-bold mb-4 text-center">Total Products: {products?.length || 0}</h3>
      {(products?.length || 0) === 0 ? (
        <p className="text-center text-gray-500">No Products Found</p>
      ) : (
        products.map((product) => (
          <div key={product._id} className="bg-white p-4 rounded shadow mb-3">
            <h3 className="font-semibold">{product.title}</h3>
            <p
              className="text-sm text-blue-600 cursor-pointer"
              onClick={() => handleFetchReviews(product._id)}
            >
              ID: {product._id}
            </p>
          </div>
        ))
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] md:w-[50%] p-4 rounded relative max-h-[80vh] overflow-y-auto">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-xl font-bold text-gray-600 hover:text-black"
            >
              &times;
            </button>

            <h2 className="text-xl font-bold mb-4 text-center">
              📄 Product Reviews
            </h2>

            {loading ? (
              <p className="text-center text-gray-500">Loading Reviews...</p>
            ) : (reviews?.length || 0) === 0 ? (
              <p className="text-gray-500 text-center">No reviews available.</p>
            ) : (
              reviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-gray-100 p-3 rounded shadow mb-3"
                >
                  <p className="text-sm text-gray-600">
                    Reviewer: {review.userId?.username || "Anonymous"}
                  </p>
                  <p className="text-sm text-yellow-600">
                    Rating: {review.rating} ⭐
                  </p>
                  <p className="mt-1">{review.comment}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewsAsProducts;


// import React, { useState } from 'react';
// import {getProducts} from "./Services/ProductServices"

// const sampleReviews = [
//   {
//     id: 1,
//     userEmail: 'ali@example.com',
//     product: 'T-shirt',
//     reviewer: 'Ali Khan',
//     rating: 4,
//     comment: 'Nice fabric but a bit tight.',
//   },
//   {
//     id: 2,
//     userEmail: 'sara@example.com',
//     product: 'Sneakers',
//     reviewer: 'Sara Ali',
//     rating: 5,
//     comment: 'Very comfortable and stylish!',
//   },
//   {
//     id: 3,
//     userEmail: 'ali@example.com',
//     product: 'T-shirt',
//     reviewer: 'Ali Khan',
//     rating: 3,
//     comment: 'Color was a bit dull.',
//   },
// ];

// const ReviewsAsProducts = () => {
//   const [productName, setProductName] = useState('');

//   const [filtered, setFiltered] = useState([]);

//   const product= async()=>{
//     try{
//       const res = await getProducts();
//       console.log("produts => ",res.data);
//     }
//     catch(error){
//       console.log("Error fetching products => ", error);

//   }
// }
//   product()

//   const handleSearch = () => {
//     const result = sampleReviews.filter(
//       (review) => review.product.toLowerCase() === productName.trim().toLowerCase()
//     );
//     setFiltered(result);
//   };

//   return (
//     <div className="p-4 max-w-2xl mx-auto">
//       <h2 className="text-xl font-bold mb-4 text-center">🔍 Search Reviews by Product Name</h2>

//       <div className="flex items-center gap-2 mb-4">
//         <input
//           type="text"
//           placeholder="Enter product name"
//           className="border p-2 flex-grow rounded"
//           value={productName}
//           onChange={(e) => setProductName(e.target.value)}
//         />
//         <button
//           onClick={handleSearch}
//           className="bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           Search
//         </button>
//       </div>

//       {filtered.length === 0 ? (
//         <p className="text-gray-500 text-center">No reviews found for this product.</p>
//       ) : (
//         filtered.map((review) => (
//           <div key={review.id} className="bg-white p-4 rounded shadow mb-3">
//             <p className="text-sm text-gray-600">Reviewer: {review.reviewer}</p>
//             <p className="text-sm text-yellow-600">Rating: {review.rating} ⭐</p>
//             <p className="mt-1">{review.comment}</p>
//             <p className="text-xs text-gray-400 mt-2">User Email: {review.userEmail}</p>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default ReviewsAsProducts;
