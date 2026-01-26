import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

const Layout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <NavBar />
      <main className="flex-grow mx-auto">
        <Outlet />
      </main>
      <Footer />
      <Toaster position="top-right" richColors />
    </div>
  );
};

export default Layout;
