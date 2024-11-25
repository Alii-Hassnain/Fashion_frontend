import React from 'react'
import { CommonHeading } from '../../components'
import { useLoaderData } from 'react-router-dom';
import { axiosFetchProducts } from '../../utils/axiosFetch';
import { ProductsContainer } from '../../components';


// export const loader = async () => {
//   try {
//     const res = await axiosFetchProducts.get("/products");
//     console.log(res.data);
//     const products = res.data;
//     return { products };
//   } catch (error) {
//     console.error("Error fetching products:", error);
//   }
// };


const ManageProducts = () => {
  // const { products } = useLoaderData();
  return (
    <div className='ml-64 align-elements'>
      <CommonHeading title='Manage Products' />
      <ProductsContainer />
    </div>
  )
}

export default ManageProducts