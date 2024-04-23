import React, { useState, useEffect } from "react";
import TopNavBar from "@/components/frontend/TopNavBar";
import Space16 from "../backend/Space16";

const ProductDetailsPage = () => {
  const Rating = (Math.random() * (5 - 1) + 1).toFixed(1);
  const ProductDetails = "Men Woven Design GEL-GALAXY 8B Running Shoes";
  const NoOfReview = Math.floor(Math.random() * 500);
  const Photos = ["image1.jpg", "image2.jpg", "image3.jpg"];
  const Sizes = ["S", "M", "L", "XL"];
  const Price = Math.floor(Math.random() * 1000);
  const Offers = { discount: "10%" };
  const EMIOptions = { emiAvailable: true };
  const DesignDetails = { color: "Blue", material: "Synthetic" };
  const MaterialCare = { instructions: "Hand wash only" };
  const Specifications = { weight: "250g", dimensions: "10x5x3 inches" };
  const CustomerReview = {
    positiveFeedback: "Great product, highly recommended!",
    negativeFeedback: "Slightly tight fit for me.",
  };

  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const delay = setTimeout(() => {
      setShowContent(true);
    }, 200);

    return () => clearTimeout(delay);
  }, []);

  return (
    <div className="bg-gray-100 h-full rounded-3xl">

      {showContent && (
        <div className="max-w-4xl mx-auto p-6">
          <h1 className="text-3xl font-semibold mb-4">{ProductDetails}</h1>
          <div className="mb-4">
            <p className="text-gray-700">Rating: {Rating}</p>
            <p className="text-gray-700">No. of Reviews: {NoOfReview}</p>
            <div className="mt-2">
              <p className="text-gray-700">Photos:</p>
              <ul className="list-disc pl-5">
                {Photos.map((photo, index) => (
                  <li key={index}>{photo}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mb-4">
            <p className="text-gray-700">Sizes:</p>
            <div className="flex">
              {Sizes.map((size, index) => (
                <div
                  key={index}
                  className={`mr-2 py-1 px-2 border border-gray-400 rounded-md ${
                    index % 2 === 0 ? "bg-green-200" : ""
                  }`}
                >
                  {size}
                </div>
              ))}
            </div>
            <Space16 />
            <p className="text-gray-700">Price: ${Price}</p>
            <Space16 />
            <div className="flex ">
              {" "}
              <div className=" p-2 pr-4 pl-4 bg-[#FDCCE0] rounded-full text-slate-700 text-3xl allura shadow-lg shadow-[#FDCCE0]">
                Link
              </div>
            </div>
            <Space16 />
            <Space16 />
            <p className="text-gray-700">Offers: {Offers.discount}</p>
            <p className="text-gray-700">
              EMI Available: {EMIOptions.emiAvailable ? "Yes" : "No"}
            </p>
            <p className="text-gray-700">
              Design Details: {DesignDetails.color}, {DesignDetails.material}
            </p>
            <p className="text-gray-700">
              Material Care: {MaterialCare.instructions}
            </p>
            <Space16 />
            <Space16 />
            <p className="text-gray-700 flex flex-col">
              <div>Specifications: Weight - {Specifications.weight}</div>
              <div>Dimensions: {Specifications.dimensions} </div>
            </p>
          </div>
          <div>
            <p className="text-gray-700">
              Customer Review: {CustomerReview.positiveFeedback}
            </p>
            <p className="text-gray-700 ">
              Negative Feedback: {CustomerReview.negativeFeedback}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsPage;
