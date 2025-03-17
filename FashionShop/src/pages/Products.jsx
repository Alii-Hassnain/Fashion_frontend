
import { useState, useEffect } from "react";
import { CommonHeading } from "../components";
import { axiosFetchProducts } from "../utils/axiosFetch";
import { ProductsContainer } from "../components";
import { FilterContainer } from "../components/filters";
import { SearchProducts } from "../components";
import hero1 from "../assets/hero1.webp";
import { useLoaderData } from "react-router-dom";



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
    priceMin: null,
    priceMax: null,
    sortBy: "",
  });

  const [appliedFilters, setAppliedFilters] = useState({});

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to update filters
  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }));
    console.log("filter is :",filters)
  };

  // Fetch products when filters change
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     setLoading(true);
  //     try {
  //       const params = new URLSearchParams();
  //       Object.keys(filters).forEach((key) => {
  //         if (filters[key]) params.append(key, filters[key]);
  //       });

  //       const res = await axiosFetchProducts.get(`/products?${params.toString()}`);
  //       setProducts(res.data.data);

  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchProducts();
  // }, [filters]);
  
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
        console.log("res from search api : ",res.data)
        setProducts(res.data.data);
        console.log("products is : ",products)
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    if (Object.keys(appliedFilters).length > 0) {
      fetchProducts();
    }
    console.log("applied filter in use effect : ", appliedFilters);
  }, [appliedFilters]);

  const applyFilters = () => {
    setAppliedFilters(filters);
    console.log("applied filter in function : ",appliedFilters)
    // Store applied filters before fetching products
  };
  return (
    <div>
      <div className="w-full h-full bg-blue-50">
        <img className="object-cover object-right-bottom w-full h-60" src={hero1} alt="hero1" />
      </div>
      <div className="align-elements mt-3">
        <SearchProducts onSearchChange={(search) => handleFilterChange("search", search)} />
        <CommonHeading title="Products" />

        <div className="flex flex-row ">
          <FilterContainer 
            onGenderChange={(value) => handleFilterChange("gender", value)}
            onCategoryChange={(value) => handleFilterChange("category", value)}
            onColorChange={(value) => handleFilterChange("color", value)}
            onPriceChange={(min, max) => {
              handleFilterChange("priceMin", min);
              handleFilterChange("priceMax", max);
            }}
            onSortChange={(value) => handleFilterChange("sortBy", value)}
            // applyFilters={appliedFilters}
            applyFilters={applyFilters}
          />
          <ProductsContainer product={products} loading={loading}/>
        </div>
      </div>
    </div>
  );
};

export default Products;




// import { useState, useEffect } from "react";
// import { CommonHeading } from "../components";
// import { axiosFetchProducts } from "../utils/axiosFetch";
// import { axiosAdminUrl } from "../utils/axiosFetch";
// import { useLoaderData } from "react-router-dom";
// import { ProductsContainer } from "../components";
// import { FilterContainer, PriceRangeFilter } from "../components/filters"
// import { SearchProducts } from "../components";


// import hero1 from "../assets/hero1.webp";
// import { GenderFilter } from "../components/filters";

// export const loader = async ({ request }) => {
//   const url = new URL(request.url);
//   const searchParams = url.searchParams.toString();
//   console.log(searchParams);

//   try {
//     const res = await axiosFetchProducts.get(`/products?${searchParams}`);
//     console.log(res.data.data);
//     const products = res.data.data;
//     console.log(products);
//     return { products };
//   } catch (error) {
//     console.error("Error fetching products:", error);
//   }
// };

// const Products = () => {
//   return (
//     <div>
//       <div className="w-full h-full bg-blue-50">
//         <img
//           className="object-cover object-right-bottom w-full h-60"
//           src={hero1}
//           alt="hero1"
//         />
//       </div>
//       <div className="align-elements mt-3">
//         {/* <div className="flex flex-row">
//         <PriceRangeFilter/>

//         </div> */}
//         <SearchProducts />
//         <CommonHeading title="Products" />

//         <div className="flex flex-row">
//           {/* <div className="w-64 p-4 bg-base-100 shadow-lg rounded-xl">
//             <h2 className="text-xl font-bold mb-4">Filters</h2>
//             <GenderFilter/>
//           </div> */}

//           <FilterContainer />
//           <ProductsContainer />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Products;
