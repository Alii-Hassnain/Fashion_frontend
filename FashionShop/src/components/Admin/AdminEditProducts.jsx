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
    variants: editProduct.variants || [{ size: "", quantity: "" }],
    
  });
  useEffect(() => {
    setProduct({
      id: editProduct._id || "",
      title: editProduct.title || "",
      price: editProduct.price || "",
      stock: editProduct.stock || "",
      rating: editProduct.rating || "",
      description: editProduct.description || "",
      variants: editProduct.variants || [{ size: "", quantity: "" }],
    
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

  const handleVariantChange = (index, e) => {
    const { name, value } = e.target;
    const updatedVariants = [...product.variants];
    updatedVariants[index][name] = value;
    setProduct((prev) => ({
      ...prev,
      variants: updatedVariants,
    }));
  };

  const handleAddVariant = () => {
    setProduct((prev) => ({
      ...prev,
      variants: [...prev.variants, { size: "", quantity: 0 }],
    }));
  };

  const handleRemoveVariant = (index) => {
    const updatedVariants = product.variants.filter((_, i) => i !== index);
    setProduct((prev) => ({
      ...prev,
      variants: updatedVariants,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      title: product.title,
      price: product.price,
      stock: product.stock,
      rating: product.rating,
      description: product.description,
      variants: product.variants,
      
    };
  
    const response = await updateProduct(product.id, productData, setSuccess, setError);
    if (response && response.success) {
      setManageProducts((prevProducts) =>
        prevProducts.map((prod) => (prod._id === product.id ? { ...prod, ...productData } : prod))
      );
    }
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

        <div className="mt-6">
          <h3 className="font-bold text-lg mb-2">Product Variants</h3>
          {product.variants.map((variant, index) => (
            <div key={index} className="grid grid-cols-3 gap-4 items-end mb-4">
              <input
                type="text"
                name="size"
                value={variant.size}
                onChange={(e) => handleVariantChange(index, e)}
                className="input input-bordered"
                placeholder="Size"
              />
          
              <input
                type="number"
                name="quantity"
                value={variant.quantity}
                onChange={(e) => handleVariantChange(index, e)}
                className="input input-bordered"
                placeholder="Quantity"
              />
              {product.variants.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveVariant(index)}
                  className="btn btn-sm btn-error mt-2"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={handleAddVariant} className="btn btn-sm btn-accent">
            Add Variant
          </button>
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
