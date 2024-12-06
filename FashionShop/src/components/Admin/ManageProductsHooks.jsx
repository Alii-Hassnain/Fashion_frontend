import React from 'react'
import { axiosAdminUrl } from "../../utils/axiosFetch";
import { handleSuccess } from "../../utils/tostify";
import { handleError } from "../../utils/tostify";


export const createProduct = async (formData,setSuccess,setError) => {
    try {
      const res = await axiosAdminUrl.post("/create-product", formData,
        {
            headers: {
              'Content-Type': 'multipart/form-data', // Set content type to multipart/form-data
            },
        }
      );
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