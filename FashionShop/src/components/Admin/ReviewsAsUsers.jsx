import React, { useState } from 'react';
import { getReviewByUserEmailOrUsername } from "../Admin/Services/ReviewServices"
import { handleError, handleSuccess } from "../../utils/tostify"; 
const ReviewsAsUsers = () => {
  const [searchEmailOrUsername, setSearchEmailOrUsername] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const handleSearch = async () => {
    if (!searchEmailOrUsername.trim()) {
      handleError("Please enter email or username to search reviews");
      return;
    }
    setLoading(true);
    try {
      const response = await getReviewByUserEmailOrUsername(searchEmailOrUsername);

      console.log("Response from backend => ", response);

      if (response.success) {
        setFiltered(response.reviews);
        setTotalCount(response.count); 
        handleSuccess("Reviews fetched successfully"); 
      } else {
        setFiltered([]);
        setTotalCount(0); 
        handleError(response.message || "No reviews found");
      }
      setSearchEmailOrUsername('');
    }
    catch (error) {
      console.log("Error fetching reviews => ", error);
      handleError("Error while fetching reviews");
      setFiltered([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">🔍 Search Reviews by User Email or Username</h2>

      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter user email or username"
          className="border p-2 flex-grow rounded"
          value={searchEmailOrUsername}
          onChange={(e) => setSearchEmailOrUsername(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading reviews...</p>
      ) : filtered.length === 0 ? (
        <p className="text-gray-500 text-center">No reviews found for this user.</p>
      ) : (
        <>
          <h3 className="text-lg font-semibold mb-2 text-center">Total Reviews Found: {totalCount}</h3>
        {filtered.map((review) => (
          <div key={review._id} className="bg-white p-4 rounded shadow mb-3  ">    
            <h3 className="font-semibold">{review.productId.title || "Product"}</h3>
            <p className="text-sm text-gray-600"> ({review.productId._id})</p>
            <p className="text-sm text-gray-600">Reviewer: {review.userId.username || "Anonymous"}</p>
            <p className="text-sm text-yellow-600">Rating: {review.rating} ⭐</p>
            <p className="mt-1">{review.comment}</p>
 </div>
          ))}
        </>
      )}
    </div>
  );
};
export default ReviewsAsUsers;
