import { Metadata } from 'next';
import FavCardWrapper from '@/app/ui/products/cards';


export const metadata: Metadata = {
    title: 'Profile',
};

export default async function Page( props : { params: Promise<{id: string}> }) {
    const params = await props.params;
    const id = params.id

    if (!id) {
        return <div> ERror: Missing ID</div>;
    }
    return ( 
        <main>
            <h1>Profile</h1>
            <button>Edit Profile</button>
            <div>
                <h2>Your Favorites</h2>
                <FavCardWrapper id={id}/>
            </div>
        </main>);
}

 


/* 
Things to consider for the profile page:
- View depending on user status (user vs. seller)
     - "Manage your shop" button, only appears when you have seller status
        - Click on that button and it takes you to the manage shop page
            - Add/Remove items from the shop
- Holds favorite items
- View order history

*/