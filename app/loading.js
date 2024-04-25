'use client';
import React from "react";
import animationData from "../public/lottie/loadingLottie.json";
import Lottie from "react-lottie";
const Loading = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="flex justify-center items-center w-full h-full bg-slate-200">
      <div className="w-full h-full">
        {" "}
       Loading...
      </div>
    </div>
  );
};

export default Loading;
