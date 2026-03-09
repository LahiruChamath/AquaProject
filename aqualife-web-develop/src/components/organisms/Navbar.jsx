import { ShoppingCartIcon, UserCircleIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_PATH, USER_ROLES } from "../constants";
import CartDrawer from "./CartDrawer";
import { searchProducts } from "../../services/product_service";
import { getspecificUserDetails } from "../../services/user_service";

const Navbar = () => {
  const [openRight, setOpenRight] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const searchRef = useRef(null);
  
  const closeDrawerRight = () => setOpenRight(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const isLoggedIn = !!token;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate(LOGIN_PATH);
  };

  const decodeToken = (t) => {
    try {
      const base64Url = t.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
    if (isLoggedIn && role === USER_ROLES.CUSTOMER && token) {
      const decoded = decodeToken(token);
      if (decoded?.UserInfo?.userId) {
        getspecificUserDetails(decoded.UserInfo.userId)
          .then((res) => {
            if (res?.data?.result) {
              setUserInfo(res.data.user);
            }
          })
          .catch((err) => console.log("Failed to fetch user info", err));
      }
    }
  }, [isLoggedIn, role, token]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      setIsSearching(true);
      setShowDropdown(true);
      
      const delayDebounceFn = setTimeout(() => {
        searchProducts(searchQuery)
          .then((res) => {
            if (res?.data?.result) {
              setSearchResults(res.data.products.slice(0, 5)); // show max 5
            }
          })
          .finally(() => setIsSearching(false));
      }, 300);

      return () => clearTimeout(delayDebounceFn);
    } else {
      setSearchResults([]);
      setShowDropdown(false);
    }
  }, [searchQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setShowDropdown(false);
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
      <div className="flex justify-between items-center mt-10 space-x-5">
        
        {/* Customer Info Section (If logged in as customer) */}
        {isLoggedIn && role === USER_ROLES.CUSTOMER && userInfo && (
          <div className="flex items-center gap-3 bg-white bg-opacity-10 py-2 px-4 rounded-xl border border-white border-opacity-20 text-white min-w-max">
            <UserCircleIcon className="h-10 w-10 text-blue-200" />
            <div className="flex flex-col">
              <span className="text-xs text-blue-100 uppercase tracking-wider font-semibold">Welcome back,</span>
              <span className="text-sm font-bold truncate max-w-[150px]">{userInfo.firstName} {userInfo.lastName}</span>
            </div>
          </div>
        )}

        {/* Real-time Search Form */}
        <div className="w-full relative" ref={searchRef}>
          <form onSubmit={handleSearchSubmit} className="flex space-x-5 w-full">
            <div className="w-full relative">
              <input
                className="w-full p-4 rounded-xl outline-none shadow-sm pr-12 border-2 border-transparent focus:border-blue-300 transition"
                placeholder="Search for products, fishes, accessories..."
                type="text"
                value={searchQuery}
                onFocus={() => { if(searchResults.length > 0) setShowDropdown(true); }}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <MagnifyingGlassIcon className="h-6 w-6 text-gray-400 absolute right-4 top-1/2 transform -translate-y-1/2" />
            </div>
            <button
              className="px-14 py-3 rounded-xl transition ease-in-out delay-75 bg-white text-blue-500 border-2 border-blue-500 hover:bg-blue-600 hover:text-white hover:border-blue-600 font-bold shadow-sm"
              type="submit"
            >
              Search
            </button>
          </form>

          {/* Search Dropdown Overlay */}
          {showDropdown && searchQuery.trim().length > 1 && (
            <div className="absolute top-16 left-0 w-[calc(100%-180px)] bg-white rounded-xl shadow-2xl p-2 z-50 border border-gray-100 overflow-hidden">
              {isSearching ? (
                <div className="text-center p-4 text-gray-400 text-sm">Searching...</div>
              ) : searchResults.length > 0 ? (
                <div className="flex flex-col space-y-1">
                  {searchResults.map((prod) => (
                    <Link
                      key={prod._id}
                      to={`/products/${prod._id}`}
                      onClick={() => {
                        setShowDropdown(false);
                        setSearchQuery("");
                      }}
                      className="flex items-center gap-4 p-2 hover:bg-blue-50 transition rounded-lg"
                    >
                      <img src={prod.imgURL} alt={prod.name} className="w-12 h-12 object-cover rounded-md bg-gray-50 border border-gray-100" />
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-800 line-clamp-1">{prod.name}</span>
                        <span className="text-xs text-blue-500 font-semibold">{prod.currency || "LKR"} {prod.price}</span>
                      </div>
                    </Link>
                  ))}
                  <button 
                    onClick={handleSearchSubmit}
                    className="w-full text-center text-sm font-bold text-blue-500 p-2 mt-1 hover:bg-gray-50 rounded-lg"
                  >
                    View all results for "{searchQuery}"
                  </button>
                </div>
              ) : (
                <div className="text-center p-4 text-gray-400 text-sm">No products found matching "{searchQuery}"</div>
              )}
            </div>
          )}
        </div>
      </div>
      <CartDrawer closeDrawerRight={closeDrawerRight} openRight={openRight} />
    </div>
  );
};

export default Navbar;
