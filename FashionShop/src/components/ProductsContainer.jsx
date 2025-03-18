import React from "react";
import ProductsGridView from "./ProductsGridView";
import ProductsListView from "./ProductsListView";
import ProductsTestView from "./ProductsTestView";

const ProductsContainer = ({
  product,
  loading,
  resetFilters,
  success,
  count,
}) => {
  return (
    <div>
      <ProductsGridView
        product={product}
        loading={loading}
        resetFilters={resetFilters}
        success={success}
        count={count}
      />
    </div>
  );
};

export default ProductsContainer;
