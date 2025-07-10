import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Component/Navbar";
import { Toaster } from "react-hot-toast";
import Footer from "../Component/Footer";
// import SplashCursor from "../Animation/SplashCursor";


const MainLayout = () => {
  return (
    <div>
      
      {/* <SplashCursor /> */}
      <Navbar></Navbar>
      <div >
        <Outlet></Outlet>
      </div>
      <Footer />
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default MainLayout;
