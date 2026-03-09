import { Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../organisms/Navbar";
import ProductCard from "../organisms/ProductCard";
import { getAllProducts, searchProducts } from "../../services/product_service";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchParams] = useSearchParams();
  const query = searchParams.get("search");

  useEffect(() => {
    setLoading(true);
    setError("");

    if (query) {
      searchProducts(query)
        .then((res) => {
          if (res?.data?.result) {
            setProducts(res.data.products);
          } else {
            setError("Failed to fetch search results.");
          }
        })
        .catch(() => setError("Network error. Could not search products."))
        .finally(() => setLoading(false));
    } else {
      getAllProducts()
        .then((res) => {
          if (res?.data?.result) {
            setProducts(res.data.products);
          } else {
            setError("Failed to load products.");
          }
        })
        .catch(() => setError("Network error. Could not fetch products."))
        .finally(() => setLoading(false));
    }
  }, [query]);

  const renderProducts = (list) => {
    if (loading) {
      return (
        <div className="col-span-4 text-center text-gray-500 py-10">
          Loading products...
        </div>
      );
    }
    if (error) {
      return (
        <div className="col-span-4 text-center text-red-400 py-10">{error}</div>
      );
    }
    if (!list.length) {
      return (
        <div className="col-span-4 text-center text-gray-400 py-10">
          No products available yet.
        </div>
      );
    }
    return list.map((product) => (
      <ProductCard key={product._id} product={product} />
    ));
  };

  return (
    <div>
      <div className="products w-full h-[400px] bg-center bg-cover bg-no-repeat flex items-center">
        <Navbar />
      </div>
      <div className="container my-20">
        {query ? (
          <>
            <div className="flex mb-16">
              <Typography
                className="border-b-4 border-b-blue-500 text-4xl font-medium"
                color="blue-gray"
              >
                Search Results for "{query}"
              </Typography>
            </div>
            <div className="grid grid-cols-4 gap-20">
              {renderProducts(products)}
            </div>
          </>
        ) : (
          <>
            <div className="flex mb-16">
              <Typography
                className="border-b-4 border-b-blue-500 text-4xl font-medium"
                color="blue-gray"
              >
                Trending products
              </Typography>
            </div>
            <div className="grid grid-cols-4 gap-20">
              {renderProducts(products.slice(0, 4))}
            </div>

            <div className="flex mb-16 mt-20">
              <Typography
                className="border-b-4 border-b-blue-500 text-4xl font-medium"
                color="blue-gray"
              >
                Recently added products
              </Typography>
            </div>
            <div className="grid grid-cols-4 gap-20">
              {renderProducts(products.slice(0, 8))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Products;
