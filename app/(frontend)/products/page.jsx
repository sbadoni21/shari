"use client";
import Footer from "@/components/frontend/Footer";
import TopNavBar from "@/components/frontend/TopNavBar";
import React, { useState, useEffect } from "react";


const HomePage = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const delay = setTimeout(() => {
      setShowContent(true);
    }, 200);

    return () => clearTimeout(delay);
  }, []);

  return (
    <div className="">
        <TopNavBar />
        <Footer/>


    </div>
  );
};

export default HomePage;
