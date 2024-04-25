'use client'
import React, { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import Link from 'next/link';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "product"));
        console.log("Query snapshot:", querySnapshot.docs);

        const productsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        console.log(productsData);
        setProducts(productsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto m-20 ">
      <h1 className="text-3xl font-bold mb-4 ">Products</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map(product => (
            <Link key={product.id} href={`/products/${product.id}`} >
              <div className="bg-slate-100 rounded-lg shadow-lg shadow-slate-300 overflow-hidden m-4">
                <img src={product.imgURL} alt={product.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
                  <p className="text-gray-600 mb-2">{product.description.substring(1,20)}</p>
                  <p className="text-gray-800 font-bold mb-2">Price: {product.price}</p>
                  <p className="text-gray-800 mb-2">Rating: {product.rating}</p>
                  <a href={product.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View Details</a>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
