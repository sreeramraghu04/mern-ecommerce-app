import React from "react";

const Footer = () => {
  return (
    <div className="bg-[#0B0F1A]">
      <footer className="w-full max-w-screen-xl mx-auto text-center py-4 sm:py-6 px-4 border-t border-gray-800 text-sm sm:text-base text-gray-400">
        © 2025 –{" "}
        <a
          className="font-semibold hover:text-gray-300"
          href="https://sreeramraghu.online/"
        >
          Ram's
        </a>{" "}
        MernMart
      </footer>
    </div>
  );
};

export default Footer;
