
"use client";
import { useState } from 'react';
import Image from 'next/image';

export default function AddProduct() {
  

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
      
      <form  className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Product Image
          </label>
          <div className="flex items-center space-x-4">
            <div className="relative h-32 w-32 border-2 border-dashed rounded-lg overflow-hidden">
              
            </div>
            <input
              type="file"
              accept="image/*"
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Price
          </label>
          <input
            type="number"
            name="price"
            className="w-full p-2 border rounded-md"
            min="0"
            step="0.01"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            Description
          </label>
          <textarea
            name="description"
            rows="4"
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}