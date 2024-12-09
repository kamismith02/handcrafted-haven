'use client';

import { useState, useEffect } from 'react';
import { Card } from '../products/cards'; // Adjust the import path

export default function FavCardWrapperClient({ userId, favorites }: { userId: string; favorites: any[] }) {
    const [localFavorites] = useState<any[]>(favorites);

    useEffect(() => {
        // Example of additional client-side logic
        console.log('Favorites loaded:', localFavorites);
    }, [localFavorites]);

    if (localFavorites.length === 0) {
        return <div>No favorites yet!</div>;
    }

    return (
        <>
            {localFavorites.map((favorite: any) => {
                console.log(favorite);
                const { productName, image, price } = favorite;
                return (
                    <div key={favorite._id}>
                        <Card
                            userId = {userId}
                            productId={favorite._id}
                            image={image}
                            productName={productName}
                            price={price}
                        />
                    </div>
                    
                );
            })}
        </>
    );
}
