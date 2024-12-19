'use client'

import { useState } from 'react';
import { redirect } from 'next/navigation';

export default function InitializeShop({ seller }: { seller: any }) {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');


  const handleAddNewProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    const productData = {
      price: parseFloat(price),
      product_name: productName,
      description,
      category,
      image,
      seller_id: seller.id, 
    };

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        alert('Product added succesfully!');
        
      } else {
        alert('Something went wrong');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error adding product');
    }
  };

  if (seller === null) {
    redirect('/notfound');
  }

  return (
    <section className="m-5 bg-*-pearl-extralight p-8">
      <div className="justify-center">
        <form onSubmit={handleAddNewProduct}>
          <div className="m-4">
            <label htmlFor="productName" className="block text-md font-medium text-gray-700">
              Product Name
            </label>
            <input
              id="productName"
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="m-4">
            <label htmlFor="price" className="block text-md font-medium text-gray-700">
              Price
            </label>
            <input
              id="price"
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="m-4">
            <label htmlFor="description" className="block text-md font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="m-4">
            <label htmlFor="category" className="block text-md font-medium text-gray-700">
              Category
            </label>
            <input
              id="category"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="m-4">
            <label htmlFor="image" className="block text-md font-medium text-gray-700">
              Image URL
            </label>
            <input
              id="image"
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
            />
          </div>
          <button
            className="w-full m-6 rounded-lg overflow-hidden bg-*-slate-gray-dark py-4 px-4 border border-transparent text-center text-md text-white transition-all shadow-md hover:shadow-lg focus:bg-*-slate-gray focus:shadow-none active:bg-*-slate-gray-light hover:bg-*-slate-gray-light active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="submit"
          >
            Save Product
          </button>
        </form>
        <button
          className="w-full m-6 rounded-md overflow-hidden border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          onClick={() => {
            console.log('Close Shop Button Clicked');
          }}
        >
          Delete Shop
        </button>
      </div>
    </section>
  );
}
