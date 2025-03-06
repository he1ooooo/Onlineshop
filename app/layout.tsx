"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from 'next/link';
import { Button } from '@/app/components/ui/button';
import { Toaster } from "./components/ui/toaster";
import ToastComponent from "./components/toast";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      {/* <Toaster /> */}
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <header>
          <Link href="/">
        <Button className="bg-primary text-white hover:bg-primary/90 text-lg px-6 py-3">
        main
        </Button>
      </Link>
          <Link href="/products">
        <Button className="bg-primary text-white hover:bg-primary/90 text-lg px-6 py-3">
        Products
        </Button>
      </Link>
      <Link href="/cart">
        <Button className="bg-primary text-white hover:bg-primary/90 text-lg px-6 py-3">
        Cart
        </Button>
      </Link>
    
          </header>
          
          {children}
        </body>
      </html>
    </QueryClientProvider>
  );
}
