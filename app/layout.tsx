import type { Metadata } from "next";
import {Inter} from 'next/font/google'
import "./globals.css";
import { ReactNode } from "react";
import Providers from "@/components/providers/ImageKitProvider";
import Header from "@/components/layout/Header";

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const  RootLayout=({
  children,
}: Readonly<{
  children: ReactNode;
}>) =>{
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
export default RootLayout;