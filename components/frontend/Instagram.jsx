import React from 'react'
import Space16 from '../backend/Space16'

const Instagram = () => {
  return (
<div className="w-full h-1/2  pl-20 pr-20 pt-20 pb-20 bg-white text-[#ffffff] text-center lemonada  ">
      <div className="flex items-center justify-start gap-4 pl-24">
        <div className="text-6xl allura text-[#FDCCE0]">Instagram</div>
      </div>
      <Space16 />
      <Space16 />
      <div className="flex gap-10  justify-center items-center  ">
    
      <div className="w-56 bg-[#FDCCE0] border-8 border-white p-2 ">
          <img src="image4.jpg" alt="img4" className="" />
          <div className=" flex justify-center items-center pt-4 pb-4">
            Heading Content
          </div>
      
        </div>
        <div className="w-56 bg-[#FDCCE0] border-8 border-white p-2 ">
          <img src="image4.jpg" alt="img4" className="" />
          <div className=" flex justify-center items-center pt-4 pb-4">
            Heading Content
          </div>
        
        </div>
        <div className="w-56 bg-[#FDCCE0] border-8 border-white p-2 ">
          <img src="image4.jpg" alt="img4" className="" />
          <div className=" flex justify-center items-center pt-4 pb-4">
            Heading Content
          </div>
      
        </div>
        <div className="w-56 bg-[#FDCCE0] border-8 border-white p-2 ">
          <img src="image4.jpg" alt="img4" className="" />
          <div className=" flex justify-center items-center pt-4 pb-4">
            Heading Content
          </div>
     
        </div>
      </div>
    </div>
  )
}

export default Instagram