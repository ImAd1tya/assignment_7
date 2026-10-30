import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/api";
import { toBn, UNIT_BN } from "@/lib/format";
import PriceSummary from "@/components/product/PriceSummary";
import type { Product } from "@/types/bazardor";

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense fallback={<ProductLoading />}>
      <ProductContent params={params} />
    </Suspense>
  );
}

async function ProductContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 sm:py-10">
      <Link
        href="/#সব-পণ্য"
        className="w-fit rounded-lg text-sm font-semibold text-[#05893e] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#05893e]"
      >
        ← সব পণ্যে ফিরে যান
      </Link>

      <section className="rounded-3xl border border-[#e1e8e1] bg-[#fafcfa] p-5 sm:p-8">
        <div className="flex flex-wrap items-center gap-4">
          <span
            aria-hidden
            className="grid h-16 w-16 place-items-center rounded-2xl bg-[#f0f5f0] text-4xl"
          >
            {product.image}
          </span>
          <div>
            <h1 className="text-2xl font-bold text-[#1d271f] sm:text-3xl">
              {product.nameBn}
            </h1>
            <p className="mt-1 text-sm leading-6 text-[#1d271f]/70">
              {getMarketSummary(product)}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-[#e8f4eb] px-3 py-1 text-xs font-semibold text-[#05893e]">
                <span aria-hidden>{product.categoryIcon}</span>
                {product.categoryNameBn}
              </span>
              <span className="rounded-full bg-[#f0f5f0] px-3 py-1 text-xs font-medium text-[#1d271f]">
                প্রতি {UNIT_BN[product.unit] ?? product.unit}
              </span>
            </div>
          </div>
        </div>
      </section>

      <PriceSummary markets={product.markets} fallbackPrice={product.today} />

      <section aria-labelledby="market-prices" className="flex flex-col gap-4">
        <div>
          <h2 id="market-prices" className="text-xl font-bold text-[#1d271f]">
            বাজারভিত্তিক আজকের দাম
          </h2>
          <p className="mt-1 text-sm text-[#1d271f]/70">
            বিভিন্ন বাজারে {product.nameBn}-এর সর্বনিম্ন ও সর্বোচ্চ দাম।
          </p>
        </div>

        {product.markets.length > 0 ? (
          <div className="overflow-x-auto rounded-2xl border border-[#e1e8e1]">
            <table className="w-full min-w-[32rem] text-left text-sm">
              <thead className="bg-[#f0f5f0] text-[#1d271f]">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">বাজার</th>
                  <th scope="col" className="px-4 py-3 font-semibold">বিভাগ</th>
                  <th scope="col" className="px-4 py-3 font-semibold">সর্বনিম্ন</th>
                  <th scope="col" className="px-4 py-3 font-semibold">সর্বোচ্চ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e1e8e1] bg-[#fafcfa]">
                {product.markets.map((market) => (
                  <tr key={`${market.market}-${market.division}`}>
                    <td className="px-4 py-3 font-medium text-[#1d271f]">{market.market}</td>
                    <td className="px-4 py-3 text-[#1d271f]/70">{market.division}</td>
                    <td className="px-4 py-3 text-[#1d271f]">{toBn(market.min)} টাকা</td>
                    <td className="px-4 py-3 text-[#1d271f]">{toBn(market.max)} টাকা</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] p-5 text-sm text-[#1d271f]/70">
            এই পণ্যের জন্য এখনো বাজারভিত্তিক দামের তথ্য নেই।
          </p>
        )}
      </section>
    </main>
  );
}

function ProductLoading() {
  return (
    <main
      className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 sm:py-10"
      aria-busy="true"
      aria-label="পণ্যের তথ্য লোড হচ্ছে"
    >
      <div className="h-7 w-36 animate-pulse rounded bg-[#e1e8e1]" />
      <div className="h-40 animate-pulse rounded-3xl bg-[#e1e8e1]" />
      <div className="h-32 animate-pulse rounded-2xl bg-[#e1e8e1]" />
    </main>
  );
}

function getMarketSummary(product: Product) {
  const divisions = [...new Set(product.markets.map((market) => market.division))];

  if (product.markets.length === 0) {
    return `আজকের বাজারদর ও পরিবর্তনের সারসংক্ষেপ: ${product.nameBn}।`;
  }

  const divisionSummary = divisions.length
    ? `${divisions.join(" ও ")} বিভাগের `
    : "";
  return `${divisionSummary}${product.markets.length}টি বাজারের আজকের দামের সারসংক্ষেপ।`;
}
