"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Space16 from "@/components/backend/Space16";
import {
  getDocs,
  query,
  collection,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import TopNavBar from "@/components/frontend/TopNavBar";
import Footer from "@/components/frontend/Footer";
import Link from "next/link";

const ProductDetailsPage = () => {
  const currentPage = usePathname();
  const pathArray = currentPage.split("/");
  const uniqueID = pathArray[pathArray.length - 1];
  console.log(uniqueID);

  const [routineData, setRoutineData] = useState();

  useEffect(() => {
    const fetchRoutineData = async () => {
      const querySnapshot = await getDocs(
        query(collection(db, "product"), where("id", "==", uniqueID))
      );
      console.log(querySnapshot.data);
      if (!querySnapshot.empty) {
        const data = querySnapshot.docs.map((doc) => {
          const routine = doc.data();

          return {
            title: routine.title,
            id: routine.uid,
            description: routine.description,
            imgURL: routine.imgURL,
            timestamp: routine.timestamp,
            rating: routine.rating,
      link: routine.link,

          };
        });
        console.log(data);
        setRoutineData(data[0]);
      }
    };

    fetchRoutineData();
  }, []);
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
      items: 1,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const delay = setTimeout(() => {
      setShowContent(true);
    }, 200);

    return () => clearTimeout(delay);
  }, []);
  return (
    <>
      <TopNavBar />
      <div className="m-20">
        <div className="bg-gray-100 rounded-3xl">
          {routineData ? (
            <div>
              <div className="flex gap-20 text-start justify-start ">
                {" "}
                <img
                  src={routineData.imgURL}
                  alt="Routine Image"
                  className="h-96 w-96 rounded-3xl"
                />
                <div className="flex flex-col gap-4">
            
                  <div className="text-3xl text-black montserrat_Alternates">{routineData.title}</div>
                  <div className="text-sm text-slate-800 montserrat_Alternates">{routineData.description}</div>
                  <div>{routineData.price}</div>
                  <div className="text-sm text-slate-600" >Rating : {routineData.rating}</div>
                  <div className="flex ">
              {" "}
              <Link href={routineData.link} className=" p-2 pr-4 pl-4 bg-[#FDCCE0] rounded-full text-slate-700 text-3xl allura shadow-lg shadow-[#FDCCE0]">
                Link
              </Link>
            </div>
          
                </div>
              </div>
            </div>
          ) : (
            <p>No data available</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetailsPage;
