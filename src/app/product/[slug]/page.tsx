import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProducts } from "@/lib/api";
import { toBn, UNIT_BN } from "@/lib/format";
import type { Product } from "@/types/bazardor";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export default function ProductDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense
      fallback={
        <main className="mx-auto w-full max-w-6xl px-4 py-10" aria-busy="true">
          <div className="h-40 animate-pulse rounded-3xl bg-[#f0f5f0]" />
        </main>
      }
    >
      <ProductDetailsContent params={params} />
    </Suspense>
  );
}

async function ProductDetailsContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const products = await getProducts();
  const product = products.find((item) => item.slug === slug);

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
            <p className="text-sm text-[#1d271f]/70">{product.categoryNameBn}</p>
            <h1 className="text-2xl font-bold text-[#1d271f] sm:text-3xl">
              {product.nameBn}
            </h1>
            <p className="mt-1 text-sm text-[#1d271f]/70">
              প্রতি {UNIT_BN[product.unit] ?? product.unit}
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {getPriceSummary(product).map(({ label, value }) => (
            <div key={label} className="rounded-2xl bg-[#f0f5f0] p-4">
              <p className="text-sm text-[#1d271f]/70">{label}</p>
              <p className="mt-1 text-xl font-bold text-[#1d271f]">
                {toBn(value)} টাকা
              </p>
            </div>
          ))}
        </div>
      </section>

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

function getPriceSummary(product: Product) {
  const markets = product.markets;
  const min = markets.length
    ? Math.min(...markets.map((market) => market.min))
    : product.today;
  const max = markets.length
    ? Math.max(...markets.map((market) => market.max))
    : product.today;
  const average = markets.length
    ? markets.reduce((total, market) => total + (market.min + market.max) / 2, 0) /
      markets.length
    : product.today;

  return [
    { label: "সর্বনিম্ন দাম", value: min },
    { label: "সর্বোচ্চ দাম", value: max },
    { label: "গড় দাম", value: average },
  ];
}
