import React from 'react'
import { useLoaderData } from 'react-router-dom';

const AdminProductsGridView = () => {
  const { manageProducts } = useLoaderData();
  return (
    <div>
        {manageProducts.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
          {manageProducts.map((product) => {
            const { _id, product_image,price,title,description} = product;
            console.log(product_image);
            
            return (
              <div
                key={_id}
                className="bg-white shadow-md rounded-md p-4"
              >
                <img
                  src={product_image}
                  alt={title}
                  className="w-full h-56 object-cover"
                />
                <h2 className="text-lg font-semibold text-gray-800 mt-2">
                  {title}
                </h2>
                {/* <p className="text-gray-600 mt-2">{description}</p> */}
                <p className="text-gray-800 mt-2">${price}</p>
                <div className='flex flex-col cursor-pointer gap-2 mt-3'>
                  <p className='text-slate-400 link-hover'>Edit</p>
                  {/* <button className='btn btn-primary'>Edit</button> */}
                  <button 
                  className='btn btn-warning w-full'
                  >Delete</button>
                </div>
              
              </div>
            )
          })}
        </div>
      ) : (
        <p>No products available</p>
      )}
    </div>
  )
}

export default AdminProductsGridView