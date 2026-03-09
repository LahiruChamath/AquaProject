import { useState } from "react";
import { Outlet } from "react-router-dom";
import SellerSideBar from "../organisms/Seller/SellerSideBar";

const SellerDashboard = () => {
  const user = localStorage.getItem("token");

  const [productId, setProductId] = useState(null);

  return (
    <div className="w-full flex">
      <SellerSideBar />
      <div className="h-screen w-full overflow-y-auto">
        <div className="w-full p-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
