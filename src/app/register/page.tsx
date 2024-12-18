"use client";

import React from "react";
import { useRouter } from 'next/navigation';
import { lora } from '@/app/ui/fonts';
import "../ui/globals.css";
import styles from "../ui/page.module.css";
import { useActionState } from 'react';
import { registerUser } from "@/app/lib/actions";

const RegisterForm: React.FC = () => {
  const router = useRouter();
const [errorMessage, formAction] = useActionState(registerUser, undefined);
  const handleSignInClick = (event: React.MouseEvent) => {
    event.preventDefault();
    router.push('/login');
  };

  return (
    <div className="font-sans">
      <div className="bg-white p-12 rounded-lg shadow-md w-full max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-gray-900 text-center">
          Create your account
        </h2>
        <form className="font-sans" action={formAction}>
          {/* Name Input */}
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-2"
            >
              Your name
            </label>
            <input
              type="text"
              id="name"
              placeholder="John Doe"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#3c574f] outline-none"
            />
          </div>

          {/* Email Input */}
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              placeholder="name@email.com"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#3c574f] outline-none"
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#3c574f] outline-none"
            />
          </div>

          {/* Confirm Password Input */}
          <div className="mb-6">
            <label
              htmlFor="confirm-password"
              className="block text-gray-700 font-medium mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              placeholder="••••••••"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#3c574f] outline-none"
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-red-800 text-white py-3 px-4 rounded-lg hover:bg-opacity-90 focus:outline-none"
          >
            Register
          </button>
        </form>

        {/* Sign In Link */}
        <p className="text-gray-600 text-center text-sm mt-8">
          Already have an account?{" "}
          <a href="#" className="text-[#3c574f] hover:underline" onClick={handleSignInClick}>
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default function Register() {
  return (
    <div className={styles.page}>
      <main className={`${lora.className} ${styles.main} py-4`}>
        <RegisterForm />
      </main>
    </div>
  );
}