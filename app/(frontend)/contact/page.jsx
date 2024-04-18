"use client";
import React, { useState, useEffect } from "react";
import TopNavBar from "@/components/frontend/TopNavBar";


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


    </div>
  );
};

export default HomePage;
