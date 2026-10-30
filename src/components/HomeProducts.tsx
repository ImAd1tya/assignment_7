"use client";

import { useEffect, useState } from "react";
import PriceMovers from "@/components/PriceMovers";
import ProductGrid from "@/components/ProductGrid";
import { getProducts } from "@/lib/api";
import { toBn } from "@/lib/format";
import type { Product } from "@/types/bazardor";

export default function HomeProducts() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;

    getProducts()
      .then((result) => {
        if (active) setProducts(result);
      })
      .catch(() => {
        if (active) setFailed(true);
      });

    return () => {
      active = false;
    };
  }, [attempt]);

  if (products === null && !failed) {
    return (
      <main
        className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 sm:py-10"
        aria-busy="true"
      >
        <p className="sr-only" role="status">
          পণ্য লোড হচ্ছে…
        </p>
        <div className="h-7 w-40 animate-pulse rounded bg-[#e1e8e1]" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <div
              key={index}
              className="h-[138px] animate-pulse rounded-2xl border border-[#e1e8e1] bg-[#fafcfa]"
            />
          ))}
        </div>
      </main>
    );
  }

  if (failed || products === null) {
    return (
      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:py-10">
        <div
          role="alert"
          className="rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] p-6 text-center text-[#1d271f]"
        >
          <p>দাম লোড করা যায়নি। একটু পরে আবার চেষ্টা করুন।</p>
          <button
            type="button"
            onClick={() => {
              setFailed(false);
              setProducts(null);
              setAttempt((current) => current + 1);
            }}
            className="mt-3 rounded-lg bg-[#05893e] px-4 py-2 text-sm font-semibold text-white hover:bg-[#047f39]"
          >
            আবার চেষ্টা করুন
          </button>
        </div>
      </main>
    );
  }

  const risers = products
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct))
    .slice(0, 6);
  const fallers = products
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct))
    .slice(0, 6);

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-8 sm:py-10">
      <PriceMovers title="আজ দাম বেড়েছে" direction="up" products={risers} />
      <PriceMovers title="আজ দাম কমেছে" direction="down" products={fallers} />
      <section
        id="সব-পণ্য"
        aria-labelledby="all-products"
        className="flex scroll-mt-40 flex-col gap-3"
      >
        <h2 id="all-products" className="text-xl font-bold leading-7 text-[#1d271f]">
          সব পণ্য
        </h2>
        <p className="text-sm leading-5 text-[#1d271f]/70">
          বাজারের সব নিত্যপ্রয়োজনীয় পণ্যের আজকের দাম ও পরিবর্তন দেখুন।
        </p>
        <p className="text-sm leading-5 text-[#1d271f]/70">
          মোট {toBn(products.length)}টি পণ্য দেখানো হচ্ছে
        </p>
        <ProductGrid products={products} />
      </section>
    </main>
  );
}
