import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { _id, name, price, currency, imgURL, seller } = product || {};

  return (
    <div className="rounded-lg pb-4 overflow-hidden border border-gray-200 shadow-lg hover:shadow-blue-300 transition ease-in-out delay-75">
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
          <div className="flex justify-end text-base w-full text-blue-500 font-semibold">
            {price ? `${price} ${currency || "Rs"}` : "—"}
          </div>
          <Link to={`/products/${_id}`}>
            <button className="w-full rounded-lg bg-blue-500 py-2 text-white mt-5 hover:bg-blue-600 transition">
              View Product
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
