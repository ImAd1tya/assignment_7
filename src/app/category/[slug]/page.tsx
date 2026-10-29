import { Suspense } from "react";
import { getProducts } from "@/lib/api";
import CategoryProducts from "@/components/category/CategoryProducts";

export default function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense fallback={<CategoryLoading />}>
      <CategoryContent params={params} />
    </Suspense>
  );
}

async function CategoryContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const products = await getProducts();
  const categoryProducts = products.filter((product) => product.category === slug);
  const category = categoryProducts[0];
  const categoryName =
    category?.categoryNameBn ??
    slug.replaceAll("-", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
  const categoryIcon = category?.categoryIcon ?? "🛒";

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:py-10">
      <header className="flex items-center gap-4 rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] p-5 sm:p-6">
        <span
          aria-hidden
          className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-[#f0f5f0] text-3xl"
        >
          {categoryIcon}
        </span>
        <div>
          <p className="text-sm text-[#1d271f]/70">ক্যাটাগরি</p>
          <h1 className="text-2xl font-bold text-[#1d271f]">{categoryName}</h1>
        </div>
      </header>

      <CategoryProducts products={categoryProducts} categoryName={categoryName} />
    </main>
  );
}

function CategoryLoading() {
  return (
    <main
      className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:py-10"
      aria-busy="true"
      aria-label="ক্যাটাগরি লোড হচ্ছে"
    >
      <div className="h-24 animate-pulse rounded-2xl bg-[#f0f5f0]" />
      <div className="h-16 animate-pulse rounded-2xl bg-[#f0f5f0]" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }, (_, index) => (
          <div
            key={index}
            className="h-36 animate-pulse rounded-2xl border border-[#e1e8e1] bg-[#f0f5f0]"
          />
        ))}
      </div>
    </main>
  );
}
