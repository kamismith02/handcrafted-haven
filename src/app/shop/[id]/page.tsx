
import { Metadata } from 'next';
import { ProductCardWrapper } from '@/app/ui/profile/cards';
import InitializeShop from '@/app/ui/shop/InitializeShop';
import { getSeller, getProductList } from '@/app/lib/data';
import { notFound } from "next/navigation";

export const metadata: Metadata = {
    title: 'Manage Shop',
};

export default async function Page (props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    const seller = await getSeller(id).catch(error => {console.log('error fetching user: '+ error)})

    if (!seller){
        notFound()
    }
    
        const products = await getProductList(seller.id);

        if (!products) {
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-*-slate-gray-dark">No Products on the Market!</h5>
        }
        return ( 
            <main>
                <section className='m-5 bg-*-pearl-extralight p-8'>
                    <div className="flex flex-col items-center justify-center"> 
                        <h1 className="font-DancingScript text-*-slate-gray-dark font-bold leading-snug tracking-tight mx-auto my-6  text-2xl lg:max-w-3xl lg:text-5xl">
                        {seller ? `${seller.shop_name}` : 'Loading...'}            </h1>
                        <img
                            src={seller.avatar}
                            alt="avatar"
                            className="relative inline-block h-[74px] w-[74px] !rounded-full object-cover object-center"
                    />
                    </div>
                <div className="flex">
                    <div className="w-full lg:w-1/3 flex flex-col items-center justify-center">
                        <InitializeShop seller={seller} />
                    </div>
                    <div className="w-full lg:w-2/3 flex flex-col items-center justify-center">
                        <h2 className="mb-2 text-2xl font-bold tracking-tight text-*-slate-gray-dark">Your Shop Products</h2>
                        <div className="p-4 flex flex-col justify-between flex-grow">
                            <ProductCardWrapper products={products} />
                        </div>
                    </div>
                </div>
                </section>
            </main>);

    }
