import { PowerIcon, ShoppingBagIcon } from "@heroicons/react/24/solid";
import { Card, List, Typography } from "@material-tailwind/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LOGIN_PATH, SELLER_PRODUCTS_PATH } from "../../constants";

const SellerSideBar = () => {
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("token");
    navigate(LOGIN_PATH);
  };
  const location = useLocation();
  return (
    <Card className="h-[100vh] bg-blue-500 w-full max-w-[20rem] p-4 shadow-xl shadow-blue-500 rounded-none">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="white">
          Aqualife Seller
        </Typography>
      </div>
      <List>
        <Link
          to={SELLER_PRODUCTS_PATH}
          className={`cursor-pointer flex items-center group rounded-lg hover:bg-white text-blue-500 hover:text-blue-500 focus:text-blue-500 ${
            location.pathname === SELLER_PRODUCTS_PATH
              ? "bg-white text-blue-500 focus:text-blue-500"
              : "text-white"
          }  p-3 transition ease-in-out delay-75 duration-100`}
        >
          <ShoppingBagIcon
            className={`h-5 w-5 group-hover:text-blue-500 ${
              location.pathname === SELLER_PRODUCTS_PATH
                ? "text-blue-500 focus:text-blue-500"
                : "text-white"
            }  mr-4`}
          />
          Products
        </Link>
        <div
          onClick={logOut}
          className="cursor-pointer flex items-center rounded-lg bg-none hover:bg-white p-3 text-white group  hover:text-blue-500 focus:text-blue-500"
        >
          <PowerIcon className="h-5 w-5 text-white group-hover:text-blue-500 focus:text-blue-500 mr-4" />
          Log Out
        </div>
      </List>
    </Card>
  );
};

export default SellerSideBar;
