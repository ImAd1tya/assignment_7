import { Hind_Siliguri } from "next/font/google";
import Navbar from "@/components/Navbar";
   import "./globals.css";
const hind = Hind_Siliguri({ subsets: ["bengali", "latin"], weight: ["400", "500", "600", "700"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn" data-theme="bazardor">
      <body className={hind.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}