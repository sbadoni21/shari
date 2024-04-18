import Link from "next/link";
import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosNotifications } from "react-icons/io";
import { TbSquareRounded } from "react-icons/tb";

const TopNavBar = () => {
  return (
    <div className="flex justify-between items-center pt-4 pb-4 pr-10 pl-10 bg-slate-950 fixed w-4/5 backdrop-filter backdrop-blur-sm h-16">
      <Link href="#">
          <GiHamburgerMenu className="mr-2 text-white" /> 
      </Link>
 <div className='flex space-x-3' >   <Link href="#">
          <IoIosNotifications className="text-white " /> 
        </Link>
        <Link href="#">
          <GiHamburgerMenu className="text-white " /> 
        </Link>

        <Link href="#">
          <TbSquareRounded className="text-white " /> 
        </Link></div>
     
 
    </div>
  );
};

export default TopNavBar;
