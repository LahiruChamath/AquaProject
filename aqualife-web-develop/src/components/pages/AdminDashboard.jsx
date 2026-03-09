import React from "react";
import { Outlet } from "react-router-dom";
import AdminSideBar from "../organisms/Admin/AdminSideBar";

const AdminDashboard = () => {
  const user =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySW5mbyI6eyJ1c2VySWQiOiI2NTM1MzE4OWY3NThlNDBlOTZjZDI3ZGUiLCJyb2xlIjoiYWRtaW4ifSwiaWF0IjoxNjk3OTk0MjM4LCJleHAiOjE2OTgwMTIyMzh9.ZDeImnlFMfPGsFbEwiWxS08eDemsXKBBwqdnyra4vcY";

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
