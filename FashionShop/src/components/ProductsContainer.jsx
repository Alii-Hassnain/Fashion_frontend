import React from 'react'
import ProductsGridView from './ProductsGridView'
import ProductsListView from './ProductsListView'
import ProductsTestView from './ProductsTestView'

const ProductsContainer = () => { 
  return (
    <div>
        {/* user have two options where he likes to view grid or list */}
        <ProductsGridView />
        {/* <ProductsTestView /> */}
        
        {/* <ProductsListView /> */}
    </div>
  )
}

export default ProductsContainer