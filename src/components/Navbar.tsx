"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import logo from "@/assets/logo-icon.png";

/* ---------- Data ---------- */

export type Category = { slug: string; emoji: string; label: string };

export const CATEGORIES: Category[] = [
  { slug: "rice", emoji: "🍚", label: "চাল" },
  { slug: "pulses", emoji: "🫘", label: "ডাল" },
  { slug: "oil", emoji: "🛢️", label: "তেল" },
  { slug: "vegetables", emoji: "🥬", label: "সবজি" },
  { slug: "fish", emoji: "🐟", label: "মাছ" },
  { slug: "meat", emoji: "🍗", label: "মাংস" },
  { slug: "dairy-eggs", emoji: "🥛", label: "ডিম-দুধ" },
  { slug: "spices", emoji: "🌶️", label: "মসলা" },
];

export type TickerItem = {
  emoji: string;
  name: string;
  price: number; // টাকা
  unit: string; // কেজি / লিটার / ডজন
  change: number; // % — positive = ▲, negative = ▼
};

// First 6 are from the Figma; the rest are sample data — replace with your API/DB data.
export const DEFAULT_TICKER: TickerItem[] = [
  { emoji: "🍚", name: "স্বর্ণমাছি চাল", price: 148, unit: "কেজি", change: 2.1 },
  { emoji: "🍚", name: "মিনিকেট চাল", price: 99, unit: "কেজি", change: -2.9 },
  { emoji: "🍚", name: "বাটাম সাইজ চাল", price: 66, unit: "কেজি", change: 3.1 },
  { emoji: "🫘", name: "মসুর ডাল", price: 142, unit: "কেজি", change: 2.9 },
  { emoji: "🫘", name: "ছোলা", price: 120, unit: "কেজি", change: -2.4 },
  { emoji: "🫘", name: "আমন ডাল (খোসাসিলা)", price: 156, unit: "কেজি", change: 2.6 },
  { emoji: "🛢️", name: "সয়াবিন তেল", price: 170, unit: "লিটার", change: -1.2 },
  { emoji: "🥬", name: "আলু", price: 55, unit: "কেজি", change: 1.8 },
  { emoji: "🧅", name: "পেঁয়াজ", price: 78, unit: "কেজি", change: 3.4 },
  { emoji: "🐟", name: "রুই মাছ", price: 320, unit: "কেজি", change: -0.9 },
  { emoji: "🍗", name: "ব্রয়লার মুরগি", price: 190, unit: "কেজি", change: 1.5 },
  { emoji: "🥛", name: "ডিম", price: 135, unit: "ডজন", change: -0.6 },
  { emoji: "🌶️", name: "শুকনো মরিচ", price: 420, unit: "কেজি", change: 2.2 },
];

/* ---------- Helpers ---------- */

// 148 -> "১৪৮", 2.1 -> "২.১"
const toBn = (n: number, decimals = 0) =>
  n.toLocaleString("bn-BD", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

// "মঙ্গলবার, ২৭ অক্টোবর, ২০২৬"
function banglaDate(d = new Date()) {
  const parts = new Intl.DateTimeFormat("bn-BD", {
    timeZone: "Asia/Dhaka",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).formatToParts(d);
  const p: Record<string, string> = {};
  parts.forEach((x) => (p[x.type] = x.value));
  return `${p.weekday}, ${p.day} ${p.month}, ${p.year}`;
}

/* ---------- Component ---------- */

export default function Navbar({ ticker = DEFAULT_TICKER }: { ticker?: TickerItem[] }) {
  const pathname = usePathname();

  const [date, setDate] = useState("");
  useEffect(() => setDate(banglaDate()), []); // after mount → no hydration mismatch

  // Active category comes from the URL: /category/rice -> "rice"
  const active = CATEGORIES.find((c) => pathname.startsWith(`/category/${c.slug}`))?.slug;

  return (
    <div className="sticky top-0 z-50">
      {/* marquee animation */}
      <style>{`
        @keyframes bazardor-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .bazardor-marquee { animation: bazardor-marquee 50s linear infinite; }
        .bazardor-marquee:hover { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) { .bazardor-marquee { animation: none; } }
      `}</style>

      {/* ================= HEADER ================= */}
      <header className="border-b border-base-300 bg-base-100/95 backdrop-blur">
        {/* Row 1: logo + date (left), auth buttons (right) */}
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
          <Link href="/" className="flex items-center gap-2">
            <Image src={logo} alt="বাজার দর" priority className="h-10 w-10 rounded-xl object-contain" />
            <span className="flex flex-col">
              <span className="text-xl font-bold leading-7 tracking-[-0.5px] text-base-content">বাজার দর</span>
              <span className="text-xs leading-4 text-base-content/60">{date || "\u00A0"}</span>
            </span>
          </Link>

          <div className="ml-auto flex items-center gap-2">
            <Link href="/sign-in" className="btn btn-ghost btn-sm text-xs sm:btn-md sm:text-sm">
              সাইন ইন
            </Link>
            <Link href="/sign-up" className="btn btn-primary btn-sm text-xs sm:btn-md sm:text-sm">
              সাইন আপ
            </Link>
          </div>
        </div>

        {/* Row 2: category links */}
        <nav aria-label="ক্যাটাগরি" className="border-t border-base-200">
          <div className="mx-auto max-w-6xl px-4">
            <ul className="flex items-center gap-1 overflow-x-auto py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {CATEGORIES.map((c) => {
                const isActive = active === c.slug;
                return (
                  <li key={c.slug} className="shrink-0">
                    <Link
                      href={`/category/${c.slug}`}
                      aria-current={isActive ? "page" : undefined}
                      className={
                        "inline-flex h-8 items-center gap-1.5 rounded-lg border px-3 text-xs font-semibold leading-[17px] transition-colors " +
                        (isActive
                          ? "border-primary bg-primary text-primary-content" // active = filled green
                          : "border-transparent text-base-content hover:border-base-300 hover:bg-base-200")
                      }
                    >
                      <span aria-hidden>{c.emoji}</span>
                      {c.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </header>

      {/* ================= PRICE TICKER (marquee) ================= */}
      <section aria-label="আজকের বাজার দর" className="overflow-hidden border-b border-base-300 bg-base-100">
        {/* List is rendered twice; sliding by -50% makes the loop seamless */}
        <div className="bazardor-marquee flex w-max">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex shrink-0" aria-hidden={copy === 1}>
              {ticker.map((t) => {
                const up = t.change >= 0;
                return (
                  <li
                    key={`${copy}-${t.name}`}
                    className="flex items-center gap-1.5 whitespace-nowrap border-r border-base-200 px-4 py-2 text-sm leading-5 text-base-content"
                  >
                    <span>{t.emoji}</span>
                    <span className="font-medium">{t.name}</span>
                    <span className="text-base-content/70">
                      {toBn(t.price)} টাকা/{t.unit}
                    </span>
                    <span className={`font-semibold ${up ? "text-error" : "text-success"}`}>
                      {up ? "▲" : "▼"} {toBn(Math.abs(t.change), 1)}%
                    </span>
                  </li>
                );
              })}
            </ul>
          ))}
        </div>
      </section>
    </div>
  );
}