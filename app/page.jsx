"use client";
import React, { useState, useEffect } from "react";
import TopNavBar from "@/components/frontend/TopNavBar";
import HeroSection from "@/components/frontend/HeroSection";
import HomeProductSection from "@/components/frontend/HomeProductSection";
import Space16 from "@/components/backend/Space16";

const HomePage = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const delay = setTimeout(() => {
      setShowContent(true);
    }, 200);

    return () => clearTimeout(delay);
  }, []);

  return (
    <div className=" ">
      <TopNavBar />
      <HeroSection />
      <Space16 />
      <HomeProductSection />
    </div>
  );
};

export default HomePage;
