import React, { useState } from 'react'
import { CommonHeading } from '../../components'
import { useLoaderData } from 'react-router-dom';
import { axiosFetchProducts } from '../../utils/axiosFetch';
import { ProductsContainer } from '../../components';
import { AdminAddProducts } from '../../components/Admin';
import {AdminProductsContainer} from '../../components/Admin';
import { axiosAdminUrl } from '../../utils/axiosFetch';
import { Link } from 'react-router-dom';


export const loader = async () => {
  try {
    const res = await axiosAdminUrl.get("/get-products");
    console.log(res.data);
    const manageProducts = res.data.data;
    return { manageProducts };
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};


const ManageProducts = () => {
  
  return (
    <div className='align-elements'>
      <CommonHeading title='Manage Products' />

      <Link to="/admin/addproduct">
        <button className='btn btn-primary mb-3'>Add Product</button>
      </Link>
      {/* <ProductsContainer /> */}
      <AdminProductsContainer />
    </div>
  )
}

export default ManageProducts