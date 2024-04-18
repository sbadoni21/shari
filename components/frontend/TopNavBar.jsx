import Link from "next/link";
import React from "react";

const TopNavBar = () => {
  return (
    <div className="flex justify-center items-center text-white allura text-2xl font-bold ">

      <div className=" fixed top-0 flex justify-center gap-16 items-center pt-4 pb-4 pr-10 pl-10 bg-pink-200 w-4/5 rounded-full  w- backdrop-filter backdrop-blur-sm h-16 z-10">
      
    

          <Link href="#">
Home          </Link>
          <Link href="#">
Products          </Link>
          <Link href="#">
About Us          </Link>
<Link href="#">
Contact us        </Link>
  
      </div>
    </div>
  );
};

export default TopNavBar;
