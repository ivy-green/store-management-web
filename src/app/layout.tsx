'use client'

import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const runtime = 'edge'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider
        clientId={"724510927341-ir4l70rvcf2tv5cqd64r6ob48v3p7v4p.apps.googleusercontent.com"}>
        <html lang="en">
          <Head>
            <title>Store Management</title>
          </Head>
          <body className={`${inter.className} `}>
            <div className="min-h-[100vh] min-w-[100vw] bg-white text-gray-800">
              {children}
            </div>
            <Toaster />
          </body>
        </html>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  );
}
