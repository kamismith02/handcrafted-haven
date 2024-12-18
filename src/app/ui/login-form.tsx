'use client';

import { lora } from '@/app/ui/fonts';
import { AtSymbolIcon, KeyIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@/app/ui/button';
import { useActionState } from 'react';
import { authenticate } from '@/app/lib/actions';

export default function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined);

  return (
    <div className="page">
      <div className="main">
        <h1 className="heading text-center">Login to Your Account</h1>
        <form action={formAction} className="space-y-3" style={{ maxWidth: '400px', width: '100%' }}>
          <div className="rounded-lg bg-white px-6 pb-4 pt-8 shadow-md">
            <div className="w-full">
              <label
                className="block text-sm font-medium text-gray-700 mb-3"
                htmlFor="email"
              >
                Email
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 text-sm focus:border-gray-500 focus:ring-gray-500"
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  required
                />
                <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            <div className="mt-4">
              <label
                className="block text-sm font-medium text-gray-700 mb-3"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 text-sm focus:border-gray-500 focus:ring-gray-500"
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  required
                  minLength={6}
                />
                <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            <Button className="mt-6 w-full sellingButton" aria-disabled={isPending}>
              Log in <ArrowRightIcon className="ml-auto h-5 w-5" />
            </Button>
            {errorMessage && (
              <div className="mt-4 flex items-center text-red-500">
                <ExclamationCircleIcon className="mr-2 h-5 w-5" />
                <p className="text-sm">{errorMessage}</p>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
