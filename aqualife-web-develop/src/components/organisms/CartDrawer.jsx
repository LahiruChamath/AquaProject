import { Drawer, IconButton, Typography } from "@material-tailwind/react";
import { useEffect } from "react";

const CartDrawer = ({ openRight, closeDrawerRight }) => {
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
      className="p-4 your-drawer-overlay"
      size={500}
    >
      <div className="mb-6 flex items-center justify-between">
        <Typography
          className="border-b-4 border-b-blue-500"
          variant="h5"
          color="blue-gray"
        >
          Shopping Cart
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

      {/* Empty cart state */}
      <div className="w-full flex flex-col items-center justify-center h-64 text-gray-400">
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
      </div>
    </Drawer>
  );
};

export default CartDrawer;
