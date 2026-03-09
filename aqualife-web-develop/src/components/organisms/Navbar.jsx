import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_PATH } from "../constants";
import CartDrawer from "./CartDrawer";

const Navbar = () => {
  const [openRight, setOpenRight] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const closeDrawerRight = () => setOpenRight(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate(LOGIN_PATH);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="container">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-white text-8xl">Aqualife</h1>
        <div className="flex gap-x-5">
          <button
            onClick={() => setOpenRight(true)}
            className="bg-white p-4 border-2 border-blue-500 flex space-x-3 rounded-lg transition ease-in-out delay-75 animation-pulse"
          >
            <ShoppingCartIcon className="h-6 w-6 text-blue-500 font-medium" />
            <p className="text-blue-500 font-medium">View Shopping Cart</p>
          </button>

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 p-4 px-10 border-2 border-red-500 flex space-x-3 rounded-lg transition ease-in-out delay-75 animation-pulse"
            >
              <p className="text-white font-medium">Logout</p>
            </button>
          ) : (
            <Link
              to={LOGIN_PATH}
              className="bg-blue-500 p-4 px-16 border-2 border-blue-500 flex space-x-3 rounded-lg transition ease-in-out delay-75 animation-pulse"
            >
              <p className="text-white font-medium">Login</p>
            </Link>
          )}
        </div>
      </div>
      <form className="mt-10" onSubmit={handleSearch}>
        <div className="flex space-x-5">
          <div className="w-full">
            <input
              className="w-full p-3 rounded-lg outline-none"
              placeholder="Search for products..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            className="px-20 py-3 rounded-lg transition ease-in-out delay-75 animation-pulse bg-white text-blue-500 border-2 border-blue-500 hover:bg-blue-500 hover:text-white font-medium"
            type="submit"
          >
            Search
          </button>
        </div>
      </form>
      <CartDrawer closeDrawerRight={closeDrawerRight} openRight={openRight} />
    </div>
  );
};

export default Navbar;
