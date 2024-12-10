import React from "react";
import { axiosAdminUrl } from "../../../utils/axiosFetch";
import { handleSuccess } from "../../../utils/tostify";
import { handleError } from "../../../utils/tostify";
import { MyContext } from "../MyContext";
import { useContext } from "react";

export const createProduct = async (formData, setSuccess, setError) => {
  try {
    const response=await fetch ("http://localhost:8080/admin/create-product",{
      method:"POST",
      credentials:"include",
      body:formData,
    })
    const data=await response.json()
    console.log("data from backend for creating products  : ",data)
    if(data.success){
      handleSuccess("Product added successfully")
      return data
    }else{
      handleError(data.message)
    }
  } catch (error) {
    console.log("error in creating products : ",error )
    handleError("Error adding product");
  }
  // try {
  //   const res = await axiosAdminUrl.post("/create-product", formData, {
  //     headers: {
  //       "Content-Type": "multipart/form-data", // Set content type to multipart/form-data
  //     },
  //   });
  //   console.log(res.data);
  //   handleSuccess("Product added successfully");
  //   setSuccess("Product added successfully");
  //   return res.data;
  // } catch (error) {
  //   console.error("Error adding product:", error);
  //   handleError("Error adding product");
  //   setError("Error adding product");
  // }
};
export const deleteProduct = async (id) => {
  try {
    const response=await fetch (`http://localhost:8080/admin/delete-product/${id}`,{
      method:"DELETE",
      credentials:"include",
    })
    const data=await response.json()
    console.log("data from backend for deleting products  : ",data)
    if(data.success){
      handleSuccess("Product deleted successfully")
      return data
    }
    else{
      handleError(data.message)
    }
  } catch (error) {
    console.log("error in deleting product : ",error )
    handleError("Error deleting product");
  }
  // try {
  //   const res = await axiosAdminUrl.delete(`/delete-product/${id}`);
  //   console.log(res.data);
  //   handleSuccess("Product deleted successfully");
  //   return res.data;
  // } catch (error) {
  //   console.error("Error deleting product:", error);
  //   handleError("Error deleting product");
  // }
};

export const updateProduct = async (id, formData, setSuccess, setError) => {
  try {
    const response=await fetch (`http://localhost:8080/admin/update-product/${id}`,{
      method:"PATCH",
      credentials:"include",
      headers:{
        "Content-Type": "application/json",
      },
      body:JSON.stringify(formData),
    })
    const data=await response.json()
    console.log("data from backend for updating products  : ",data)
    if (data.success) {
      handleSuccess("Product updated successfully");
      setSuccess && setSuccess("Product updated successfully");
      return data;
    } else {
      handleError(data.message || "Failed to update product");
      setError && setError(data.message || "Failed to update product");
    }
  } catch (error) {
    console.log("error in updating product : ",error )
    handleError("Error updating product");
  }
}
  // try {
  //   console.log(id, formData);
  //   const res = await axiosAdminUrl.patch(`/update-product/${id}`, formData);
  //   console.log(res.data);
  //   handleSuccess("Product updated successfully");
  //   setSuccess("Product updated successfully");
  //   return res.data;
  // } catch (error) {
  //   console.error("Error updating product:", error);
  //   handleError("Error updating product");
  //   setError("Error updating product");
  // }

