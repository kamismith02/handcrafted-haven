'use client'

import { FavoriteItem, getFavorites } from '@/app/lib/data'; // Adjust the import path
import { removeFromFavorites } from '@/app/lib/data';
import { Product } from '../products/tempProductInfo';
import { useState } from 'react';
import { DeletePopup } from '../Popup';
import { revalidatePath } from 'next/cache';

export default function FavCardWrapper({ favorites }: { favorites : FavoriteItem[] }) {
    if (favorites.length === 0){ return (<div><h6 className="mb-2 text-2xl font-bold tracking-tight text-*-slate-gray-dark">No Favorites to display!</h6></div>)}
      try {
        
        return (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {favorites.map((favorite: FavoriteItem) => {
              const { product_name, image, price } = favorite;
              
              return (
                <div key={favorite.product_id} className="h-full">
                  <FavCard
                    userId={favorite.id}
                    productId={favorite.product_id}
                    image={image}
                    productName={product_name}
                    price={price}
                  />
                </div>
              );
            })}
          </div>
        );
      } catch (error) {
        console.error('Failed to fetch favorites info', error);
        return <div>Error: Failed to load favorites.</div>;
      }
    }




export function ProductCardWrapper({ products }: { products : Product[] }) {
  const [showPopup, setShowPopup] =  useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

const handleDeleteClick = (product: Product) => {
  setSelectedProduct(product);
  setShowPopup(true);
};

const closePopup = () => {
  setShowPopup(false);
  setSelectedProduct(null);
}
      try {
        return (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {products.map((product: Product) => {
              const { id,
                price,
                sale_info,
                seller_id,
                product_name,
                description,
                category,
                image } = product;
              return (
                <div key={id} className="h-full">
                  <ProductCard
                    seller_id={seller_id}
                    id={id}
                    image={image}
                    product_name={product_name}
                    price={price}
                    category={category}
                    onDeleteClick={() => {handleDeleteClick(product)}} 
                  />
                </div>
              );
            })}

            {showPopup && selectedProduct && (
        <DeletePopup
          product={selectedProduct}
          onClose={closePopup}
          onConfirm={() => {
            console.log("Product deleted:", selectedProduct.id);            
            closePopup();
            revalidatePath(`shop/${selectedProduct.seller_id}`)
            
          }}
        />
      )}
    </div>
        );
      } catch (error) {
        console.error('Failed to fetch favorites info', error);
        return <div>Error: Failed to load favorites.</div>;
      }
    }


export function FavCard({
    userId,
    productId,
    image,
    productName,
    price
}: {
    userId: string;
    productId: string;
    image: string;
    productName: string;
    price: number;
}) {

    return (
                <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg max-w-max h-full">
                <div className="relative p-2.5 h-28 w-auto overflow-hidden rounded-xl bg-clip-border">
                  <img
                    src={image}
                    alt="card-image"
                    className="h-full w-full object-cover rounded-md"
                  />
                </div>
                <div className="p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-slate-800 text-xl font-semibold">
                      {productName}
                    </p>
                    <p className="text-*-cordovan text-xl font-semibold">
                      {price}
                    </p>
                  </div>
                  <button className="rounded-md w-full mt-6 rounded-md overflow-hidden bg-*-slate-gray py-2 px-4 border border-transparent text-center text-balance text-white transition-all shadow-md hover:shadow-lg focus:bg-*-blue-gray focus:shadow-none active:bg-*-blue-gray hover:bg-*-blue-gray active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button" onClick={() => "/product/details/{product.Id}"}>
                    Details
                  </button>
                  <button className="rounded-md w-full mt-6 rounded-md overflow-hidden bg-*-slate-gray py-2 px-4 border border-transparent text-center text-balance text-white transition-all shadow-md hover:shadow-lg focus:bg-*-blue-gray focus:shadow-none active:bg-*-blue-gray hover:bg-*-blue-gray active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button" onClick={() => removeFromFavorites(userId, productId)}>
                    Remove from Favorites
                  </button>
                </div>
              </div>
    );
  }


export function ProductCard({
  seller_id,  
  id,
  image,
  category,
    product_name,
    price,
    onDeleteClick,  
}: {
    seller_id: string;
    id: string;
    image: string;
    category: string;
    product_name: string;
    price: string;
    onDeleteClick: () => void;
}) {

    return (
                <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg max-w-max h-full">
                  <div className="mx-3 mb-0 border-b border-slate-200 pt-3 pb-2 px-1">
                    <span className="text-sm text-slate-600 font-medium">
                      {price}
                    </span>
                  </div>
                <div className="relative p-2.5 h-28 w-auto  rounded-xl bg-clip-border">
                  <img
                    src={image}
                    alt="card-image"
                    className="h-full w-full object-cover rounded-md"
                  />
                </div>
                <div className="p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-slate-800 text-xl font-semibold">
                      {product_name}
                    </p>
                    <p className="text-*-cordovan text-base italic font-semibold">
                      {category}
                    </p>
                  </div>
                  <button className="rounded-lg  w-full mt-6 bg-*-slate-gray py-2 px-4 border border-transparent text-center text-balance text-white transition-all shadow-md hover:shadow-lg focus:bg-*-blue-gray focus:shadow-none active:bg-*-blue-gray hover:bg-*-blue-gray active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button" onClick={() => console.log('Details button clicked')}>
                    Details
                  </button>
                  <button className="rounded-lg  w-full mt-6 bg-*-slate-gray py-2 px-4 border border-transparent text-center text-balance text-white transition-all shadow-md hover:shadow-lg focus:bg-*-blue-gray focus:shadow-none active:bg-*-blue-gray hover:bg-*-blue-gray active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button" onClick={(e) => {
                      e.stopPropagation(); 
                      onDeleteClick(); 
                    }}>
                    Delete Product
                  </button>
                </div>
              </div>
    );


}

// async function getFavInfo(id: string) {
//     const favItem = await getProductInfo(id);
// return (favItem)
// }