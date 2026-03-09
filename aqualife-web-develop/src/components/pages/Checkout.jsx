import { Typography } from "@material-tailwind/react";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../organisms/Navbar";
import { CartContext } from "../../context/CartContext";
import { createOrder } from "../../services/order_service";

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useContext(CartContext);
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    setIsOrdering(true);

    const formData = new FormData(e.target);
    const orderData = {
      orderItems: cartItems.map(item => ({
        name: item.name,
        qty: item.cartQuantity,
        image: item.imgURL,
        price: item.price,
        product: item._id
      })),
      shippingAddress: {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("email"),
        address: formData.get("address"),
        city: formData.get("city")
      },
      paymentMethod: "Cash on Delivery",
      totalPrice: getCartTotal()
    };

    try {
      const res = await createOrder(orderData);
      if (res.result) {
        setOrderId(res.order._id);
        setOrderSuccess(true);
        clearCart();
      } else {
        alert(res.message || "Failed to place order");
      }
    } catch (err) {
      alert("Something went wrong while placing your order.");
    } finally {
      setIsOrdering(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="bg-blue-500 pb-16 pt-5">
          <Navbar />
        </div>
        <div className="container mx-auto mt-10 text-center">
          <div className="bg-white p-16 rounded-2xl shadow-xl max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <Typography variant="h3" color="blue-gray" className="mb-2">
              Order Successful!
            </Typography>
            <Typography color="gray" className="mb-8 text-lg">
              Thank you for your purchase. Your order has been placed successfully and is being processed.
            </Typography>
            <div className="bg-blue-50 p-4 rounded-lg mb-8 inline-block">
              <Typography variant="h6" color="blue" className="font-mono">
                Order ID: #{orderId}
              </Typography>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-5">
              <Link
                to="/"
                className="bg-blue-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-600 transition shadow-lg shadow-blue-200"
              >
                Back to Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="bg-blue-500 pb-16 pt-5">
        <Navbar />
      </div>

      <div className="container mx-auto mt-10">
        <Typography variant="h3" color="blue-gray" className="mb-8 px-4">
          Checkout
        </Typography>

        {cartItems.length === 0 ? (
          <div className="bg-white p-10 rounded-xl shadow-sm text-center mx-4">
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
          <div className="flex flex-col lg:flex-row gap-8 px-4">
            {/* Left side - Billing Form */}
            <div className="flex-1 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <Typography variant="h5" color="blue-gray" className="mb-8">
                Billing Details
              </Typography>
              <form onSubmit={handleCheckoutSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      required
                      name="firstName"
                      type="text"
                      placeholder="Enter your first name"
                      className="w-full border border-gray-200 rounded-xl p-3.5 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 transition bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      required
                      name="lastName"
                      type="text"
                      placeholder="Enter your last name"
                      className="w-full border border-gray-200 rounded-xl p-3.5 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 transition bg-gray-50"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    required
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full border border-gray-200 rounded-xl p-3.5 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 transition bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Shipping Address *
                  </label>
                  <textarea
                    required
                    name="address"
                    rows="3"
                    placeholder="Enter your full shipping address"
                    className="w-full border border-gray-200 rounded-xl p-3.5 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 transition bg-gray-50"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    required
                    name="city"
                    type="text"
                    placeholder="Enter city"
                    className="w-full border border-gray-200 rounded-xl p-3.5 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 transition bg-gray-50"
                  />
                </div>

                <div className="mt-10 pt-8 border-t border-gray-100">
                  <Typography variant="h6" color="blue-gray" className="mb-5">
                    Payment Method
                  </Typography>
                  <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100 flex items-center gap-4">
                    <input
                      type="radio"
                      id="cod"
                      name="payment"
                      value="cod"
                      defaultChecked
                      className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <label htmlFor="cod" className="text-sm font-bold text-gray-800 cursor-pointer">
                      Cash on Delivery
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isOrdering}
                  className={`w-full mt-8 bg-blue-500 hover:bg-blue-600 transition text-white font-bold py-4 px-6 rounded-2xl text-lg flex justify-center items-center gap-3 shadow-lg shadow-blue-200 ${isOrdering ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isOrdering ? 'Processing...' : 'Place Order'}
                </button>
              </form>
            </div>

            {/* Right side - Order Summary */}
            <div className="w-full lg:w-96">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 sticky top-10">
                <Typography variant="h5" color="blue-gray" className="mb-8">
                  Order Summary
                </Typography>

                <div className="flex flex-col space-y-6 mb-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {cartItems.map((item) => (
                    <div key={item._id} className="flex justify-between items-start text-sm border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                      <div className="flex items-center gap-4 flex-1 overflow-hidden">
                        <img 
                          src={item.imgURL} 
                          alt={item.name} 
                          className="w-14 h-14 object-cover rounded-xl bg-gray-50 border border-gray-50 flex-shrink-0"
                        />
                        <div>
                          <p className="font-bold text-gray-800 line-clamp-1">{item.name}</p>
                          <p className="text-gray-500 text-xs mt-1">Quantity: {item.cartQuantity}</p>
                        </div>
                      </div>
                      <div className="font-bold text-gray-800 ml-4 whitespace-nowrap pt-1">
                        {item.currency || "LKR"} {(item.price * item.cartQuantity).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 pt-6 border-t border-gray-100">
                  <div className="flex justify-between text-gray-600">
                    <span className="font-medium">Subtotal</span>
                    <span className="font-bold">LKR {getCartTotal().toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span className="font-medium">Shipping</span>
                    <span className="text-green-500 font-bold uppercase text-xs tracking-wider bg-green-50 px-2 py-1 rounded">Free</span>
                  </div>
                  <div className="flex justify-between items-center font-bold text-xl pt-4 mt-2 border-t border-gray-100 text-blue-500">
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
