import React from "react";
import { axiosAdminUrl } from "../../../utils/axiosFetch";
import { handleSuccess } from "../../../utils/tostify";
import { handleError } from "../../../utils/tostify";
import { MyContext } from "../MyContext";
import { useContext } from "react";

export const createProduct = async (formData, setSuccess, setError) => {
  try {
    const res = await axiosAdminUrl.post("/create-product", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Set content type to multipart/form-data
      },
    });
    console.log(res.data);
    handleSuccess("Product added successfully");
    setSuccess("Product added successfully");
    return res.data;
  } catch (error) {
    console.error("Error adding product:", error);
    handleError("Error adding product");
    setError("Error adding product");
  }
};
export const deleteProduct = async (id) => {
  try {
    const res = await axiosAdminUrl.delete(`/delete-product/${id}`);
    console.log(res.data);
    handleSuccess("Product deleted successfully");
    return res.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    handleError("Error deleting product");
  }
};

export const updateProduct = async (id, formData, setSuccess, setError) => {
  
  try {
    console.log(id, formData);
    const res = await axiosAdminUrl.patch(`/update-product/${id}`, formData);
    console.log(res.data);
    handleSuccess("Product updated successfully");
    setSuccess("Product updated successfully");
    return res.data;
  } catch (error) {
    console.error("Error updating product:", error);
    handleError("Error updating product");
    setError("Error updating product");
  }
};
