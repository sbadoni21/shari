'use client'
import React, { useState, useEffect } from 'react';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import Link from 'next/link';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      try {
        const categorySnapshot = await getDocs(collection(db, "categories"));
        const categoriesData = categorySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setCategories(categoriesData);

        const productsData = [];
        for (const category of categoriesData) {
          const productSnapshot = await getDocs(
            query(collection(db, "product"), where("categories", "array-contains", category.id))
          );

          const products = productSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          productsData.push({ category, products });
        }
     console.log(productsData);
        setProducts(productsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchCategoryDetails();
  }, []);
  return (
    <div className="container mx-auto m-20">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {products.map(category => (
            (category.products.length > 0) && (
              <div key={category.id}>
                <h3 className="text-6xl  allura  mb-4">{category.category.category}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {category.products.map(product => (
                    <Link key={product.id} href={`/products/${product.id}`}>
                      <div className="bg-slate-100 rounded-lg shadow-lg shadow-slate-300 overflow-hidden m-4">
                        <img src={product.imgURL} key={product.id} alt={product.title} className="w-full h-48 object-cover" />
                        <div className="p-4">
                          <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
                          <p className="text-gray-800 mb-2">Rating: {product.rating}</p>
                          <a href={product.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View Details</a>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )
          ))}
        </div>
      )}
    </div>
  );
  
  
  
};

export default ProductsPage;
