"use client";
import axios from "axios";
import Image from "next/image";
import React, { useState,useEffect } from "react";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);
  // const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   const fetchData = () => {
  //     axios.get("https://fakestoreapi.com/products")
  //       .then(response => {
  //         setProducts(response.data);
  //       })
  //       .catch(error => {
  //         console.error('Error fetching data:', error);
  //       });
  //   };
  //   fetchData();
  // }, []);

  const products = [
    { id: 1, name: "Product 1", price: 100, image: "/images/1.jpg" },
    { id: 2, name: "Product 2", price: 200, image: "/images/1.jpg" },
    { id: 3, name: "Product 3", price: 300, image: "/images/1.jpg" },
    { id: 4, name: "Product 4", price: 400, image: "/images/1.jpg" },
    { id: 5, name: "Product 5", price: 500, image: "/images/1.jpg" },
    { id: 6, name: "Product 6", price: 600, image: "/images/1.jpg" },
  ];

  

  const handleAddToCart = (product) => {
    try {
      let cart = JSON.parse(localStorage.getItem("cart") || "[]");
      let item = cart.find(item => item.id === product.id);
      
      if (item) {
        item.quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }
      
      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Product added to cart");
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">

        <h1 className="text-3xl font-bold mb-8 text-gray-800">Our Menu</h1>
        <div className="  grid grid-cols-4  gap-6">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {product.name}
                </h2>
                <p className="text-gray-600">
                  ${product.price.toFixed(2)}
                </p>
                <button 
                  className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}