// FavCardWrapperServer.tsx
import { getFavorites } from '@/app/lib/data'; // Adjust the import path
import FavCardWrapperClient from '../profile/WrapperClient';
import { removeFromFavorites } from '@/app/lib/data';

export default async function FavCardWrapper({ id }: { id: string }) {
    try {
        const favorites = await getFavorites(id); // Fetch data server-side
        return <FavCardWrapperClient userId = {id} favorites={favorites}/>;
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
        <div>
            <img src={image} alt={`photo of ${productName}`} />
            <h4>{productName}</h4>
            <p>{price}</p>
            <button onClick={() => removeFromFavorites(userId, productId)}>X</button>
        </div>
    );
}

// async function getFavInfo(id: string) {
//     const favItem = await getProductInfo(id);
// return (favItem)
// }