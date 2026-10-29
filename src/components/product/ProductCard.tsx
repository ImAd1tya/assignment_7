import Link from "next/link";
import type { Product } from "@/types/bazardor";
import { TREND, UNIT_BN, toBn } from "@/lib/format";

export default function ProductCard({ product: p }: { product: Product }) {
  const { dir, pct } = p.change;
  const t = TREND[dir];

  return (
    <Link
      href={`/product/${p.slug}`}
      className="group block rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] transition-colors hover:border-[#05893e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#05893e]"
    >
      <div className="flex flex-col gap-3 p-4">
      
        <div className="flex items-center gap-3">
          <span
            aria-hidden
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0] text-2xl"
          >
            {p.image}
          </span>
          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold leading-6 text-[#1d271f]">{p.nameBn}</h3>
            <p className="text-xs leading-4 text-[#1d271f]">প্রতি {UNIT_BN[p.unit] ?? p.unit}</p>
          </div>
        </div>

        <div className="flex items-end gap-2">
          <div>
            <p className="text-xs leading-4 text-[#1d271f]">আজকের দাম</p>
            <p className="text-xl font-bold leading-7 text-[#1d271f]">{toBn(p.today)} টাকা</p>
          </div>
          <span
            className={`mb-1 inline-flex h-6 items-center gap-1 rounded-full bg-[#f0f5f0] px-2 text-xs font-semibold ${t.color}`}
          >
            <span aria-hidden>{t.symbol}</span>
            {toBn(Math.abs(pct), 1)}%
          </span>
        </div>
      </div>
    </Link>
  );
}