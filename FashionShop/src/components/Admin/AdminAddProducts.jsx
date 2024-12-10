import React, { useState } from "react";
import { createProduct } from "./Services/ProductServices";
import { deleteProduct } from "./Services/ProductServices";
import { updateProduct } from "./Services/ProductServices";
import { MyContext } from "./MyContext";
import { useContext } from "react";
const AdminAddProducts = () => {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [product, setProduct] = useState({
        title: "",
        price: "",
        product_image: "",
        stock: "",
        description: "",
        rating: "",
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((product) => {
            return {
                ...product,
                [name]: value,
            };
        });
    };
    const handleFile = (e) => {
        const file = e.target.files[0];
        setProduct((product) => {
            return {
                ...product,
                product_image: file,
            };
        });
    };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
    !product.product_image ||
    !product.price ||
    !product.title ||
    !product.description ||
    product.stock < 0 ||
    product.rating < 0
    ) {
      setError("Please fill in all fields correctly");
      return;
    }
    const formData = new FormData();
    formData.append("title", product.title);
    formData.append("price", product.price);
    formData.append("product_image", product.product_image);
    formData.append("stock", product.stock);
    formData.append("description", product.description);
    formData.append("rating", product.rating);
    
    console.log(formData);
    console.log("Product added:", formData);
    createProduct(formData, setSuccess, setError);
    
    setProduct({
        product_image: "",
        price: "",
        title: "",
        description: "",
        stock: "",
        rating: "",
    });
    setError(null);
    setSuccess(null);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Product Title</span>
          </label>
          <input
            type="text"
            value={product.title}
            name="title"
            onChange={handleChange}
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
            value={product.price}
            onChange={handleChange}
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
            onChange={handleFile}
            placeholder="Product Image"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Product Stock</span>
          </label>
          <input
            type="number"
            value={product.stock}
            name="stock"
            onChange={handleChange}
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
            value={product.rating}
            name="rating"
            onChange={handleChange}
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
            value={product.description}
            onChange={handleChange}
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
