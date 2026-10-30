"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import ProductGrid from "@/components/product/ProductGrid";
import { toBn } from "@/lib/format";
import { SORT_OPTIONS, sortByPrice, type SortKey } from "@/lib/sort";
import type { Product } from "@/types/bazardor";

export default function CategoryProducts({
  products,
  categoryName,
}: {
  products: Product[];
  categoryName: string;
}) {
  const [sort, setSort] = useState<SortKey>("default");
  const sorted = useMemo(() => sortByPrice(products, sort), [products, sort]);

  if (products.length === 0) {
    return (
      <section className="flex flex-col items-center gap-4 rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] px-5 py-12 text-center">
        <span aria-hidden className="text-5xl">🛒</span>
        <div>
          <h2 className="text-xl font-bold text-[#1d271f]">এই ক্যাটাগরিতে পণ্য পাওয়া যায়নি</h2>
          <p className="mt-2 text-sm text-[#1d271f]/70">
            “{categoryName}” ক্যাটাগরিটি খালি।
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex min-h-10 items-center rounded-lg bg-[#05893e] px-4 text-sm font-semibold text-white hover:bg-[#047f39] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#05893e]"
        >
          হোম পেজে ফিরে যান
        </Link>
      </section>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] p-[17px] sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-5 text-[#1d271f]">
          মোট {toBn(products.length)}টি পণ্য দেখানো হচ্ছে
        </p>
        <label className="flex items-center gap-2 text-sm text-[#1d271f]">
          সাজান
          <span className="relative">
            <select
              value={sort}
              onChange={(event) => {
                const option = SORT_OPTIONS.find(
                  ({ value }) => value === event.target.value,
                );
                if (option) setSort(option.value);
              }}
              className="h-10 appearance-none rounded-lg border border-[#ccd0cc] bg-[#fafcfa] pl-3 pr-9 text-sm text-[#1d271f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#05893e]"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <svg
              viewBox="0 0 20 20"
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 fill-current opacity-60"
              aria-hidden
            >
              <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z" />
            </svg>
          </span>
        </label>
      </div>
      <ProductGrid products={sorted} />
    </div>
  );
}
