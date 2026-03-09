import React from "react";
import { Outlet } from "react-router-dom";
import AdminSideBar from "../organisms/Admin/AdminSideBar";

const AdminDashboard = () => {
  return (
    <div className="w-full flex">
      <AdminSideBar />
      <div className="h-screen w-full overflow-y-auto">
        <div className="w-full p-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
