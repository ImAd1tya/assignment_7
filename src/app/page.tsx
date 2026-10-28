// src/app/page.tsx  (example wiring)
import Hero from "@/components/hero";

export default function Home() {
  return (
    <>
      <Hero />

      {/* Anchor target for the hero CTA. scroll-mt clears the sticky navbar + ticker. */}
      <section id="সব-পণ্য" className="mx-auto w-full max-w-6xl scroll-mt-40 px-4 py-8">
        <h2 className="mb-4 text-xl font-bold text-[#1d271f] sm:text-2xl">সব পণ্য</h2>

        {/* grid collapses 1 → 2 → 3 → 4 columns */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {/* product cards here */}
        </div>
      </section>
    </>
  );
}

// src/app/layout.tsx → add smooth scrolling on <html>:
//   <html lang="bn" className="scroll-smooth"> … </html>
// (also make sure <body> has no horizontal overflow: className="overflow-x-hidden")