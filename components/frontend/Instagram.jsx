"use client";
import React, { useState, useEffect } from "react";
import Space16 from "../backend/Space16";
import dotenv from "dotenv";
dotenv.config();

const Instagram = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchInstagramPhotos = async () => {
      try {
        const response = await fetch(
          `https://graph.instagram.com/me/media?fields=id,media_url,permalink,media_type,caption&access_token=${process.env.NEXT_PUBLIC_INSTAGRAM_KEY}`
        );
        const data = await response.json();
        setPhotos(data.data);
      } catch (error) {
        console.error("Error fetching Instagram photos:", error);
      }
    };

    fetchInstagramPhotos();
  }, []);

  const extractFirstTwoLines = (caption) => {
    if (typeof caption !== 'string') {
      return ''; 
    }
    const lines = caption.split('\n'); 
    return lines.slice(0, 2).join('\n'); 
  };
  

  return (
    <div className="container mx-auto">
              <Space16/>
              <Space16/>
 <div className="text-6xl allura text-[#FDCCE0]">
       Latest Instagram Posts
        </div>   
        <Space16/>
        <Space16/>   <div className="flex flex-wrap justify-center gap-4 min-h-fit mb-10">
        {photos.slice(0, 5).map((photo) => (
          <div key={photo.id} className="w-1/6">
            <div className="bg-gray-100 border border-gray-200 shadow-lg shadow-gray-300 rounded-lg overflow-hidden">
              {photo.media_type === 'IMAGE' && (
                <img src={photo.media_url} alt={`Instagram Photo ${photo.id}`} className="w-full h-auto" />
              )}
              {photo.media_type === 'VIDEO' && (
                <video autoPlay muted={true} loop className="w-full h-auto">
                  <source src={photo.media_url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
              <div className="p-4">
                <div className="text-sm mb-2">{extractFirstTwoLines(photo.caption)}</div>
                <a href={photo.permalink} className="text-blue-500 hover:underline">View on Instagram</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Instagram;
