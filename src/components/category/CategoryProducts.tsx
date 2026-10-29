"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import ProductGrid from "@/components/product/ProductGrid";
import { toBn } from "@/lib/format";
import type { Product } from "@/types/bazardor";

type Sort = "default" | "asc" | "desc";

export default function CategoryProducts({
  products,
  categoryName,
}: {
  products: Product[];
  categoryName: string;
}) {
  const [sort, setSort] = useState<Sort>("default");

  const sorted = useMemo(() => {
    if (sort === "default") return products;
    return [...products].sort((a, b) => (sort === "asc" ? a.today - b.today : b.today - a.today));
  }, [products, sort]);

  if (products.length === 0) {
    return (
      <section className="flex flex-col items-center gap-4 rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] px-5 py-12 text-center">
        <span aria-hidden className="text-5xl">🛒</span>
        <div>
          <h2 className="text-xl font-bold text-[#1d271f]">এই ক্যাটাগরিতে পণ্য পাওয়া যায়নি</h2>
          <p className="mt-2 text-sm text-[#1d271f]/70">
            “{categoryName}” ক্যাটাগরিটি খালি বা পাওয়া যায়নি।
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
        <p className="text-sm leading-5 text-[#1d271f]">মোট {toBn(products.length)}টি পণ্য দেখানো হচ্ছে</p>
        <label className="flex items-center gap-2 text-sm text-[#1d271f]">
          সাজান:
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="h-8 rounded-lg border border-[#ccd0cc] bg-[#fafcfa] px-3 text-xs text-[#1d271f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#05893e]"
          >
            <option value="default">ডিফল্ট</option>
            <option value="asc">দাম: কম থেকে বেশি</option>
            <option value="desc">দাম: বেশি থেকে কম</option>
          </select>
        </label>
      </div>
      <ProductGrid products={sorted} />
    </div>
  );
}