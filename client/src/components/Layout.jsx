import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#0B0F1A]">
      <NavBar />
      <main className="flex-grow px-4 sm:px-6 md:px-10">
        <Outlet />
      </main>
      <Footer />
      <Toaster position="top-right" richColors />
    </div>
  );
};

export default Layout;
