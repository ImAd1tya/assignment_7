// Shown by Next.js while the category page fetches.
export default function Loading() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6" aria-busy="true">
      <p className="sr-only" role="status">লোড হচ্ছে…</p>
      <div className="h-[94px] animate-pulse rounded-2xl border border-[#e1e8e1] bg-[#fafcfa]" />
      <div className="h-[66px] animate-pulse rounded-2xl border border-[#e1e8e1] bg-[#fafcfa]" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-[138px] animate-pulse rounded-2xl border border-[#e1e8e1] bg-[#fafcfa]" />
        ))}
      </div>
    </div>
  );
}