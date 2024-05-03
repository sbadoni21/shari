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
        query(collection(db, "routines"), where("id", "==", uniqueID))
      );
      if (!querySnapshot.empty) {
        const data = querySnapshot.docs.map((doc) => {
          const routine = doc.data();

          return {
            title: routine.title,
            id: routine.id,
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
        className="w-full h-[70vh] pl-20 pr-20 pt-40 pb-20  text-pink-500 text-center lemonada z-10"
      >
        <Space16 />
        <Space16 />
        {!routineData ? (
          <></>
        ) : (
          <>
            <p className="text-6xl  allura text-black backdrop-blur-sm backdrop-opacity-90 backdrop-brightness-125 ">
              {routineData.title}
            </p>
            <p className="text-6xl allura text-black backdrop-blur-sm backdrop-opacity-90  backdrop-brightness-125 ">
              {routineData.description}
            </p>
          </>
        )}
      </div>

      <div className="p-5 md:p-20 space-y-1  text-justify">
      {sortedContent?.map((item, index) => {
      switch (item.type) {
        case "paragraph":
          return (
            <div key={index} className="space-y-3 text-[20px]">
              <h3>{item.heading}</h3>
              <p>{item.content}</p>
              <p>
                <i className="text-red-300">{item.italicLine}</i>
              </p>
            </div>
          );
        case "list":
          return (
            <div key={index}>
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
          return (
            <div key={index} className="bg-red-300 w-fit px-2">
              {item.content}
            </div>
          );
        case "smallItalicLine":
          return (
            <div key={index}>
              <i className="text-blue-300 italic">
                {item.content}
              </i>
            </div>
          );
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
        case "quote":
          return (
            <div key={index}>
              <blockquote>
                <p>{item.text}</p>
                <footer>{item.author}</footer>
              </blockquote>
            </div>
          );
        case "caption":
          return (
            <div key={index}>
              <p>{item.text}</p>
            </div>
          );
        case "heading":
          return (
            <div key={index}>
              <p className="text-5xl text-bold">{item.text}</p>
            </div>
          );
        case "tag":
          return (
            <div key={index}>
              <span>{item.text}</span>
            </div>
          );
        case "listItem":
          return (
            <div key={index}>
              <li>{item.text}</li>
            </div>
          );
        case "codeBlock":
          return (
            <div key={index} className="bg-gray-100 p-3">
              <pre>
                <code>{item.code}</code>
              </pre>
            </div>
          );
        case "space10":
          return (
            <div key={index} className="w-full h-[10px]"></div>
          );
        case "space20":
          return (
            <div key={index} className="w-full h-[20px]"></div>
          );
        case "space30":
          return (
            <div key={index} className="w-full h-[10px]"></div>
          );
        case "horizontalRule":
          return <hr key={index} />;
        default:
          return null;
      }
    })}
</div>

    </div>
  );
};

export default BlogsPage;

