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
    product: 'Jeans',
    reviewer: 'Ali Khan',
    rating: 3,
    comment: 'Good but color faded.',
  },
];

const ReviewsAsUsers = () => {
  const [searchEmail, setSearchEmail] = useState('');
  const [filtered, setFiltered] = useState([]);

  const handleSearch = () => {
    const result = sampleReviews.filter(
      (review) => review.userEmail === searchEmail.trim()
    );
    setFiltered(result);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">🔍 Search Reviews by User Email</h2>

      <div className="flex items-center gap-2 mb-4">
        <input
          type="email"
          placeholder="Enter user email"
          className="border p-2 flex-grow rounded"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-500 text-center">No reviews found for this email.</p>
      ) : (
        filtered.map((review) => (
          <div key={review.id} className="bg-white p-4 rounded shadow mb-3">
            <h3 className="font-semibold">{review.product}</h3>
            <p className="text-sm text-gray-600">Reviewer: {review.reviewer}</p>
            <p className="text-sm text-yellow-600">Rating: {review.rating} ⭐</p>
            <p className="mt-1">{review.comment}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewsAsUsers;
