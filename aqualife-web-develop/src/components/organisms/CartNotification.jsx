import React, { useContext } from "react";
import { Typography } from "@material-tailwind/react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { CartContext } from "../../context/CartContext";

const CartNotification = () => {
  const { notification } = useContext(CartContext);

  if (!notification.show) return null;

  return (
    <div className="fixed top-24 right-5 z-[9999] animate-fade-in-down">
      <div className="bg-white border-l-4 border-green-500 shadow-2xl rounded-r-xl p-4 flex items-center gap-4 min-w-[300px] border border-gray-100">
        <div className="bg-green-100 p-2 rounded-full">
          <CheckCircleIcon className="h-6 w-6 text-green-600" />
        </div>
        <div>
          <Typography variant="h6" color="blue-gray" className="leading-tight font-bold">
            Added to Cart
          </Typography>
          <Typography variant="small" color="gray" className="font-medium line-clamp-1">
            {notification.itemName}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default CartNotification;
