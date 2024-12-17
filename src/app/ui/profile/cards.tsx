'use client'

import { FavoriteItem, getFavorites, removeFromFavorites  } from '@/app/lib/data';

export default function FavCardWrapper({ favorites }: { favorites : FavoriteItem[] }) {
    if (favorites.length === 0){ return <div>Error: no favorites to display!</div>}

      try {
        return (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {favorites.map((favorite: FavoriteItem) => {
              console.log(favorite);
              const { product_name, image, price } = favorite;
              return (
                <div key={favorite.product_id} className="h-full">
                  <Card
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


export function Card({
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
                  <button className="rounded-md w-full mt-6 bg-*-slate-gray py-2 px-4 border border-transparent text-center text-balance text-white transition-all shadow-md hover:shadow-lg focus:bg-*-blue-gray focus:shadow-none active:bg-*-blue-gray hover:bg-*-blue-gray active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button" onClick={() => removeFromFavorites(userId, productId)}>
                    Remove from favorites
                  </button>
                </div>
              </div>
    );
}

// async function getFavInfo(id: string) {
//     const favItem = await getProductInfo(id);
// return (favItem)
// }