import Link from 'next/link';
import { FiHome, FiBox, FiTag, FiUser, FiGift,  } from 'react-icons/fi';
import { GiFarmTractor } from "react-icons/gi";
import { GiFireplace } from "react-icons/gi";
import { FaPeopleCarry } from "react-icons/fa";

import React from 'react';

export const SideNavBar = () => {
  return (
    <div className="bg-slate-800 min-h-full top-0 fixed w-1/5 ">
      <Link href="#">
        <div className="flex items-center justify-center py-4">
          <span className="text-white text-lg font-bold">Logo</span>
        </div>
      </Link>
      <div className="flex flex-col space-y-4">
        <Link href="#">
          <div className="flex items-center px-4 py-2 text-white hover:bg-gray-700">
            <FiHome className="mr-2" /> 
            <span>Home</span>
          </div>
        </Link>
        <Link href="#">
          <div className="flex items-center px-4 py-2 text-white hover:bg-gray-700">
            <FiBox className="mr-2" /> 
            <span>Catalogue</span>
          </div>
        </Link>
        <Link href="/dashboard/product">
          <div className="flex items-center px-4 py-2 text-white hover:bg-gray-700">
            <FiTag className="mr-2" /> 
            <span>Products</span>
          </div>
        </Link>
        <Link href="/dashboard/tags">
          <div className="flex items-center px-4 py-2 text-white hover:bg-gray-700">
            <FiUser className="mr-2" /> 
            <span>Tags</span>
          </div>
        </Link>
        <Link href="#">
          <div className="flex items-center px-4 py-2 text-white hover:bg-gray-700">
            <FiGift className="mr-2" /> 
            <span>Coupons</span>
          </div>
        </Link>
        <Link href="#">
          <div className="flex items-center px-4 py-2 text-white hover:bg-gray-700">
            <GiFireplace className="mr-2" /> 
            <span>Markets</span>
          </div>
        </Link>
        <Link href="#">
          <div className="flex items-center px-4 py-2 text-white hover:bg-gray-700">
            <GiFarmTractor className="mr-2" /> 
            <span>Farmers</span>
          </div>
        </Link>
        <Link href="#">
          <div className="flex items-center px-4 py-2 text-white hover:bg-gray-700">
            <FaPeopleCarry className="mr-2" /> 
            <span>Staff</span>
          </div>
        </Link>
      </div>
    </div>
  );
};
