'use client'
import { useState, useEffect } from 'react';
import { redirect } from 'next/navigation';

export type User = {
    id: string;
    full_name: string;
    address: string;
    phone_number: string;
    status: string;
    avatar: string; 
    email: string
}

export type State = {
    user?: User | null;

}

export default function InitializeUser({user} : {user: any}) {
    const initialState : State = {user: null}
    const [userInfo, setUserInfo] = useState<State>(initialState)
    // export async function compileUserInfo(id : string) {

    useEffect(() => {
      if (user) {
        const userData: User = {
          id: user.id,
          full_name: user.full_name,
          address: user.address,
          phone_number: user.phone_number,
          status: user.status,
          avatar: user.avatar,
          email: user.email,
        };

        setUserInfo({
          user: userData,
        });
      }
    }, [user]);

    const handleEditProfile = () => {
      redirect(`/profile/edit/${user.id}`)
    }
    const handleManageShop = () => {
      redirect(`/shop/${user.id}`)
    }

    if (user === null) {
            redirect('/notfound')
    }

    else if (user!.status = "seller") {
        return (
            <div className = "justify-center">
                <button className="w-full rounded-lg overflow-hidden bg-*-slate-gray-dark py-2 px-4 border border-transparent text-center text-md text-white transition-all shadow-md hover:shadow-lg focus:bg-*-slate-gray focus:shadow-none active:bg-*-slate-gray-light hover:bg-*-slate-gray-light active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none m-2" type="button" onClick={handleEditProfile}>
                  Edit Profile
                </button>
              <a href="#">
                <button className="w-full rounded-lg overflow-hidden bg-*-slate-gray-dark py-2 px-4 border border-transparent text-center text-md text-white transition-all shadow-md hover:shadow-lg focus:bg-*-slate-gray focus:shadow-none active:bg-*-slate-gray-light hover:bg-*-slate-gray-light active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none m-2" type="button" onClick={handleManageShop}>
                  Manage Shop
                </button>
              </a>
        </div>
        )
    }

    return ( 
        <div>

              <a href="/profile/$id/edit">
                  <button className="w-full rounded-md bg-*-slate-gray-dark py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-*-slate-gray focus:shadow-none active:bg-*-slate-gray-light hover:bg-*-slate-gray-light active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                    Edit Profile
                  </button>
                </a>
        </div>
    )}


