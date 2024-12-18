'use client'
import { redirect } from 'next/navigation';


export default function InitializeShop({seller} : {seller: any}) {

    // export async function compileUserInfo(id : string) {
    const handleEditProfile = () => {
      redirect(`/shop/edit/${seller.id}`)
    }
    const handleManageShop = () =>{
        redirect(`/shop/manage/${seller.id}`)
    }

    if (seller === null) {
            redirect('/notfound')
    }
    
        return (
          <section className='m-5 bg-*-pearl-extralight p-8'>
            <div className="justify-center">
                <button className="w-full m-6 rounded-lg overflow-hidden bg-*-slate-gray-dark py-4 px-4 border border-transparent text-center text-md text-white transition-all shadow-md hover:shadow-lg focus:bg-*-slate-gray focus:shadow-none active:bg-*-slate-gray-light hover:bg-*-slate-gray-light active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button" onClick={handleEditProfile}>
                  Edit Shop
                </button>
                <button className="w-full m-6 rounded-lg overflow-hidden bg-*-slate-gray-dark py-4 px-4 border border-transparent text-center text-md text-white transition-all shadow-md hover:shadow-lg focus:bg-*-slate-gray focus:shadow-none active:bg-*-slate-gray-light hover:bg-*-slate-gray-light active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button" >
                  Add New Product
                </button>
                <button className="w-full m-6 rounded-md overflow-hidden border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button" onClick={() => {console.log('Close Shop Button Clicked')}}>
                Delete Shop
                </button>  
        </div>
        </section>
        )
    }


