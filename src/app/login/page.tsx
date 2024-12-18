"use client";

import React from "react";
import { useRouter } from 'next/navigation';
import { lora } from '@/app/ui/fonts';
import "../ui/globals.css";
import styles from "../ui/page.module.css";

const LoginForm: React.FC = () => {
  const router = useRouter();

  const handleSignUpClick = (event: React.MouseEvent) => {
    event.preventDefault();
    router.push('/register');
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white p-12 rounded-lg shadow-md w-full max-w-xl">
        <h2 className="text-3xl font-bold mb-8 text-gray-900 text-center font-sans">
          Sign in to your account
        </h2>
        <form className="font-sans">
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

          {/* Remember Me + Forgot Password */}
          <div className="flex items-center justify-between mb-8">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-[#3c574f] focus:ring-[#3c574f]"
              />
              <span className="ml-2 text-gray-700 text-sm">Remember me</span>
            </label>
            <a href="#" className="text-[#3c574f] text-sm hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full bg-[#3c574f] text-white py-3 px-4 rounded-lg hover:bg-opacity-90 focus:outline-none"
          >
            Sign in
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="text-gray-600 text-center text-sm mt-8">
          Don’t have an account yet?{" "}
          <a href="#" className="text-[#3c574f] hover:underline" onClick={handleSignUpClick}>
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default function Login() {
  return (
    <div className={styles.page}>
      <main className={`${lora.className} ${styles.main} py-4`}>
        <LoginForm />
      </main>
    </div>
  );
}
