import React, { useState } from "react";
import { axiosFetchProducts } from "../utils/axiosFetch";
import { useLoaderData } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { Link } from "react-router-dom";
import { CommonHeading, ProductsContainer } from "../components";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { TryRoom } from "../pages";

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
    {
      id: 1,
      user: "Ali",
      rating: 5,
      comment: "Great product!",
      date: "20 Mar 2025",
    },
    {
      id: 2,
      user: "Hassan",
      rating: 4,
      comment: "Good quality but late delivery.",
      date: "21 Mar 2025",
    },
  ]);

  const [newReview, setNewReview] = useState({
    user: "",
    rating: 5,
    comment: "",
  });

  const handleReviewSubmit = () => {
    if (newReview.user && newReview.comment) {
      const currentDate = new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
      setReviews([
        ...reviews,
        { id: reviews.length + 1, ...newReview, date: currentDate },
      ]);
      setNewReview({ user: "", rating: 5, comment: "" });
    }
  };

 

  const [activeTab, setActiveTab] = useState("description");

  return (
    <div className="align-elements">

    
    <div className=" grid grid-cols-1 md:grid-cols-2 items-start px-6 md:px-16 py-10">
      <div className="flex justify-center">
        <Carousel>
          <CarouselContent>
            {/* apply map function to display multiple images */}
            <CarouselItem>
              <Zoom>
                <img
                  src={product_image}
                  alt={title}
                  className="w-56 max-w-xs md:max-w-md object-contain rounded-lg"
                />
              </Zoom>
            </CarouselItem>
            <CarouselItem>...</CarouselItem>
            <CarouselItem>...</CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <div className="flex flex-col gap-4 items-start">
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        <p className="text-lg font-semibold text-gray-700">
          Price: <span className="text-blue-600">PKR {price}</span>
        </p>
        <p className="text-gray-600">{description}</p>

        <div>
          <label className="font-medium">Select Size:</label>
          <div className="flex gap-2 mt-1">
            {sizes.map((size) => (
              <button
                key={size}
                className={`btn btn-outline ${
                  selectedSize === size ? "btn-primary" : ""
                }`}
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
                className={`w-8 h-8 rounded-full border-2 ${
                  selectedColor === color ? "border-blue-600" : ""
                }`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
              ></button>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
          <button
            className="btn btn-primary w-full md:w-auto"
            onClick={() =>
              dispatch(
                addToCart({ ...singleProduct, selectedSize, selectedColor })
              )
            }
            disabled={!selectedSize || !selectedColor}
          >
            Add to Cart
          </button>
          <Link to="/tryroom"state={{ image: product_image }}>
            <button className="btn btn-secondary w-full md:w-auto"
            >
              Try Virtually
              {/* <TryRoom selectedImage={product_image}/> */}
            </button>
          </Link>
        </div>
      </div>

      <div className="flex border-b mb-4">
        <button
          className={`py-2 px-4 text-lg font-semibold ${
            activeTab === "description"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("description")}
        >
          Description
        </button>
        <button
          className={`py-2 px-4 text-lg font-semibold ${
            activeTab === "reviews"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews ⭐({reviews.length})
        </button>
      </div>

      <div className="mt-10 w-full md:col-span-2">
        {activeTab === "description" && (
          <div>
            <h2 className="text-md font-bold">Product Description</h2>
            <p className="text-gray-600 mt-2">
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              making it over 2000 years old. Vivamus bibendum magna Lorem ipsum
              dolor sit amet, consectetur adipiscing elit.Contrary to popular
              belief, Lorem Ipsum is not simply random text. It has roots in a
              piece of classical Latin literature from 45 BC, making it over
              2000 years old. At vero eos et accusamus et iusto odio dignissimos
              ducimus qui blanditiis praesentium voluptatum deleniti atque
              corrupti quos dolores et quas molestias excepturi sint occaecati
              cupiditate non provident, similique sunt in culpa qui officia
              deserunt mollitia animi, id est laborum et dolorum fuga. Et harum
              quidem rerum facilis est et expedita distinctio.
            </p>
          </div>
        )}
        {activeTab === "reviews" && (
          <div>
            <h2 className="text-md font-bold mb-5">
              Customer Reviews ⭐({reviews.length})
            </h2>
            {reviews.map((review) => (
              <div key={review.id} className="border-b pb-2 mb-2">
                <p className="font-semibold">
                  {review.user}{" "}
                  <span className="text-gray-500 text-sm">({review.date})</span>
                </p>
                <p className="text-yellow-500">{"⭐".repeat(review.rating)}</p>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}

            {/* Review Submission */}
            <div className="mt-4 border p-10">
              <h3 className="text-lg font-semibold">Add a Review</h3>
              <input
                type="text"
                placeholder="Your Name"
                className="border p-2 w-full mt-2"
                value={newReview.user}
                onChange={(e) =>
                  setNewReview({ ...newReview, user: e.target.value })
                }
              />

              

              {/* Star Selection */}
              <div className="rating flex flex-col gap-2 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <label
                    key={star}
                    className={`flex items-center gap-2 cursor-pointer border p-2 rounded-md hover:bg-gray-100 ${
                      newReview.rating === star
                        ? "border-black bg-gray-200"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="rating"
                      className="hidden"
                      checked={newReview.rating === star}
                      onChange={() =>
                        setNewReview({ ...newReview, rating: star })
                      }
                    />
                    <div className="flex">
                      {[...Array(star)].map((_, index) => (
                        <span key={index} className="text-2xl text-black">
                          ★
                        </span>
                      ))}
                      {/* {[...Array(5 - star)].map((_, index) => (
                        <span key={index} className="text-2xl text-gray-400">
                          ★
                        </span>
                      ))} */}
                    </div>
                    {newReview.rating === star && (
                      <span className="text-green-600 text-xl">✔️</span>
                    )}
                  </label>
                ))}
              </div>

              <textarea
                placeholder="Your Review"
                className="border p-2 w-full mt-2"
                value={newReview.comment}
                onChange={(e) =>
                  setNewReview({ ...newReview, comment: e.target.value })
                }
              ></textarea>
              <button
                className="btn btn-primary mt-2"
                onClick={handleReviewSubmit}
              >
                Submit Review
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
        <div>
          <CommonHeading title={"You may also Like"}/>
        </div>
    </div>
  );
};

export default SingleProduct;
