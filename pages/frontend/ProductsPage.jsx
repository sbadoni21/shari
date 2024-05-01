'use client'
import React, { useState, useEffect } from 'react';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import Link from 'next/link';
import Carousel from 'react-multi-carousel';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      try {
        const categorySnapshot = await getDocs(collection(db, "categories"));
        const categoriesData = categorySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setCategories(categoriesData);
        const allProductSnapshot = await getDocs(
          query(collection(db, "product"))
        );
        const allProducts = allProductSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setAllProducts(allProducts);
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
    <div className="bg-gradient-to-t from-black from-10% to-[#E499B8] to-95% ">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
        {products.map(category => (
  category.products && category.products.length > 0 && (
    <div key={category.id} className=' pt-20 '>
      <h3 className="text-6xl allura mb-4 text-white pl-20">{category.category.category}</h3>
      <Carousel
        key={category.id} 
        draggable={true}
        swipeable={true}
        infinite={true}
        autoPlay={true}
        partialVisible={false}
        autoPlaySpeed={3000}
        centerMode={true}
        keyBoardControl={true}
        transitionDuration={500}
        removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
        className='pb-10'
        responsive={{
          desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,
          },
          tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
          },
          mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
          },
        }}
      >
        {category.products.map(product => (
          <Link key={product.id} href={`/products/${product.id}`}>
            <div className="bg-slate-100 rounded-lg bg-black text-white shadow-2xl shadow-gray-400 overflow-hidden m-4">
              <img src={product.imgURL} key={product.id} alt={product.title} className="w-full h-3/4 object-cover" />
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
                <p className="text-gray-800 mb-2">Rating: {product.rating}</p>
                <a href={product.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View Details</a>
              </div>
            </div>
          </Link>
        ))}
      </Carousel>
    </div>
  )
))}
 <h3 className="text-6xl allura mb-4 text-white pl-20">All Products</h3>
      <Carousel
        draggable={true}
        swipeable={true}
        infinite={true}
        autoPlay={true}
        partialVisible={false}
        autoPlaySpeed={3000}
        centerMode={true}
        keyBoardControl={true}
        transitionDuration={500}
        removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
        className='pb-10'
        responsive={{
          desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,
          },
          tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
          },
          mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
          },
        }}
      >
        {allProducts.map(product => (
          <Link key={product.id} href={`/products/${product.id}`}>
            <div className="bg-slate-100 rounded-lg bg-black text-white shadow-2xl shadow-gray-400 overflow-hidden m-4">
              <img src={product.imgURL} key={product.id} alt={product.title} className="w-full h-3/4 object-cover" />
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
                <p className="text-gray-800 mb-2">Rating: {product.rating}</p>
                <a href={product.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View Details</a>
              </div>
            </div>
          </Link>
        ))}
      </Carousel>


        </div>
      )}
    </div>
  );
  
  
  
};

export default ProductsPage;
