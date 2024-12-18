'use client'
import { useActionState, useState } from "react";
import { formState, userForm } from "@/app/profile/[id]/actions";
import { updateProfile } from "@/app/profile/[id]/actions";
import { updateUser } from "@/app/lib/data";

import { Button } from "../button";


export default function EditUserForm({
  user
}: {
  user: userForm;
}) {
  const initialState: formState = { message: '', errors: {}};
  const updateUserWithId = updateProfile.bind(null, user.id);
  const [state, formAction] = useActionState(updateUserWithId, initialState) // not working

    // const initialState: formState = {message: null, errors: {}};
    // const updateUserProfile = updateProfile.bind(null, user.id);
    // const [state, formAction] = useActionState(updateUserProfile, initialState);
    
return (

<div className="relative flex flex-col rounded-sm bg-*-pearl-extralight p-4">
  <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" action={formAction}>
    <div className="mb-1 flex flex-col gap-6">
      <div className="w-full max-w-sm min-w-[200px]">
        <label className="block mb-2 text-sm text-slate-600">
          Your Name
        </label>
        <input type="text" name="full_name" className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" defaultValue={user.full_name} />
      </div>
      <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.full_name &&
              state.errors.full_name.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
      <div className="w-full max-w-sm min-w-[200px]">
        <label className="block mb-2 text-sm text-slate-600">
          Email
        </label>
        <input type="email" name="email" className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" defaultValue={user.email} />
      </div>
      <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.email &&
              state.errors.email.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
      <div className="w-full max-w-sm min-w-[200px]">
        <label className="block mb-2 text-sm text-slate-600">
          Address
        </label>
        <input type="text" name="address" className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" defaultValue={user.address} />
      </div>
      <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.address &&
              state.errors.address.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
      <div className="w-full max-w-sm min-w-[200px]">
        <label className="block mb-2 text-sm text-slate-600">
          Phone Number
        </label>
        <input type="text" name="phone_number" className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" defaultValue={user.phone_number} />
      </div>
      <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.phone_number &&
              state.errors.phone_number.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
      <div className="w-full max-w-sm min-w-[200px]">
        <label className="block mb-2 text-sm text-slate-600">
          Avatar Web Address
        </label>
        <input type="text" name="avatar" className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" defaultValue={user.avatar} />
      </div>
      <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.avatar &&
              state.errors.avatar.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
    </div>

    {/* Radio Buttons */}
    <fieldset>
      <legend className="block mb-2 text-sm text-slate-600">
        Select Account Type
      </legend>
      <div className="relative max-w-sm flex w-full flex-col rounded-xl bg-white shadow">
  <nav className="flex min-w-[240px] flex-row gap-1 p-2">
    <div
      role="button"
      className="flex w-full items-center rounded-lg p-0 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
    >
      <label
        htmlFor="react-horizontal"
        className="flex w-full cursor-pointer items-center px-3 py-2"
      >
        <div className="inline-flex items-center">
          <label className="relative flex items-center cursor-pointer" htmlFor="react-horizontal">
            <input
              name="framework-horizontal"
              type="radio"
              className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-slate-400 transition-all"
              id="react-horizontal"
              defaultChecked={user.status === 'user'}
            />
            <span className="absolute bg-slate-800 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
          </label>
          <label className="ml-2 text-slate-600 cursor-pointer text-sm" htmlFor="react-horizontal">
            User
          </label>
        </div>
      </label>
    </div>
    
    <div
      role="button"
      className="flex w-full items-center rounded-lg p-0 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
    >
      <label
        htmlFor="svelte-horizontal"
        className="flex w-full cursor-pointer items-center px-3 py-2"
      >
        <div className="inline-flex items-center">
          <label className="relative flex items-center cursor-pointer" htmlFor="svelte-horizontal">
            <input
              name="framework-horizontal"
              type="radio"
              className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-slate-400 transition-all"
              id="svelte-horizontal"
              defaultChecked={user.status === 'seller'}
            />
            <span className="absolute bg-slate-800 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
          </label>
          <label className="ml-2 text-slate-600 cursor-pointer text-sm" htmlFor="svelte-horizontal">
            Seller
          </label>
        </div>
      </label>
    </div>
  </nav>
</div>
<div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.avatar &&
              state.errors.avatar.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
    </fieldset>
    
    
    <Button className="mt-4 w-full rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="submit">
      Submit Changes
    </Button>
  </form>
  </div>
)

}
        
 