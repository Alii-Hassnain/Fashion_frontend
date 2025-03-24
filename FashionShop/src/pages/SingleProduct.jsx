import React, { useState } from "react";
import { axiosFetchProducts } from "../utils/axiosFetch";
import { useLoaderData } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { ProductsContainer } from "../components";

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

  const sizes = ["S", "M", "L", "XL", "2XL"];
  const colors = ["#000000", "#FF5733", "#1E90FF", "#32CD32", "#800080"];

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [showReviews, setShowReviews] = useState(false);

  const [reviews, setReviews] = useState([
    { id: 1, user: "Ali", rating: 5, comment: "Great product!", date: "20 Mar 2025" },
    { id: 2, user: "Hassan", rating: 4, comment: "Good quality but late delivery.", date: "21 Mar 2025" },
  ]);

  const [newReview, setNewReview] = useState({ user: "", rating: 5, comment: "" });

  const handleReviewSubmit = () => {
    if (newReview.user && newReview.comment) {
      const currentDate = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
      setReviews([...reviews, { id: reviews.length + 1, ...newReview, date: currentDate }]);
      setNewReview({ user: "", rating: 5, comment: "" });
    }
  };

  return (
    <div className="align-elements grid grid-cols-1 md:grid-cols-2 items-start px-6 md:px-16 py-10">
      <div className="flex justify-center">
        <Zoom>
          <img
            src={product_image}
            alt={title}
            className="w-56 max-w-xs md:max-w-md object-contain rounded-lg"
          />
        </Zoom>
      </div>

      <div className="flex flex-col gap-4 items-start">
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        <p className="text-gray-600">{description}</p>
        <p className="text-lg font-semibold text-gray-700">
          Price: <span className="text-blue-600">PKR {price}</span>
        </p>

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
        </div>

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

        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
          <button
            className="btn btn-primary w-full md:w-auto"
            onClick={() => dispatch(addToCart({ ...singleProduct, selectedSize, selectedColor }))}
            disabled={!selectedSize || !selectedColor}
          >
            Add to Cart
          </button>
          <button className="btn btn-secondary w-full md:w-auto">Buy Now</button>
        </div>
      </div>

      <div className="mt-10 w-full md:col-span-2">
        <h2 className="text-md font-bold mb-4 flex justify-between items-center">
          Customer Reviews
          ⭐({reviews.length})
          <button 
            className="text-blue-500 underline text-sm"
            onClick={() => setShowReviews(!showReviews)}
          >
            {showReviews ? "Hide Reviews" : "Show Reviews"}
          </button>
        </h2>

        {showReviews && (
          <>
            {reviews.map((review) => (
              <div key={review.id} className="border-b pb-2 mb-2">
                <p className="font-semibold">{review.user} <span className="text-gray-500 text-sm">({review.date})</span></p>
                <p className="text-yellow-500">{"⭐".repeat(review.rating)}</p>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}

            <div className="mt-4">
              <h3 className="text-lg font-semibold">Write a Review</h3>
              <input
                type="text"
                placeholder="Your Name"
                className="border p-2 w-full mt-2"
                value={newReview.user}
                onChange={(e) => setNewReview({ ...newReview, user: e.target.value })}
              />

              {/* Star Selection with Radio Inputs */}
              <div className="rating flex mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <input
                    key={star}
                    type="radio"
                    name="rating"
                    className="mask mask-star-2 bg-orange-400"
                    aria-label={`${star} star`}
                    checked={newReview.rating === star}
                    onChange={() => setNewReview({ ...newReview, rating: star })}
                  />
                ))}
              </div>

              <textarea
                placeholder="Your Review"
                className="border p-2 w-full mt-2"
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              ></textarea>
              <button 
                className="btn btn-primary mt-2"
                onClick={handleReviewSubmit}
              >
                Submit Review
              </button>
            </div>
          </>
        )}
      </div>
      <ProductsContainer/>
    </div>
  );
};

export default SingleProduct;
