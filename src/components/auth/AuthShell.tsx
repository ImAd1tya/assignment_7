import Link from "next/link";

export default function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto flex w-full max-w-md flex-col gap-6 px-4 py-10">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold leading-8 text-[#1d271f]">{title}</h1>
        <p className="text-sm leading-5 text-[#1d271f]">{subtitle}</p>
      </header>
      <div className="rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] p-6">{children}</div>
      <Link href="/" className="text-sm text-[#1d271f] hover:underline">
        ← হোম পেজে ফিরে যান
      </Link>
    </main>
  );
}

export function FormSkeleton({ fields = 2 }: { fields?: number }) {
  return (
    <div className="flex flex-col gap-4" aria-busy="true">
      <p className="sr-only" role="status">লোড হচ্ছে…</p>
      {Array.from({ length: fields }).map((_, i) => (
        <div key={i} className="flex flex-col gap-1">
          <span className="h-5 w-20 animate-pulse rounded bg-[#e1e8e1]" />
          <span className="h-10 w-full animate-pulse rounded-lg bg-[#f0f5f0]" />
        </div>
      ))}
      <span className="h-10 w-full animate-pulse rounded-lg bg-[#e1e8e1]" />
    </div>
  );
}