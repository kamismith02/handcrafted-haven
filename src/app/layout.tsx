import type { Metadata } from "next";
import "./ui/globals.css";
import NavBar from "./ui/NavBar";
import Footer from "./ui/Footer";
import { SessionProvider } from 'next-auth/react';

export const metadata: Metadata = {
  title: "Handcrafted Haven Page",
  description: "Handcrafted Haven Page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <html lang="en">
        <body>
          <header>
          <NavBar />
          </header>
          {children}
          <Footer />
        </body>
      </html>
    </SessionProvider>
  );
}
