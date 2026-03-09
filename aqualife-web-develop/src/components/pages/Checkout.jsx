import { Typography } from "@material-tailwind/react";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../organisms/Navbar";
import { CartContext } from "../../context/CartContext";

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    // In a real application, you'd send this to a payment gateway/backend
    alert("Order placed successfully!");
    clearCart();
    navigate("/");
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="bg-blue-500 pb-16 pt-5">
        <Navbar />
      </div>

      <div className="container mx-auto mt-10">
        <Typography variant="h3" color="blue-gray" className="mb-8">
          Checkout
        </Typography>

        {cartItems.length === 0 ? (
          <div className="bg-white p-10 rounded-xl shadow-sm text-center">
            <Typography variant="h5" color="blue-gray" className="mb-4">
              Your cart is empty
            </Typography>
            <Link
              to="/"
              className="mt-4 inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left side - Billing Form */}
            <div className="flex-1 bg-white p-6 rounded-xl shadow-sm">
              <Typography variant="h5" color="blue-gray" className="mb-6">
                Billing Details
              </Typography>
              <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:border-blue-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name *
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:border-blue-500 text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    required
                    type="email"
                    className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:border-blue-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Shipping Address *
                  </label>
                  <textarea
                    required
                    rows="3"
                    className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:border-blue-500 text-sm"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City *
                  </label>
                  <input
                    required
                    type="text"
                    className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:border-blue-500 text-sm"
                  />
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <Typography variant="h6" color="blue-gray" className="mb-4">
                    Payment Method
                  </Typography>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex items-center gap-3">
                    <input
                      type="radio"
                      id="cod"
                      name="payment"
                      value="cod"
                      defaultChecked
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <label htmlFor="cod" className="text-sm font-medium text-gray-700 cursor-pointer">
                      Cash on Delivery
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-6 bg-blue-500 hover:bg-blue-600 transition text-white font-bold py-3 px-4 rounded-lg text-lg flex justify-center items-center gap-2 shadow-md"
                >
                  Place Order
                </button>
              </form>
            </div>

            {/* Right side - Order Summary */}
            <div className="w-full lg:w-96">
              <div className="bg-white p-6 rounded-xl shadow-sm sticky top-10">
                <Typography variant="h5" color="blue-gray" className="mb-6">
                  Order Summary
                </Typography>

                <div className="flex flex-col space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2">
                  {cartItems.map((item) => (
                    <div key={item._id} className="flex justify-between items-center text-sm border-b border-gray-100 pb-3">
                      <div className="flex items-center gap-3 flex-1 overflow-hidden">
                        <img 
                          src={item.imgURL} 
                          alt={item.name} 
                          className="w-12 h-12 object-cover rounded-md bg-gray-50 border border-gray-100 flex-shrink-0"
                        />
                        <div>
                          <p className="font-medium text-gray-800 line-clamp-1">{item.name}</p>
                          <p className="text-gray-500 text-xs mt-0.5">Qty: {item.cartQuantity}</p>
                        </div>
                      </div>
                      <div className="font-semibold text-gray-800 ml-4 whitespace-nowrap">
                        {item.currency || "LKR"} {(item.price * item.cartQuantity).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 text-sm pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>LKR {getCartTotal().toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-3 border-t border-gray-200 text-blue-500">
                    <span>Total</span>
                    <span>LKR {getCartTotal().toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
