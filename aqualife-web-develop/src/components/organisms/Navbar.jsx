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
    if (searchQuery.trim().length > 0) {
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
            className="group flex items-center gap-3 bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-blue-500/40 border border-blue-300/30 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <ShoppingCartIcon className="h-6 w-6 text-white group-hover:scale-110 transition-transform duration-300" />
            <p className="font-bold tracking-wide">View Cart</p>
          </button>

          {isLoggedIn ? (
            <div className="relative group z-50">
              <div className="flex items-center gap-3 bg-white py-2 px-5 rounded-full shadow-md text-blue-900 border border-blue-100 min-w-max cursor-pointer hover:bg-gray-50 transition">
                <UserCircleIcon className="h-10 w-10 text-blue-500" />
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Welcome back</span>
                  <span className="text-sm font-extrabold truncate max-w-[150px]">
                    {userInfo ? `${userInfo.firstName} ${userInfo.lastName}` : "User"}
                  </span>
                </div>
              </div>
              
              {/* Dropdown Menu on Hover */}
              <div className="absolute right-0 top-full mt-2 w-full bg-white rounded-lg shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50 font-medium text-sm transition"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link
              to={LOGIN_PATH}
              className="bg-blue-500 p-4 px-16 border-2 border-blue-500 flex space-x-3 rounded-lg transition ease-in-out delay-75 hover:bg-blue-600"
            >
              <p className="text-white font-medium">Login</p>
            </Link>
          )}
        </div>
      </div>
      <div className="flex justify-between items-center mt-10 space-x-5">
        
        {/* Real-time Search Form */}
        <div className="w-full relative" ref={searchRef}>
          <form onSubmit={handleSearchSubmit} className="flex space-x-5 w-full">
            <div className="w-full relative group">
              <input
                className="w-full py-4 pl-6 pr-14 rounded-2xl outline-none shadow-[0_8px_30px_rgb(0,0,0,0.06)] text-gray-700 bg-white border border-gray-100 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-400 transition-all duration-300"
                placeholder="Search for products, fishes, accessories..."
                type="text"
                value={searchQuery}
                onFocus={() => { if(searchResults.length > 0) setShowDropdown(true); }}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <MagnifyingGlassIcon className="h-6 w-6 text-gray-400 absolute right-5 top-1/2 transform -translate-y-1/2 group-focus-within:text-blue-500 transition-colors duration-300" />
            </div>
            <button
              className="px-10 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 transform hover:-translate-y-0.5 border border-blue-400/20"
              type="submit"
            >
              Search
            </button>
          </form>

          {/* Search Dropdown Overlay */}
          {showDropdown && searchQuery.trim().length > 0 && (
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
