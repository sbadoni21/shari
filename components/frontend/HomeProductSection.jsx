"use client";
import React, { useState, useEffect } from "react";
import Loader from "./Loading";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
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
      items: 4,
      slidesToSlide: 4,
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
    <div
      style={{ position: "relative" }}
      className="md:h-full w-full  bg-gradient-to-t from-black from-10% to-[#E499B8] to-95%  overflow-hidden"
    >
     <div className="flex items-start justify-start gap-4 p-4 md:pl-24">
      <div className="text-4xl md:text-6xl allura text-white transition-opacity duration-1000 opacity-100 hover:opacity-50">
        Best Products for you
      </div>
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
          partialVisible={false}
          autoPlaySpeed={3000}
          centerMode={true}
          keyBoardControl={true}
          transitionDuration={500}
          removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
          className="pb-10"
        >
          {products.map((item, index) => (
            <Link key={index} href={`/products/${item.id}`}>
              <div className="shadow-xl shadow-gray-700 rounded-2xl overflow-hidden  mx-4 my-6 flex-col  montserrat_Alternates md:h-[460px] bg-black text-white justify-between">
                <img
                  src={item.imgURL}
                  alt={`Image`}
                  key={item.imgURL.key}
                  className="h-4/6 w-full object-center object-cover"
                />
                <div className="text-start m-4 text text-sm  md:text-base ">
                  <p className="text-slate-700">{item.title}</p>
                  <Space16 />

                  <p className="text-sm  md:text-base text-slate-700 text-primary">
                    Rating : {item.rating}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </Carousel>
      )}

      <div className=" flex justify-center items-center pb-2 ">
        {" "}
        <Link href="/products" className="">
          <div className=" pt-3 text-2xl allura bg-gradient-to-r shadow-2xl shadow-gray-600 from-[#E499B8] from-10% to-black to-95% text-white p-16 pb-2 pr-4 pl-4 rounded-3xl bg-pink-300">
            See all...
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HomeProductSection;
