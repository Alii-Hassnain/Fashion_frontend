import React, { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { deleteProduct } from "./Services/ProductServices";
import AdminEditProducts from "../Admin/AdminEditProducts";
import { MyContext } from "./MyContext";
import { useContext } from "react";

import { useState } from "react";
import AdminAddProducts from "./AdminAddProducts";
import EditDrawer from "./EditDrawer";

const AdminProductsGridView = () => {
  const { manageProducts } = useLoaderData();
  const {manageProduct, setManageProducts} = useContext(MyContext);
  const { editProduct, setEditProduct } = useContext(MyContext);
  

  useEffect(() => {
    setManageProducts(manageProducts);
  }, [manageProducts]);

  const handleDeleteProduct = async (id) => {
    const res = await deleteProduct(id);
    if (res) {
      setManageProducts(manageProduct.filter((product) => product._id !== id));
    }
  };
  const handleEditProduct = async (product) => {
    // implement edit product logic here
    const findProduct = await (manageProduct.find((p) => p._id === product._id));
    setEditProduct(findProduct);
    console.log("Edit product:", editProduct);
  };
  return (
    <div>
      {manageProduct.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
          {manageProduct.map((product) => {
            const { _id, product_image, price, title, description } = product;
            console.log(product_image);
            return (
              <div key={_id} className="bg-white shadow-md rounded-md p-4">
                <img
                  src={product_image}
                  alt={title}
                  className="w-full h-56 object-scale-down"
                />
                <h2 className="text-lg font-semibold text-gray-800 mt-2">
                  {title}
                </h2>
                {/* <p className="text-gray-600 mt-2">{description}</p> */}
                <p className="text-gray-800 mt-2">PKR {price}</p>
                <div className="flex flex-col cursor-pointer gap-2 mt-3">
                  <div
                    className="text-slate-400 link-hover"
                    onClick={() => handleEditProduct(product)}
                  >
                    {<EditDrawer product={manageProduct} />}
                    {/* {<AdminEditProducts />} */}
                  </div>
                  {/* <button className='btn btn-primary'>Edit</button> */}
                  <button
                    className="btn btn-warning w-full"
                    onClick={() => handleDeleteProduct(_id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
};

export default AdminProductsGridView;
