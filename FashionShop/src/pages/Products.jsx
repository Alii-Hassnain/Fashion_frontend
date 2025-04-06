import { useState, useEffect } from "react";
import { CommonHeading } from "../components";
import { axiosFetchProducts } from "../utils/axiosFetch";
import { ProductsContainer } from "../components";
import { FilterContainer } from "../components/filters";
import { SearchProducts } from "../components";
import hero1 from "../assets/hero1.webp";
import { useLoaderData } from "react-router-dom";
import { handleError, handleSuccess } from "../utils/tostify";

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const searchParams = url.searchParams.toString();
  // console.log(searchParams);

  try {
    const res = await axiosFetchProducts.get(`/products?${searchParams}`);
    //  console.log(res.data.data);
    const products = res.data.data;
    // console.log(products);
    return { products };
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

const Products = () => {
  const [filters, setFilters] = useState({
    search: "",
    gender: "",
    category: "",
    color: "",
    price: null,
    priceMin: null,
    priceMax: null,
    sortBy: "",
  });

  const [appliedFilters, setAppliedFilters] = useState({});
  const [filterKey, setFilterKey] = useState(0);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [count, setCount] = useState(0);

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }));
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        const params = new URLSearchParams();
        Object.keys(appliedFilters).forEach((key) => {
          if (appliedFilters[key]) params.append(key, appliedFilters[key]);
        });

        const res = await axiosFetchProducts.get(
          `/products?${params.toString()}`
        );

        console.log("res from search api : ", res.data);
        const result = res.data;

        if (result.success === true) {
          handleSuccess(result.message);
          setProducts(result.data);
          setSuccess(result.success);
          setCount(result.count);
          console.log("products is : ", products);
        } else if (result.success !== true) {
          handleError("No products found");
          setProducts([]);
          setSuccess(result.success);
          setCount(result.count);
        } else {
          setProducts([]);
          setSuccess(result.success);
          setCount(result.count);
          handleError("No products found");
          console.log("No products found");
         
          
        }

      } catch (error) {
        handleError("No products found");
        // handleError(error.message);
        console.error("Error fetching products:", error);
      
      } finally {
        setLoading(false);
      }
    };

    if (Object.keys(appliedFilters).length > 0) {
      fetchProducts();
    }

    console.log(
      "applied filter in filter component  in use effect : ",
      appliedFilters
    );
  }, [appliedFilters]);

  // const applyFilters = () => {
  //   if (filters) {
  //     setAppliedFilters({ ...filters });
  //   } else {
  //     setAppliedFilters({});
  //   }
  // };

  const applyFilters = () => {
    if (Object.keys(filters).some((key) => filters[key])) {
      setAppliedFilters({ ...filters });
      setIsFilterApplied(true);
    }
  };
  const removeFilters = () => {
    setFilters({
      search: "",
      gender: "",
      category: "",
      color: "",
      price: "",
      priceMin: "",
      priceMax: "",
      sortBy: "",
    });
    setAppliedFilters({});
    setIsFilterApplied(false);
    setFilterKey((prev) => prev + 1);
    // setProducts([]);
    setSuccess(false);
    setCount(0);
  };
  return (
    <div>
      <div className="w-full h-full bg-blue-50">
        <img
          className="object-cover object-right-bottom w-full h-60"
          src={hero1}
          alt="hero1"
        />
      </div>
      <div className="align-elements mt-3">
        <SearchProducts
          onSearchChange={(search) => handleFilterChange("search", search)}
        />
        <CommonHeading title="Products" />

        <div className="flex flex-row gap-5  " >
        

          <FilterContainer
            key={filterKey}
            onGenderChange={(value) => handleFilterChange("gender", value)}
            onCategoryChange={(value) => handleFilterChange("category", value)}
            onColorChange={(value) => handleFilterChange("color", value)}
            onPriceChange={(value) => {
              handleFilterChange("price", value);
              //  handleFilterChange("priceMin", min);
              // handleFilterChange("priceMax", max);
            }}
            onSortChange={(value) => handleFilterChange("sort", value)}
            filters={filters}
            applyFilters={applyFilters}
            removeFilters={removeFilters}
            isFilterApplied={isFilterApplied}
          />
          <ProductsContainer
            product={products}
            loading={loading}
            resetFilters={removeFilters}
            success={success}
            count={count}
          />
          
        </div>
      </div>
    </div>
  );
};

export default Products;
