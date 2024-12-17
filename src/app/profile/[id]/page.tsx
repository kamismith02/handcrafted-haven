
import { Metadata } from 'next';
import FavCardWrapper from '@/app/ui/profile/cards';
import InitializeUser from '@/app/ui/profile/InitializeUser';
import { getFavorites, getUser } from '@/app/lib/data';
import { redirect } from 'next/dist/server/api-utils';

export const metadata: Metadata = {
    title: 'Profile',
};

export default async function Page (props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    const [user, favorites] = await Promise.all([
        getUser(id).catch(error => {
            console.log('error fetching user: '+ error)
            return null}),
        getFavorites(id).catch(error => {console.log('error fetching favorites: '+ error); return []})
    ])



        return ( 
            <main>
                <section className='m-5 bg-*-pearl-extralight p-8'>
                <h1 className="font-DancingScript text-*-slate-gray-dark font-bold leading-snug tracking-tight mx-auto my-6 w-full text-2xl lg:max-w-3xl lg:text-5xl">
                {user ? `${user.fullName}'s Profile` : 'Loading...'}
            </h1>
                <div className="flex">
                    <div className="w-full lg:w-1/3 flex flex-col items-center justify-center">
                        <InitializeUser user={user} />
                    </div>
                    <div className="w-full lg:w-2/3 flex flex-col items-center justify-center">
                        <h2>Your Favorite Items</h2>
                        <div className="p-4 flex flex-col justify-between flex-grow">
                            <FavCardWrapper favorites={favorites} />
                        </div>
                    </div>
                </div>
                </section>
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



    //     return (<div className="relative min-h-80 w-full flex flex-col justify-center items-center my-6 bg-white shadow-sm border border-slate-200 rounded-lg p-2">
    //         <div className="p-3 text-center">
    //           <div className="flex justify-center mb-4">
    //             <img w-20 object-center></img>
            
    //           </div>
    //           <div className="flex justify-center mb-2">
    //             <h5 className="text-*-slate-gray-dark text-2xl font-Lora font-bold">
    //               Looks Like You're a Little Lost....
    //             </h5>
    //           </div>
    //           <p className="block text-slate-600 leading-normal font-light mb-4 max-w-lg">
    //             Try logging in again in order to view your profile!
    //           </p>
    //           <div className="text-center">
    //             <button className="min-w-32 rounded-lg bg-*-slate-gray-dark py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none" type="button">
    //               Login
    //             </button>
    //           </div>
    //         </div>
    //       </div>);
    // }

} */