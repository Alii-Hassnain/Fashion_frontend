import React, { useState } from 'react';

const sampleReviews = [
  {
    id: 1,
    product: 'T-shirt',
    reviewer: 'Ali Khan',
    rating: 4,
    comment: 'Nice fabric but a bit tight.',
  },
  {
    id: 2,
    product: 'Sneakers',
    reviewer: 'Sara Ali',
    rating: 5,
    comment: 'Very comfortable and stylish!',
  },
];

const ReviewsAsApproval = () => {
  const [reviews, setReviews] = useState(sampleReviews);

  const handleApprove = (id) => {
    setReviews(reviews.map(r => r.id === id ? { ...r, status: 'Approved' } : r));
  };

  const handleReject = (id) => {
    setReviews(reviews.map(r => r.id === id ? { ...r, status: 'Rejected' } : r));
  };

  const handleDelete = (id) => {
    setReviews(reviews.filter(r => r.id !== id));
  };

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review.id} className="p-4 border rounded shadow-sm bg-white">
          <h2 className="font-bold text-lg">{review.product}</h2>
          <p className="text-sm text-gray-700">Reviewer: {review.reviewer}</p>
          <p className="text-sm text-gray-600">Rating: {review.rating} ⭐</p>
          <p className="text-gray-800 mt-1">"{review.comment}"</p>
          <div className="mt-3 space-x-2">
            <button
              onClick={() => handleApprove(review.id)}
              className="bg-green-600 text-white px-3 py-1 rounded"
            >
              Approve
            </button>
            <button
              onClick={() => handleReject(review.id)}
              className="bg-yellow-500 text-white px-3 py-1 rounded"
            >
              Reject
            </button>
            <button
              onClick={() => handleDelete(review.id)}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-2">Status: {review.status || 'Pending'}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewsAsApproval;
