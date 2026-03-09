import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { Rating } from "@material-tailwind/react";
import { CartContext } from "../../context/CartContext";

const ProductCard = ({ product }) => {
  const { _id, name, price, currency, imgURL, seller, rating = 0, numReviews = 0 } = product || {};

  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent Link navigation if wrapped
    addToCart(product);
  };

  return (
    <div className="rounded-lg pb-4 overflow-hidden border border-gray-200 shadow-lg hover:shadow-blue-300 transition ease-in-out delay-75 bg-white">
      <div className="w-full">
        <div className="relative h-[200px]">
          <img
            src={imgURL || "/placeholder.jpg"}
            alt={name}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="px-4 mt-2">
          <Link to={`/products/${_id}`}>
            <div className="text-black text-base font-medium line-clamp-1">
              {name || "Untitled Product"}
            </div>
          </Link>
          <div className="text-gray-500 text-base">
            {seller?.firstName
              ? `${seller.firstName} ${seller.lastName}`
              : "Unknown Seller"}
          </div>
          <div className="flex justify-between items-end mt-2">
            <div className="flex flex-col gap-1">
              <Rating 
                value={Math.round(rating)} 
                readonly 
                size="sm"
              />
              <span className="text-xs text-gray-400 font-medium">
                {numReviews} {numReviews === 1 ? 'review' : 'reviews'}
              </span>
            </div>
            <div className="text-xl text-blue-500 font-bold whitespace-nowrap">
              {currency || "LKR"} {Number(price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>
          <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
            <Link to={`/products/${_id}`} className="flex-1">
              <button className="w-full rounded-lg bg-blue-500 py-2 text-white hover:bg-blue-600 transition h-full font-medium">
                View
              </button>
            </Link>
            <button
              onClick={handleAddToCart}
              className="rounded-lg bg-green-500 p-2 px-4 text-white hover:bg-green-600 transition flex items-center justify-center min-w-[3rem]"
              title="Add to Cart"
              disabled={product.quantity <= 0}
            >
              <ShoppingCartIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
