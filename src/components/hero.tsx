"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import heroImg from "@/assets/bazar-hero.png";

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

export default function Hero() {
  const [date, setDate] = useState("");
  useEffect(() => setDate(banglaDate()), []);

  return (
    <section
      aria-labelledby="hero-title"
      className="mx-auto w-full max-w-6xl px-4 pt-6 sm:pt-8"
    >
      <div className="overflow-hidden rounded-3xl border border-[#e1e8e1] bg-[#fafcfa]">
        <div className="grid items-center gap-6 px-4 py-8 sm:px-8 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] md:gap-6 md:py-10">
          {/* Text */}
          <div className="flex flex-col items-start gap-2">
            {/* Eyebrow */}
            <span className="inline-flex min-h-7 items-center rounded-full bg-[#05893e]/10 px-3 py-1 text-sm font-medium leading-5 text-[#05893e]">
              {date || "\u00A0"}
            </span>

            <h1
              id="hero-title"
              className="text-3xl font-bold leading-tight text-[#1d271f] sm:text-4xl sm:leading-[45px]"
            >
              আজকের বাজারের দাম এক নজরে
            </h1>

            <p className="mt-1 max-w-xl text-base leading-6 text-[#1d271f]">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়,
              সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>

            <a
              href="#সব-পণ্য"
              className="btn btn-primary btn-sm mt-3 border-[#047f39] bg-[#05893e] text-[#f3fbf4] hover:bg-[#047f39] sm:btn-md"
            >
              সব পণ্য দেখুন
            </a>
          </div>

          <div className="mx-auto w-full max-w-[315px] md:max-w-none md:justify-self-end">
            <Image
              src={heroImg}
              alt="বাজারের তাজা পণ্য — সবজি, ফল ও ঝুড়ি"
              priority
              sizes="(min-width: 768px) 315px, 80vw"
              className="h-auto w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}