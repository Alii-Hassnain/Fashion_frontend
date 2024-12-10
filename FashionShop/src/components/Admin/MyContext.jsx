import React from "react";
import { createContext, useState } from "react";

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editProduct, setEditProduct] = useState("");
  const [manageProduct,setManageProducts] = useState("");
  return (
    <MyContext.Provider
      value={{
        manageProduct,
        setManageProducts,
        error,
        setError,
        success,
        setSuccess,
        editProduct,
        setEditProduct,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
