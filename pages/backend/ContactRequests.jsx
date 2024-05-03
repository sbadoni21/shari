"use client";
import Space16 from "@/components/backend/Space16";
import { db } from "@/firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const ContactRequests = () => {
  const [contactUsRequests, setContactUsRequests] = useState([]);

  const fetchContactRequests = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "queries"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(), // corrected 'data' to 'doc.data()'
      }));
      setContactUsRequests(data);
    } catch (error) {
      console.error("Error fetching contact requests:", error);
    }
  };

  useEffect(() => {
    fetchContactRequests();
  }, []);

  return (
    <div className="p-20">
      <h3 className=" allura text-6xl ">Contact Requests</h3>
      <Space16 />

      <div className="flex gap-4 flex-wrap">
        {contactUsRequests.map((request) => (
          <div className=" bg-primary p-4 rounded-md" key={request.id}>
            <p className="text-xl">{request.name}</p>

            <p className="text-sm text-blue underline">{request.email}</p>
            <Space16 />
            <p className="text-sm">Message: </p>
            <div>{request.message}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactRequests;
