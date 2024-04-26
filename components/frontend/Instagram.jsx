"use client";
import { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Space16 from "../backend/Space16";
import dotenv from "dotenv";
import Link from "next/link";
dotenv.config();

const Instagram = () => {
  const [photos, setPhotos] = useState([]);
  const [showSmallScreen, setshowSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setshowSmallScreen(window.innerWidth < 768); 
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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

  return (
    <div className="container mx-auto">
      <Space16 />
      <Space16 />
      <div className="text-6xl allura text-[#FDCCE0]">
        Latest Instagram Posts
      </div>
      <Space16 />
      <Space16 />
      <div className="flex flex-wrap justify-center gap-4 min-h-fit w-full mb-10">
        {showSmallScreen ? (
         <div className=' flex overflow-x-auto '>
            {photos.slice(0, 2).map((photo) => (
              <div key={photo.id} className="">
                <div className="bg-gray-300  mb-10 border border-gray-200 shadow-lg shadow-gray-300 rounded-lg overflow-hidden">
                  {photo.media_type === 'IMAGE' && (
                    <img src={photo.media_url} alt={`Instagram Photo ${photo.id}`} className="w-full h-auto" />
                  )}
                  {photo.media_type === 'VIDEO' && (
                    <video autoPlay muted={true} loop className="w-full h-auto">
                      <source src={photo.media_url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                  <div className="p-4 mb-3">
                    <Link href='https://www.instagram.com/selfcareshari/related_profiles/' className="text-black hover:underline ">View on Instagram</Link>
                  </div>
                </div>
              </div>
            ))}
</div>
        ) : (
          photos.slice(0, 5).map((photo) => (
            <div key={photo.id} className="w-1/6">
              <div className="bg-gray-300 border border-gray-200 shadow-lg shadow-gray-300 rounded-lg overflow-hidden">
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
                  <Link href='https://www.instagram.com/selfcareshari/related_profiles/' className="text-blue-500 hover:underline">View on Instagram</Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Instagram;
