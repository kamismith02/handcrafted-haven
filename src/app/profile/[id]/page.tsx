
import { Metadata } from 'next';
import FavCardWrapper from '@/app/ui/profile/cards';
import InitializeUser from '@/app/ui/profile/InitializeUser';
import { getFavorites, getUser } from '@/app/lib/data';
import { notFound } from "next/navigation";

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

    if (!user){
        notFound()
    }

        return ( 
            <main>
                <section className='m-5 bg-*-pearl-extralight p-8'>
                <div className="flex flex-col items-center justify-center">
                <h1 className="font-DancingScript text-*-slate-gray-dark font-bold leading-snug tracking-tight mx-auto my-6  text-2xl lg:max-w-3xl lg:text-5xl">
                {user ? `${user.full_name}'s Profile` : 'Loading...'}</h1>   
                <img
                    src={user.avatar}
                    alt="avatar"
                    className="relative block h-[100px] w-[100px] !rounded-full object-cover justify-center"
                />
                </div>
                <div className="flex">
                    <div className="w-full lg:w-1/3 flex flex-col items-center justify-center">
                        <InitializeUser user={user} />
                    </div>
                    <div className="w-full lg:w-2/3 flex flex-col items-center justify-center">
                        <h2 className="mb-2 text-2xl font-bold tracking-tight text-*-slate-gray-dark">Your Products</h2>
                        <div className="p-4 flex flex-col justify-between flex-grow">
                            <FavCardWrapper favorites={favorites} />
                        </div>
                    </div>
                </div>
                </section>
            </main>);

    }
