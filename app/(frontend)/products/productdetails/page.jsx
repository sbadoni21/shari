"use client";
import Footer from "@/components/frontend/Footer";
import ImageCarousel from "@/components/frontend/ImageCarousel";
import ProductDetails from "@/components/frontend/ProductDetails";
import TopNavBar from "@/components/frontend/TopNavBar";
import React, { useState, useEffect } from "react";


const ProductDetailsPage = ({data}) => {

  return (<>
      <TopNavBar />
    <div className="w-screen  ">

 <div className="flex mt-28 ">
    <div className="w-[50%]">
    <ImageCarousel/>
    </div>
    <div className="">
    <ProductDetails />
    </div>
 </div>

    </div>
    <Footer/>

    </>
  );
};

export default ProductDetailsPage;
