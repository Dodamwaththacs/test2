"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  // Load cart items on component mount
  useEffect(() => {
    const loadCart = () => {
      try {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCartItems(cart);
        calculateTotal(cart);
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    };
    loadCart();
  }, []);

  // Calculate cart total
  const calculateTotal = (items) => {
    const sum = items.reduce((total, item) => total + (item.price * item.quantity), 0);
    setTotal(sum);
  };

  // Handle quantity updates
  const updateQuantity = (productId, change) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === productId) {
        const newQuantity = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  const removeItem = (productId) => {
    const updatedCart = cartItems.filter(item => item.id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-black">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-black text-center">Your cart is empty</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-black">{item.name}</h3>
                  <p className="text-black">${item.price}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="px-2 py-1 bg-gray-100 rounded text-black"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-black">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="px-2 py-1 bg-gray-100 rounded text-black"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="mt-6 bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-black">Total:</span>
              <span className="text-xl font-bold text-black">${total.toFixed(2)}</span>
            </div>
            <button 
              className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              onClick={() => alert('Proceed to checkout')}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}