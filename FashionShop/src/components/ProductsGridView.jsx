import React from 'react'
import { useLoaderData } from 'react-router-dom'

const ProductsGridView = () => {
    const { products } = useLoaderData()
  return (
    <div>
        {products.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-md rounded-md p-4"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-56 object-cover"
              />
              <h2 className="text-lg font-semibold text-gray-800 mt-2">
                {product.title}
              </h2>
              <p className="text-gray-600 mt-2">{product.category}</p>
              <p className="text-gray-800 mt-2">${product.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No products available</p>
      )}
    </div>
  )
}

export default ProductsGridView