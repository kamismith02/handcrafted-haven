
import { Metadata } from 'next';
import { ProductCardWrapper } from '@/app/ui/profile/cards';
import EditShopForm from '@/app/ui/shop/editShopForm';
import { getSeller } from '@/app/lib/data';
import { notFound } from "next/navigation";


export default async function Page (props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    const seller = await getSeller(id).catch(error => {console.log('error fetching user: '+ error)})

    if (!seller){
            notFound()
        }

    
    return (
        <EditShopForm seller={seller} />
    )
}