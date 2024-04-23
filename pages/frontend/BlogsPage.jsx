"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Space16 from "@/components/backend/Space16";
import { getDocs, query, collection, orderBy, where } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import Image from "next/image";
const BlogsPage = () => {
  const currentPage = usePathname();
  const pathArray = currentPage.split("/");
  const uniqueID = pathArray[pathArray.length - 1];
  console.log(uniqueID);

  const [routineData, setRoutineData] = useState();

  useEffect(() => {
    const fetchRoutineData = async () => {
      const querySnapshot = await getDocs(
        query(collection(db, "routines"), where("uid", "==", uniqueID))
      );
      if (!querySnapshot.empty) {
        const data = querySnapshot.docs.map((doc) => {
          const routine = doc.data();

          return {
            title: routine.title,
            uid: routine.uid,
            description: routine.description,
            heroImage: routine.heroImage,
            timestamp: routine.timestamp,
            content: routine.content,
          };
        });
        console.log(data);
        setRoutineData(data[0]);
      }
    };

    fetchRoutineData();
  }, []);

  const sortedContent = routineData?.content.sort((a, b) => a.sno - b.sno);

  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${routineData?.heroImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        className="w-full h-[70vh] pl-20 pr-20 pt-20 pb-20  text-pink-500 text-center lemonada z-10"
      >
        <Space16 />
        <Space16 />
        {!routineData ? (
          <></>
        ) : (
          <>
            <div className="text-6xl allura text-white">
              {routineData.title}
            </div>
            <div className="text-6xl allura text-white">
              {routineData.description}
            </div>
          </>
        )}
      </div>

      <div className="p-5 md:p-20 space-y-5 w-[80vw]">
        {sortedContent?.map((item, index) => {
          switch (item.type) {
            case "paragraph":
              return (
                <div key={index} className="space-y-3 text-[20px] ">
                  <h3>{item.heading}</h3>
                  <p>{item.content}</p>
                  <p>
                    <i className="text-red-300">{item.italicLine}</i>
                  </p>
                </div>
              );
            case "list":
              return (
                <div key={index} >
                  <h3>{item.heading}</h3>
                  <ul className="p-5">
                    {item.listItems.map((listItem, listItemIndex) => (
                      <li
                        key={listItemIndex}
                        className="text-red-300 font-semibold text-[20px]"
                      >
                        {listItemIndex + 1}. {listItem.heading} :
                        <span className="pl-3 text-black font-normal text-[18px]">
                          {listItem.content}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            case "bigHighlightedLine":
              return <div key={index} className=" bg-red-300 w-fit px-2">{item.content}</div>;
            case "smallItalicLine":
              return <div key={index}> <i className="text-red-300">{item.content}</i></div>;
            case "gallery":
              return (
                <div key={index}>
                  <h3>{item.heading}</h3>
                  {!item.imgUrls ? (
                    <></>
                  ) : (
                    <div>
                      {item.imgURLs.map((imgUrl, imgIndex) => (
                        <img
                          key={imgIndex}
                          src={imgUrl}
                          alt={`Image ${imgIndex}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            case "steps":
              return (
                <div key={index}>
                  <h2>{item.heading}</h2>
                  <ol>
                    {item.steps.map((step, stepIndex) => (
                      <li key={stepIndex}>{step.content}</li>
                    ))}
                  </ol>
                </div>
              );
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
};

export default BlogsPage;
