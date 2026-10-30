import ProductGridSkeleton from "@/components/common/ProductGridSkeleton";

export default function HomeLoading() {
  return (
    <main className="mx-auto max-w-6xl space-y-10 px-4 py-8">
      <div className="skeleton h-56 w-full rounded-2xl" />

      <section>
        <div className="skeleton mb-4 h-7 w-48" />
        <ProductGridSkeleton count={3} />
      </section>

      <section>
        <div className="skeleton mb-4 h-7 w-48" />
        <ProductGridSkeleton count={3} />
      </section>

      <section>
        <div className="skeleton mb-4 h-7 w-40" />
        <ProductGridSkeleton count={6} />
      </section>
    </main>
  );
}