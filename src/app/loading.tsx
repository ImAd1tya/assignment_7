export default function Loading() {
  return (
    <main
      className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 sm:py-10"
      aria-busy="true"
    >
      <p className="sr-only" role="status">
        পণ্য লোড হচ্ছে…
      </p>
      <section className="grid min-h-64 grid-cols-1 items-center gap-6 rounded-3xl border border-[#e1e8e1] bg-[#fafcfa] p-6 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <div className="h-5 w-36 animate-pulse rounded bg-[#e1e8e1]" />
          <div className="h-10 w-full max-w-md animate-pulse rounded bg-[#e1e8e1]" />
          <div className="h-4 w-full max-w-lg animate-pulse rounded bg-[#e1e8e1]" />
        </div>
        <div className="h-40 animate-pulse rounded-2xl bg-[#f0f5f0]" />
      </section>
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
