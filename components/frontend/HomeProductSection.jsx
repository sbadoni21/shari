"use client";
import React from "react";
import Loader from "./Loading";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FaRegHeart } from "react-icons/fa";
import Space16 from "../backend/Space16";

const HomeProductSection = () => {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <div style={{ position: "relative" }} className="h-full w-full">
      <div className="flex items-center justify-start gap-4 pl-24">
        <div className="text-5xl allura text-pink-400">
          Best Products for you
        </div>
        <FaRegHeart className="text-pink-400 text-4xl " />
      </div>
      <Space16 />
      <Space16 />
      {loading && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loader />
        </div>
      )}
      {!loading && (
        <Carousel
          responsive={responsive}
          draggable={true}
          swipeable={true}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={3000}
          centerMode={true}
          keyBoardControl={true}
          transitionDuration={500}
          removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
          containerClass="carousel-container"
          itemClass="carousel-item"
        >
          <div>
            <img src="image1.jpg" alt="Image 1" />
            <p>Legend 1</p>
          </div>
          <div>
            <img src="image2.jpg" alt="Image 2" />
            <p>Legend 2</p>
          </div>
          <div>
            <img src="image3.jpg" alt="Image 3" />
            <p>Legend 3</p>
          </div>
        </Carousel>
      )}{" "}
      <div className="flex justify-center items-center">
        <Space16 />
        <div className="text-2xl allura text-white">
          <div className=" flex justify-center items-center pt-3  pb-2 pr-4 pl-4 h-12 rounded-3xl bg-pink-300">
            {" "}
            See all...
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeProductSection;
