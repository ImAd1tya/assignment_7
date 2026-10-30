import type { Metadata } from "next";
import { Suspense } from "react";
import { Hind_Siliguri } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/layout/footer";
import ToastProvider from "@/components/ToastProvider";
import "./globals.css";

const hind = Hind_Siliguri({ subsets: ["bengali", "latin"], weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "বাজার দর",
  description: "প্রয়োজনীয় পণ্যের দাম এক নজরে।",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn" className="scroll-smooth">
      <body className={`${hind.className} flex min-h-screen flex-col overflow-x-hidden bg-[#f0f5f0] text-[#1d271f]`}>
        <Suspense fallback={<div className="h-36 bg-[#fafcfa]" aria-hidden />}>
          <Navbar />
        </Suspense>
        <div className="flex-1">{children}</div>
        <Footer />
        <ToastProvider />
      </body>
    </html>
  );
}