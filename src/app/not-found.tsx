
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 py-16 text-center">
      <div className="text-6xl">🛒</div>
      <h1 className="mt-4 text-5xl font-bold text-primary">৪০৪</h1>
      <h2 className="mt-2 text-xl font-semibold">পেজটি খুঁজে পাওয়া যায়নি</h2>
      <p className="mt-2 text-sm text-base-content/60">
        আপনি যে পেজটি খুঁজছেন তা সরানো হয়েছে অথবা লিংকটি ভুল।
      </p>
      <Link href="/" className="btn btn-primary mt-6">
        হোম পেজে ফিরে যান
      </Link>
    </main>
  );
}