import { Drawer, IconButton, Typography } from "@material-tailwind/react";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import CartItem from "./CartItem";

const CartDrawer = ({ openRight, closeDrawerRight }) => {
  const { cartItems, getCartTotal, getCartCount } = useContext(CartContext);

  useEffect(() => {
    if (openRight) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
    return () => {
      document.body.style.overflow = "visible";
    };
  }, [openRight]);

  return (
    <Drawer
      placement="right"
      open={openRight}
      onClose={closeDrawerRight}
      className="p-4 your-drawer-overlay flex flex-col"
      size={500}
    >
      <div className="mb-6 flex items-center justify-between">
        <Typography
          className="border-b-4 border-b-blue-500 flex gap-2 items-center"
          variant="h5"
          color="blue-gray"
        >
          Shopping Cart ({getCartCount()})
        </Typography>
        <IconButton variant="text" color="blue-gray" onClick={closeDrawerRight}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </IconButton>
      </div>

      <div className="w-full flex-1 overflow-y-auto flex flex-col space-y-3 pb-32">
        {cartItems.length === 0 ? (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-16 w-16 mb-4 text-gray-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
            <p className="text-base font-medium">Your cart is empty</p>
            <p className="text-sm mt-1 text-gray-400">Add products to get started</p>
            <Link
              to="/"
              onClick={closeDrawerRight}
              className="mt-6 text-blue-500 border border-blue-500 px-6 py-2 rounded-lg hover:bg-blue-50 transition"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          cartItems.map((item) => (
            <CartItem key={item._id} product={item} />
          ))
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="absolute right-0 bottom-0 w-full p-4 bg-white border-t border-gray-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
          <div className="w-full text-lg font-bold flex justify-between mb-5">
            <span>Total:</span>
            <span className="text-blue-500">
              {cartItems[0]?.currency || "LKR"} {getCartTotal().toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
          <button className="w-full transition hover:bg-blue-600 rounded-lg py-3 bg-blue-500 text-white text-base font-medium">
            Checkout
          </button>
        </div>
      )}
    </Drawer>
  );
};

export default CartDrawer;
