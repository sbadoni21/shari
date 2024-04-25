"use client";
import React, { useState, useEffect } from "react";
import Loader from "./Loading";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FaRegHeart } from "react-icons/fa";
import Space16 from "../backend/Space16";
import { getDocs, query, collection, orderBy } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import Link from "next/link";
const HomeProductSection = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "product"));
        console.log("Query snapshot:", querySnapshot.docs);

        const productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(productsData);
        setProducts(productsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    fetchProducts();
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
        <div className="text-6xl allura text-[#FDCCE0]">
          Best Products for you
        </div>
        <FaRegHeart className="text=[#FDCCE0] text-4xl " />
      </div>
      <Space16 />
      <Space16 />
      {loading && (
        <div
          className="w-full h-full"
          style={{
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
          className="ml-20 mr-20"
        >
          {products.map((item, index) => (
            <Link
              href={`/products/${item.id}`}
              className="shadow-lg rounded-2xl"
            >
              <div className="shadow-lg shadow-slate-300 rounded-2xl overflow-hidden bg-slate-100  mx-4 my-6 flex-col h-96 w-72">
                <img
                  src={item.imgURL}
                  alt={`Image`}
                  key={item.imgURL.key}
                  className="h-4/6 object-cover"
                />
                <div className="text-start ml-2 mt-2 ">
                  <p className="text-base text-wrap text-slate-700">
                    {item.title}
                  </p>

                  <p className="text-base text-wrap text-slate-700">
                    Price : {item.price}
                  </p>
                  <p className="text-base text-wrap text-slate-700">
                    Rating : {item.rating}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </Carousel>
      )}

      <div className="flex justify-center items-center">
        <Link href="/products" className="text-2xl allura text-white p-16">
          <div className=" flex justify-center items-center pt-3  pb-2 pr-4 pl-4 h-12 rounded-3xl bg-pink-300">
            See all...
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HomeProductSection;
