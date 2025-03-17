import React from 'react'
import ProductsGridView from './ProductsGridView'
import ProductsListView from './ProductsListView'
import ProductsTestView from './ProductsTestView'

const ProductsContainer = ({product,loading}) => { 
  return (
    <div>
        <ProductsGridView product={product}loading={loading}/>
    </div>
  )
}

export default ProductsContainer