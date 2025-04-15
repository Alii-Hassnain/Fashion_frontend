import React, { useState , useEffect} from "react";
import { axiosFetchProducts } from "../utils/axiosFetch";
import { useNavigate, useLoaderData } from "react-router-dom";
import { useDispatch , useSelector } from "react-redux";
import {  addToCartAsync } from "../features/cartSlice";
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
} from "@/components/ui/carousel.jsx";
import { TryRoom } from "../pages";
import { handleError,handleSuccess } from "../utils/tostify";
import { checkAuth } from "../components/Admin/Services/UserServices";
import {createReview, getReviews} from "../components/Admin/Services/ReviewServices";
import { ProductsRecommendation } from "../components"; 



export const loader = async ({ params }) => {
  const id = params.id;
  try {
    const res = await axiosFetchProducts.get(`/product/${id}`);
    const res2 = await axiosFetchProducts.get(`/recommendedproducts/${id}`)
    const singleProduct = res.data.data;

    const recommendedProducts = res2.data;
    return { singleProduct , recommendedProducts };
  } catch (error) {
    console.error("Error fetching product:", error);
    throw new Response("Product not found", { status: 404 });
  }
};




const SingleProduct = () => {
  const [userId, setUserId] = useState("");
  const { singleProduct,recommendedProducts } = useLoaderData();
  console.log("singleProduct",singleProduct)
  console.log("recommendedProducts",recommendedProducts)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.userData);
  const { title, description, price, product_image,variants } = singleProduct;
  
  console.log("singleProduct",singleProduct)
  const colors = ["#000000", "#FF5733", "#1E90FF", "#32CD32", "#800080"];

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [showReviews, setShowReviews] = useState(false);



  

  // const [reviews, setReviews] = useState([
  //   {
  //     id: 1,
  //     user: "Ali",
  //     rating: 5,
  //     comment: "Great product!",
  //     date: "20 Mar 2025",
  //   },
  //   {
  //     id: 2,
  //     user: "Hassan",
  //     rating: 4,
  //     comment: "Good quality but late delivery.",
  //     date: "21 Mar 2025",
  //   },
  // ]);

  const [reviews, setReviews] = useState([]);


  const [activeTab, setActiveTab] = useState("description");


  const isAuth = async () => {
    try {
      const response = await checkAuth();
      console.log("user services response in single product component is : ", response);
      if (response.success) {
        setUserId(response.user._id);

      } else {
        setUserId(null);
      }
      return response.success;
    } catch (error) {
      console.error("Error checking session:", error);
      return false;
    }
  };
  useEffect(() => {
    isAuth();
    fetchReviews();
  }, []);
  const handleAddToCart = () => {
    if (userId) {
      dispatch(
        addToCartAsync({
          userId,
          productId: singleProduct._id,
          size:selectedSize,
          quantity:selectedQuantity,
        })
      );
    }
    else {
      handleError("Please Login first to add items to cart");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  }

  const handleTryRoom = () => {
    if (userId) {
      navigate("/tryroom", { state: { image: singleProduct.product_image } });
    } else {
      handleError("Please Login First to use try room.");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await getReviews(singleProduct._id);
      console.log("data from backend for getting reviews  : ", response);
      if (response.success) {
        setReviews(response.reviews);
      }
       else {
        handleError(response.message);
      }
    } catch (error) {
      console.log("error in getting reviews : ", error);
      handleError("Error getting reviews");
    }
  };
  // In your SingleProduct component
useEffect(() => {
  if (singleProduct?._id) {
    fetchReviews();
  }
}, [singleProduct._id]); // Add product ID as dependency

useEffect(() => {
  return () => {
    setReviews([]); // Reset when component unmounts
  };
}, []);

  // useEffect(() => {
  //   if (userData?._id) {
  //     setUserId(userData._id);
  //   }
  // }, [userData]);
  //   const checkUser = () => {
  //     if (!userId) {
  //       handleError("please Login first");
  //       return false
  //     }
  //     return true
  //   };

 

  // const sizes = ["S", "M", "L", "XL", "2XL"];


 

  // const handleReviewSubmit = () => {
  //   if (newReview.user && newReview.comment) {
  //     const currentDate = new Date().toLocaleDateString("en-GB", {
  //       day: "2-digit",
  //       month: "short",
  //       year: "numeric",
  //     });
  //     setReviews([
  //       ...reviews,
  //       { id: reviews.length + 1, ...newReview, date: currentDate },
  //     ]);
  //     setNewReview({ user: "", rating: 5, comment: "" });
  //   }
  // };

  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: "",
  });
  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if(!userId){
      handleError("Please Login First to add review.");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
      return
    }
    if (!newReview.comment) {
      handleError("Comment is required.");
      return;
    }
    const reviewData = {
      productId: singleProduct._id,
      // userId: userId,
      comment: newReview.comment,
      rating: newReview.rating,
    };
    console.log("reviewData is : ", reviewData);

  try {
    const response = await createReview(reviewData);
    if (response.success) {
      handleSuccess("Review submitted successfully.");
      setNewReview({  rating: 5, comment: "" });
      fetchReviews(); 
    } else {
      handleError(response.message || "Failed to submit review.");
    }
  } catch (error) {
    console.error("Error submitting review:", error);
    handleError("Something went wrong.");
  } 
}




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
            {/* {sizes.map((size) => ( */}
            {/* {variants.map((variant) => (
             
             <button
                key={variant._id}
                
                className={`btn btn-outline ${
                  selectedSize === variant.size ? "btn-primary" : ""
                }`}
                onClick={() => setSelectedSize(variant.size)
                
                }
              >
                {variant.size}
                {variant.size === selectedSize && <span>✔️</span>}
                {variant.quantity > 0 && <span> ({variant.quantity} in stock)</span>}
              </button>
            ))} */}
            {variants.map((variant) => (
      <div key={variant._id} className="relative">
        <button
          className={`btn btn-outline ${
            selectedSize === variant.size ? "btn-primary" : ""
          }`}
          onClick={() => setSelectedSize(variant.size)}
        >
          {variant.size} {/* Display Size */}
          {selectedSize === variant.size && <span> ✔️</span>}
        </button>
        {/* Quantity behind the button in small font */}
        <span
          className={`absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-xs ${
            variant.quantity < 10 ? "text-red-500" : "text-gray-500"
          }`}
        >
          x{variant.quantity}
        </span>
      </div>
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
        <div>
          <label className="font-medium">Select Quantity:</label>
          <input type="number" value={selectedQuantity} onChange={(e) => setSelectedQuantity(parseInt(e.target.value) )} className="border p-2 w-20 mt-2" />
        </div>

        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
          <button
            className="btn btn-primary w-full md:w-auto"
            onClick={handleAddToCart}
            // onClick={() =>{
            //   if(checkUser()){
            //   dispatch(
            //     addToCartAsync({
            //       userId,
            //       productId: singleProduct._id,
            //       size:selectedSize,
            //       quantity:selectedQuantity,
                  
            //     })

            //   )}
            // }
            // }
            // onClick={ dispatch(addToCart(singleProduct._id))}
            disabled={!selectedSize || !selectedColor}
          >
            Add to Cart
          </button>
          
          {/* <Link to="/tryroom"state={{ image: product_image }}>
            <button className="btn btn-secondary w-full md:w-auto"
            >
              Try Virtually
            </button>
          </Link> */}
          <button
              className="btn btn-secondary w-full md:w-auto"
              // onClick={() => {
              //   if (checkUser()) {
              //     navigate("/tryroom", { state: { image: product_image } });
              //   }
              // }}
              onClick={handleTryRoom}
            >
              Try Virtually
            </button>
          
        </div>
      </div>

      <div className="flex border-b mb-2 mt-10 md:mt-0 w-full md:w-auto">
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
            {reviews.length === 0 && (
              <p className="text-red-600 text-center mt-0">No reviews yet.</p>
            )}
            <h2 className="text-md font-bold mb-5">
              Customer Reviews ⭐({reviews.length})
            </h2>
            {reviews.map((review) => (
              <div key={review.id} className="border-b pb-2 mb-2">
                <p className="font-semibold">
                  {review.userId.username}{" "}
                  <span className="text-gray-500 text-sm">({review.createdAt})</span>
                </p>
                <p className="text-yellow-500">{"⭐".repeat(review.rating)}</p>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}

            {/* Review Submission */}
            <div className="mt-4 border p-5">
              <h3 className="text-lg font-semibold">Add a Review</h3>
              {/* <input
                type="text"
                placeholder="Your Name"
                className="border p-2 w-full mt-2"
                value={newReview.user}
                onChange={(e) =>
                  setNewReview({ ...newReview, user: e.target.value })
                }
              /> */}

              

              {/* Star Selection */}
              <div className="rating flex flex-col gap-2 mt-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <label
                    key={star}
                    className={`flex items-center gap-2 cursor-pointer border p-2 rounded-md hover:bg-gray-200 ${                 
                      newReview.rating === star
                      
                        ? "border-black bg-gray-300"
                        : ""
                    }` }
                  >
                    <input
                      type="radio"
                      name="rating"
                      className="hidden"
                      checked={newReview.rating === star}
                      onChange={() =>{
                        setNewReview({ ...newReview, rating: star }
                        )
                      }
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
                className="border p-2 w-full mt-2 text-white bg-gray-800"
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
          <ProductsRecommendation/>
        </div>
    </div>
  );
};

export default SingleProduct;
