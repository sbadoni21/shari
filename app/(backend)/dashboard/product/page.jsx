'use client'
import React, { useEffect, useState } from 'react';
import { db, storage } from '../../../../firebase/firebase'; 
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';

const AddProductForm = () => {
  const [productData, setProductData] = useState({
    description: '',
    imgURL: '',
    link: '',
    rating: '',
    title: ''
  });
  const [showLoader, setShowLoader] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "product"));
      const productsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productsData);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
            rating: productData.rating,
            title: productData.title
          });
          await updateDoc(docRef, { id: docRef.id });
          setProductData({
            description: '',
            imgURL: '',
            link: '',
            rating: '',
            title: ''
          });
          setShowModal(false);
          fetchProducts();

          console.log("Product added successfully!");
        }
      );
    } catch (error) {
      console.error("Error adding product: ", error);
    }
  };
  const confirmDelete = (tagId) => {
    setDeleteConfirmation(tagId);
  };
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setProductData({ ...productData, imgURL: file });
  };
  const handleDelete = async (productId) => {
    try {
      await deleteDoc(doc(db, "product", productId));
      setProducts(products.filter(product => product.id !== productId));
      setDeleteConfirmation(null);
      console.log("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  return (
    <div>
       <div>
      <h2 className="text-2xl font-bold mb-4">All Products</h2>
      <button onClick={() => setShowModal(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
        Add New Product
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map(product => (
          <div key={product.id} className="bg-white shadow-md p-4 rounded-lg">
            <h3 className="text-lg font-semibold">{product.title}</h3>
            <p className="text-gray-600">{product.description}</p>
            <img src={product.imgURL} alt={product.title} className="mt-2 max-w-full h-auto" />
            <p className="mt-2">Rating: {product.rating}</p>
            <a href={product.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{product.link}</a>
            <div className="flex justify-end mt-4">
              <button className="mr-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={() => setShowModal(true)}>
                Edit
              </button>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"               onClick={() => confirmDelete(product.id)} 
>
                Delete
              </button>
            </div>
          </div>
        ))}
    </div>
    </div>
    {deleteConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-primary text-gray-500 p-4 rounded-lg">
            <p className="text-lg">Are you sure you want to delete this tag?</p>
            <div className="flex justify-end mt-4">
              <button 
                onClick={() => handleDelete(deleteConfirmation)} 
                className="bg-red-500 text-white py-2 px-4 rounded-lg mr-2"
              >
                Yes
              </button>
              <button 
                onClick={() => setDeleteConfirmation(null)} 
                className="bg-gray-300 text-gray-900 py-2 px-4 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Add Product</h2>
            <form onSubmit={handleSubmit} className="max-w-lg ">
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
                <label htmlFor="rating" className="block mb-1">Rating:</label>
                <input type="text" id="rating" name="rating" value={productData.rating} onChange={handleChange} className="w-full px-3 text-black py-2 border rounded-lg focus:outline-none focus:border-blue-500" />
              </div>
              <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-lg focus:outline-none hover:bg-blue-600">Add Product</button>
            </form>
            <button onClick={() => setShowModal(false)} className="absolute top-0 right-0 mt-2 mr-2 text-red-600 hover:text-red-800">&#10006;</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProductForm;
