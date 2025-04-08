import React, { useState } from 'react';

const sampleReviews = [
  {
    id: 1,
    userEmail: 'ali@example.com',
    product: 'T-shirt',
    reviewer: 'Ali Khan',
    rating: 4,
    comment: 'Nice fabric but a bit tight.',
  },
  {
    id: 2,
    userEmail: 'sara@example.com',
    product: 'Sneakers',
    reviewer: 'Sara Ali',
    rating: 5,
    comment: 'Very comfortable and stylish!',
  },
  {
    id: 3,
    userEmail: 'ali@example.com',
    product: 'T-shirt',
    reviewer: 'Ali Khan',
    rating: 3,
    comment: 'Color was a bit dull.',
  },
];

const ReviewsAsProducts = () => {
  const [productName, setProductName] = useState('');
  const [filtered, setFiltered] = useState([]);

  const handleSearch = () => {
    const result = sampleReviews.filter(
      (review) => review.product.toLowerCase() === productName.trim().toLowerCase()
    );
    setFiltered(result);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">🔍 Search Reviews by Product Name</h2>

      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter product name"
          className="border p-2 flex-grow rounded"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-500 text-center">No reviews found for this product.</p>
      ) : (
        filtered.map((review) => (
          <div key={review.id} className="bg-white p-4 rounded shadow mb-3">
            <p className="text-sm text-gray-600">Reviewer: {review.reviewer}</p>
            <p className="text-sm text-yellow-600">Rating: {review.rating} ⭐</p>
            <p className="mt-1">{review.comment}</p>
            <p className="text-xs text-gray-400 mt-2">User Email: {review.userEmail}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewsAsProducts;
