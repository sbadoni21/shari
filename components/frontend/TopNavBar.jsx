'use client'
import Link from "next/link";
import React, { useState, useEffect } from "react";

const TopNavBar = () => {
  const [showMenuButton, setShowMenuButton] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setShowMenuButton(window.innerWidth < 768); 
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleMenuClick = () => {
    setShowMenu(prevState => !prevState); 
  };

  return (
    <>
      {!showMenuButton && (
        <div className="flex justify-center items-center text-white  allura text-3xl font-bold">
          <div className="fixed top-0 flex justify-center gap-16 items-center pt-4 pb-4 pr-10 pl-10 bg-transparent w-4/5 rounded-full backdrop-filter backdrop-blur-2xl h-16 z-10">
            <Link href="/">Home</Link>
            <Link href="/products">Products</Link>
            <Link href="/aboutus">About Us</Link>
            <Link href="/contact">Contact us</Link>
          </div>
        </div>
      )}

      {showMenuButton && (
        <div className="flex justify-center items-center bg-primary">
          <button onClick={handleMenuClick} className="bg-primary hover:bg-blue-700 text-gray-500 allura text-5xl font-bold py-2 px-4 rounded">
            {showMenu ? "x" : "Menu"}
          </button>
        </div>
      )}

      {showMenu && (
        <div className="flex delay-1000 transition-transform  justify-center items-center text-5xl  bg-primary  h-screen ">
          <div className="flex flex-col  h-screen justify-center gap-20  allura  items-center">
          <Link onClick={handleMenuClick} href="/">Home</Link>
            <Link href="/products">Products</Link>
            <Link href="/aboutus">About Us</Link>
            <Link href="/contact">Contact us</Link>
          </div>
        </div>
      )}
    </>
  );
};

export default TopNavBar;
