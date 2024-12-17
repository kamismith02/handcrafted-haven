'use client'
import { useState, useEffect } from 'react';
import { getUser } from '@/app/lib/data';
import { redirect } from 'next/navigation';

export type User = {
    id: string;
    fullName: string;
    address: string;
    phoneNumber: string;
    status: string;
    isAuth: boolean;
    avatar: string; 
    email: string
}

export type State = {
    user?: User | null;
    isAuth : boolean;
}

export default function InitializeUser({user} : {user: any}) {
    const initialState : State = {user: null, isAuth: false }
    const [userInfo, setUserInfo] = useState<State>(initialState)
    // export async function compileUserInfo(id : string) {

    useEffect(() => {
      if (user) {
        const userData: User = {
          id: user.id,
          fullName: user.fullName,
          address: user.address,
          phoneNumber: user.phoneNumber,
          status: user.status,
          isAuth: user.isAuth || true,
          avatar: user.avatar,
          email: user.email,
        };

        setUserInfo({
          user: userData,
          isAuth: true,
        });
      }
    }, [user]);

    if (!user.isAuth || user === null) {
            redirect('/notfound')
    }

    else if (user!.status = "seller") {
        return (
            <div >
              <a href="/profile/$id/edit">
                <button className="w-full m-6 rounded-md bg-*-slate-gray-dark py-4 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-*-slate-gray focus:shadow-none active:bg-*-slate-gray-light hover:bg-*-slate-gray-light active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                  Edit Profile
                </button>
              </a>
              <a href="#">
                <button className="w-full rounded-md bg-*-slate-gray-dark py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-*-slate-gray focus:shadow-none active:bg-*-slate-gray-light hover:bg-*-slate-gray-light active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
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


