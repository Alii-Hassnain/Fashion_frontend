import React from "react";
import AdminAddProducts from "./AdminAddProducts";
import EditDrawer from "./EditDrawer";
import { MyContext } from "./MyContext";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { updateProduct } from "./Services/ProductServices";
import { useLoaderData } from "react-router-dom";

const AdminEditProducts = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { editProduct, setEditProduct } = useContext(MyContext);
  const { manageProduct, setManageProducts } = useContext(MyContext);
  
  const [product, setProduct] = useState({
    id: editProduct._id || "",
    title: editProduct.title || "",
    price: editProduct.price || "",
    stock: editProduct.stock || "",
    rating: editProduct.rating || "",
    description: editProduct.description || "",
  });
  useEffect(() => {
    setProduct({
      id: editProduct._id || "",
      title: editProduct.title || "",
      price: editProduct.price || "",
      stock: editProduct.stock || "",
      rating: editProduct.rating || "",
      description: editProduct.description || "",
    });
  }, [editProduct]);

  console.log("product updated", product);
  console.log("editProduct", editProduct);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((product) => {
      return {
        ...product,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
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
    formData.append("stock", product.stock);
    formData.append("rating", product.rating);
    formData.append("description", product.description);
    console.log("productImage", product.product_image);
    updateProduct(product.id, formData, setSuccess, setError);

    await setManageProducts((prevProducts) =>
      prevProducts.map((prod) =>
        prod._id === product.id ? { ...prod, ...product } : prod
      )
    );
  };
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <form key={editProduct._id} onSubmit={handleSubmit}>
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
        {/* <div className="form-control">
          <label className="label">
            <span className="label-text">Product Image</span>
          </label>
          <input
            type="file"
            name="product_image"
            onChange={handleFile}
            placeholder="Product Image"
          />
        </div> */}
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
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminEditProducts;
