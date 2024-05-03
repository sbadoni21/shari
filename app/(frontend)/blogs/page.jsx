"use client";
import React, { useState, useEffect } from "react";

import BlogSection from "@/components/frontend/BlogSection";

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
      <BlogSection />
    </div>
  );
};

export default HomePage;
