import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Component/Navbar";
import { Toaster } from "react-hot-toast";
// import SplashCursor from "../Animation/SplashCursor";


const MainLayout = () => {
  return (
    <div>
      
      {/* <SplashCursor /> */}
      <Navbar></Navbar>
      <div className="w-11/12 mx-auto">
        <Outlet></Outlet>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default MainLayout;
