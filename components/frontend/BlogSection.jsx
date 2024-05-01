'use client'
import React, { useEffect, useState } from "react";
import { getDocs, query, collection, orderBy } from 'firebase/firestore';
import { db } from '../../firebase/firebase'; 
import Space16 from "../backend/Space16";
import Link from "next/link";

const BlogSection = () => {
  const [routineData, setRoutineData] = useState([]);

  useEffect(() => {
    const fetchRoutineData = async () => {
      const querySnapshot = await getDocs(query(collection(db, "routines")));
      if (!querySnapshot.empty) {
        const data = querySnapshot.docs.map(doc => {
          const routine = doc.data();
          return {
            title: routine.title,
             uid : routine.uid,
              description: routine.description,
              heroImage: routine.heroImage,
              timestamp: routine.timestamp,
              title: routine.title
     
          };
        });
        setRoutineData(data);
      }
    };

    fetchRoutineData();
  }, []);

  return (
    <div className="w-full h-1/2 p-5 md:p-20 bg-gradient-to-t from-[#E499B8] from-10% to-black to-95% text-pink-500 text-center montserrat_Alternates">
      <div className="flex items-center justify-start gap-4  ">
        <div className=" text-4xl md:text-6xl allura text-white">Routines</div>
      </div>
      <Space16 />
      <Space16 />
      <div className="flex gap-10 justify-center items-center">
        {routineData.map((routine, index) => (
          <Link  href={`https://docs.google.com/document/d/1Z7cR4kzYoxwvmiQip6JUnFwco86Jdtbkd-Z_GoiCJRI/edit?usp=sharing` } key={index}  >
          <div key={index} className="w-56 bg-white border-8 border-white p-2">
             <img src={routine.heroImage} alt="Routine Image"                          
 className="" />
             <div className="flex justify-center items-center pt-4">
               {routine.title}
             </div>
             <div className="flex justify-center  items-center pt-4">
               {routine.description}
             </div>
           </div>
           </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogSection;


