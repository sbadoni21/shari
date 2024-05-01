import React from "react";
import Space16 from "../backend/Space16";
import { BsInstagram } from "react-icons/bs";
import { AiFillYoutube } from "react-icons/ai";

const Footer = () => {
  return (
    <div className="w-full h-1/2  pl-6 md:pl-20 pr-20 pt-20 pb-20 bg-black text-[#77DD77] text-center lemonada  ">
      <div className="flex items-center justify-start gap-4 ">
        <div className="text-6xl allura text-white">Hey Contact Us</div>
      </div>
      <Space16 />
      <Space16 />
      <Space16 />
      <div className="text-xl md:text-3xl text-white"><div className="flex gap-4">
        <div className="">EMAIL:</div>
        <div className="">kuriricloset@gmail.com</div>
      </div>
      <Space16 />
      <div className="flex">
        <div className="">SOCIALS</div>
      </div>
      <Space16 />
      <div className="flex gap-6">
        <BsInstagram className="" />
        <div className="">Instagram</div>
      </div>
      <div className="flex gap-6">
        <AiFillYoutube className="" />
        <div className="">Youtube</div>
      </div></div>
      
    </div>
  );
};

export default Footer;
