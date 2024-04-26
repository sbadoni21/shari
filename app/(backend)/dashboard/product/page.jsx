'use client'
import React, { useState } from 'react';
import { db, storage } from '../../../../firebase/firebase'; 
import { getDownloadURL, ref, uploadBytesResumable, } from "firebase/storage";
import { addDoc, collection, updateDoc } from 'firebase/firestore';

const AddProductForm = () => {
  const [productData, setProductData] = useState({
    description: '',
    imgURL: '',
    link: '',
    price: '',
    rating: '',
    title: ''
  });
  const [showLoader, setShowLoader] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("hehehehe")
    try {
    
      const storageRef = ref(storage, `product_images/${Date.now()}`);
      const uploadTask = uploadBytesResumable(storageRef, productData.imgURL);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setShowLoader(true);
          setUploadProgress(progress);
        },
        (error) => {
          console.error("Error uploading photo", error);
        },
        async () => {
          const photoURL = await getDownloadURL(uploadTask.snapshot.ref);
          setShowLoader(false);
          const docRef = await addDoc(collection(db, "product"), {
            description: productData.description,
            imgURL: photoURL,
            link: productData.link,
            price: productData.price,
            rating: productData.rating,
            title: productData.title
          });
          await updateDoc(docRef, { id: docRef.id });
          setProductData({
            description: '',
            imgURL: '',
            link: '',
            price: '',
            rating: '',
            title: ''
          });
          console.log("Product added successfully!");

      
        }
      );


      
    } catch (error) {
      console.error("Error adding product: ", error);
    }
  };
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setProductData({ ...productData, imgURL: file });
  };

  return (
    <div className="flex flex-col items-center justify-center mt-8 text-white">
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-lg ">
        <div className="mb-4">
          <label htmlFor="title" className="block mb-1">Title:</label>
          <input type="text" id="title" name="title" value={productData.title} onChange={handleChange} className="w-full px-3 py-2 text-black  border rounded-lg focus:outline-none focus:border-blue-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block mb-1">Description:</label>
          <textarea id="description" name="description" value={productData.description} onChange={handleChange} className="w-full text-black px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="imgFile" className="block mb-1">Upload Image:</label>
          <input type="file" id="imgFile" name="imgFile" accept="image/*" onChange={handlePhotoChange} className="w-full  px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="link" className="block mb-1">Link:</label>
          <input type="text" id="link" name="link" value={productData.link} onChange={handleChange} className="w-full px-3 py-2 border text-black rounded-lg focus:outline-none focus:border-blue-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block mb-1">Price:</label>
          <input type="text" id="price" name="price" value={productData.price} onChange={handleChange} className="w-full text-black px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="rating" className="block mb-1">Rating:</label>
          <input type="text" id="rating" name="rating" value={productData.rating} onChange={handleChange} className="w-full px-3 text-black py-2 border rounded-lg focus:outline-none focus:border-blue-500" />
        </div>
        <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-lg focus:outline-none hover:bg-blue-600">Add Product</button>
      </form>
    </div>
  );
};

export default AddProductForm;
