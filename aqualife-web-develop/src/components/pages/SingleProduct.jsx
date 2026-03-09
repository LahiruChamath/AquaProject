import { ArrowSmallLeftIcon, ShoppingCartIcon } from "@heroicons/react/24/solid";
import { Button, Chip, Rating, Spinner } from "@material-tailwind/react";
import { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { getProduct } from "../../services/product_service";
import { PRODUCTS_PATH } from "../constants";
import { CartContext } from "../../context/CartContext";

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    if (!id) return;
    getProduct(id)
      .then((res) => {
        if (res?.data?.result) {
          setProduct(res.data.product);
        } else {
          setError("Product not found.");
        }
      })
      .catch(() => setError("Network error. Could not load product."))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="single-product min-h-screen w-screen bg-center bg-cover bg-no-repeat flex justify-center items-center">
      <div className="container w-9/12">
        <div className="bg-opacity-30 backdrop-blur-md bg-white p-7 rounded-2xl shadow-xl">
          <Link to={PRODUCTS_PATH}>
            <Button
              color="white"
              variant="outlined"
              className="flex items-center gap-3"
            >
              <ArrowSmallLeftIcon className="h-4 w-4" />
              Go back
            </Button>
          </Link>

          {loading && (
            <div className="w-full flex justify-center items-center h-64">
              <Spinner className="h-10 w-10" />
            </div>
          )}

          {error && (
            <div className="w-full text-center text-red-400 mt-10 text-lg">
              {error}
            </div>
          )}

          {!loading && !error && product && (
            <div className="w-full mt-5 flex items-center space-x-10">
              <div className="w-6/12">
                <div className="relative h-[400px] rounded-2xl overflow-hidden">
                  <img
                    src={product.imgURL || "/placeholder.jpg"}
                    alt={product.name}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              <div className="w-6/12 flex flex-col justify-between min-h-[400px]">
                <div>
                  <div className="text-white font-bold text-xl line-clamp-2">
                    {product.name}
                  </div>
                  <p className="text-white text-sm mt-3">
                    {product.description}
                  </p>
                </div>

                <div className="w-full flex flex-col items-center justify-center">
                  <div className="flex w-full justify-center">
                    <div className="w-1/2">
                      <div className="flex flex-col justify-between space-y-3">
                        <div className="flex space-x-3 items-center">
                          <span className="text-white font-medium">
                            Availability :
                          </span>{" "}
                          <Chip
                            color={product.quantity > 0 ? "green" : "red"}
                            value={product.quantity > 0 ? "In stock" : "Out of stock"}
                          />
                        </div>
                        <div className="flex space-x-3 items-center">
                          <span className="text-white font-medium">
                            Quantity :
                          </span>
                          <Chip color="black" value={product.quantity} />
                        </div>
                      </div>
                    </div>
                    <div className="w-1/2">
                      <div className="text-white text-xs">Seller</div>
                      <div className="text-white text-base font-semibold mb-2">
                        {product.seller?.firstName
                          ? `${product.seller.firstName} ${product.seller.lastName}`
                          : "Unknown Seller"}
                      </div>
                      <div className="w-full flex justify-end">
                        <Rating value={4} readonly />
                      </div>
                    </div>
                  </div>
                  <div className="w-full flex justify-end mt-6 gap-4 items-center border-t border-gray-200 pt-4 border-opacity-30">
                    <span className="text-white text-2xl font-bold">
                      {product.currency || "LKR"} {Number(product.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    <button
                      onClick={() => addToCart(product)}
                      disabled={product.quantity <= 0}
                      className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg shadow-lg flex items-center gap-2 transition"
                    >
                      <ShoppingCartIcon className="h-5 w-5" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
