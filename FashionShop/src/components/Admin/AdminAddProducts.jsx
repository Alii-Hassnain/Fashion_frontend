import React, { useState } from "react";
import { createProduct } from "../Admin/ManageProductsHooks";


const AdminAddProducts = () => {
  const [productImage, setProductImage] = useState(null);
  const [productPrice, setProductPrice] = useState(0);
  const [productTitle, setProductTitle] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productStock, setProductStock] = useState(0);
  const [productRating, setProductRating] = useState(0);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productImage || !productPrice || !productTitle || !productDescription || productStock < 0 || productRating < 0) {
      setError("Please fill in all fields correctly");
      return;
    }
    const formData = new FormData();
    formData.append("title", productTitle);
    formData.append("price", productPrice);
    formData.append("product_image", productImage);
    formData.append("stock", productStock);
    formData.append("description", productDescription);
    formData.append("rating", productRating);
    console.log("productImage", productImage);
    
    
    console.log(formData);
    
    // Add product logic here
    console.log("Product added:", formData);
    createProduct(formData,setSuccess,setError);

    // Reset form fields
    setProductImage(null);
    setProductPrice(0);
    setProductTitle("");
    setProductDescription("");
    setProductStock(0);
    setProductRating(0);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Add Product Form</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <form onSubmit={handleSubmit}>

      <div className="form-control">
          <label className="label">
            <span className="label-text">Product Title</span>
          </label>
          <input
            type="text"
            value={productTitle}
            name="title"
            onChange={(event) => setProductTitle(event.target.value)}
            placeholder="Product Title"
            className="input input-bordered"
          />
        </div>
        
        <div className="form-control">
          <label className="label">
            <span className="label-text">Product Price</span>
          </label>
          <input
            type="number"
            name="price"
            value={productPrice}
            onChange={(event) => setProductPrice(event.target.valueAsNumber)}
            placeholder="Product Price"
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Product Image</span>
          </label>
          <input
            type="file"
            name="product_image"
            onChange={(event) => setProductImage(event.target.files[0])}
            placeholder="Product Image"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Product Stock</span>
          </label>
          <input
            type="number"
            value={productStock}
            name="stock"
            onChange={(event) => setProductStock(event.target.valueAsNumber)}
            placeholder="Product Stock"
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Product Rating</span>
          </label>
          <input
            type="number"
            value={productRating}
            name="rating"
            onChange={(event) => setProductRating(event.target.valueAsNumber)}
            placeholder="Product Rating (0-5)"
            className="input input-bordered"
            min="0"
            max="5"
            step="0.1"
          />
        </div>
        
        <div className="form-control">
          <label className="label">
            <span className="label-text">Product Description</span>
          </label>
          <textarea
            value={productDescription}
            onChange={(event) => setProductDescription(event.target.value)}
            placeholder="Product Description"
            className="input input-bordered"
            name="description"
          />
        </div>
        
        
        <div className="form-control mt-6">
          <button className="btn btn-primary" type="submit ">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminAddProducts;