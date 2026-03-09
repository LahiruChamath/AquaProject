import { TrashIcon } from "@heroicons/react/24/solid";

const CartItem = ({ src, title, price, onRemove, onQuantityChange }) => {
  return (
    <div className="w-full shadow-md border border-gray-200 hover:shadow-blue-300 transition ease-in-out delay-75 rounded-lg overflow-hidden p-2">
      <div className="relative flex space-x-5">
        <img src={src} alt={title} className="object-cover h-20 w-24 rounded-lg" />
        <div className="flex flex-col justify-between flex-1">
          <div className="line-clamp-2 text-sm">{title || "Product"}</div>
          <div className="w-full text-sm text-blue-500 font-semibold">
            {price ? `${price} Rs` : "—"}
          </div>
        </div>
        <div className="h-20 flex flex-col justify-between">
          <div className="w-full flex justify-end">
            <button
              onClick={onRemove}
              className="bg-red-700 h-9 w-9 border-2 flex justify-center items-center rounded-full"
            >
              <TrashIcon className="h-4 w-4 text-white font-bold mb-1" />
            </button>
          </div>
          <div className="w-full flex justify-end">
            <input
              type="number"
              min={1}
              defaultValue={1}
              onChange={onQuantityChange}
              className="w-20 py-1 rounded-lg outline-none outline-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
