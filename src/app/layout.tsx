import { Suspense } from "react";
import { Hind_Siliguri } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/layout/footer";
import "./globals.css";

const hind = Hind_Siliguri({ subsets: ["bengali", "latin"], weight: ["400", "500", "600", "700"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn" data-theme="bazardor">
      <body className={`${hind.className} flex min-h-screen flex-col`}>
        <Suspense fallback={<div className="h-36 bg-[#fafcfa]" aria-hidden />}>
          <Navbar />
        </Suspense>
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}