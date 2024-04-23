import Link from "next/link";
import React from "react";

const TopNavBar = () => {
  return (
    <div className="flex justify-center  items-center text-gray-500 allura text-3xl font-bold">
      <div className=" fixed top-0 flex justify-center gap-16 items-center pt-4 pb-4 pr-10 pl-10 bg-transparent w-4/5 rounded-full  w- backdrop-filter backdrop-blur-2xl h-16 z-10">
        <Link href="/">Home</Link>
        <Link href="/products">Products </Link>
        <Link href="/aboutus">About Us </Link>
        <Link href="/contact">Contact us </Link>
      </div>
    </div>
  );
};

export default TopNavBar;
