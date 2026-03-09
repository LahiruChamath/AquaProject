import { TrashIcon } from "@heroicons/react/24/solid";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

const CartItem = ({ product }) => {
  const { removeFromCart, updateQuantity } = useContext(CartContext);

  const { _id, name, price, currency, imgURL, cartQuantity, quantity: stockLimit } = product;

  return (
    <div className="w-full shadow-sm border border-gray-200 hover:border-blue-300 transition ease-in-out delay-75 rounded-lg overflow-hidden p-2">
      <div className="relative flex space-x-4">
        <img
          src={imgURL || "/placeholder.jpg"}
          alt={name}
          className="object-cover h-24 w-24 rounded-lg bg-gray-50"
        />
        <div className="flex flex-col flex-1 justify-between">
          <div>
            <div className="line-clamp-2 text-sm font-medium text-gray-800">
              {name || "Product"}
            </div>
            <div className="w-full text-sm text-blue-500 font-bold mt-1">
              {price ? `${currency || "LKR"} ${(price * cartQuantity).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "—"}
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Qty:</span>
              <input
                type="number"
                min={1}
                max={stockLimit}
                value={cartQuantity}
                onChange={(e) => updateQuantity(_id, parseInt(e.target.value) || 1)}
                className="w-16 py-1 px-2 border border-gray-200 rounded-md outline-none focus:border-blue-500 text-sm"
              />
            </div>
            <button
              onClick={() => removeFromCart(_id)}
              className="text-red-500 hover:bg-red-50 p-2 rounded-full transition"
              title="Remove from cart"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
