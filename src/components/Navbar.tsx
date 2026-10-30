"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { toast } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { API } from "@/lib/api";

export type Category = { id: string; slug: string; nameBn: string; icon: string };

export type Product = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  image: string; 
  unit: string; 
  today: number;
  change: { dir: "up" | "down" | "flat"; pct: number };
};

const UNIT_BN: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

export type NavUser = { name: string; email?: string; avatarUrl?: string };


const toBn = (n: number, decimals = 0) =>
  n.toLocaleString("bn-BD", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

function banglaDate(d = new Date()) {
  const parts = new Intl.DateTimeFormat("bn-BD", {
    timeZone: "Asia/Dhaka",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).formatToParts(d);
  const p: Record<string, string> = {};
  parts.forEach((x) => (p[x.type] = x.value));
  return `${p.weekday}, ${p.day} ${p.month}, ${p.year}`;
}

const subscribeToDate = () => () => {};
const getDateSnapshot = () => banglaDate();
const getServerDateSnapshot = () => "";

function useBazardorData() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const ctrl = new AbortController();
    let active = true;
    const timeout = window.setTimeout(() => ctrl.abort(), 10_000);
    (async () => {
      try {
        const [c, p] = await Promise.all([
          fetch(`${API}/categories`, { signal: ctrl.signal }),
          fetch(`${API}/products`, { signal: ctrl.signal }),
        ]);
        if (!c.ok || !p.ok) {
          throw new Error(`Market data request failed (${c.status}, ${p.status})`);
        }
        const [categoryData, productData] = await Promise.all([c.json(), p.json()]);
        if (!Array.isArray(categoryData) || !Array.isArray(productData)) {
          throw new Error("Market data response must contain category and product arrays");
        }
        if (active) {
          setCategories(categoryData);
          setProducts(productData);
        }
      } catch {
        if (active) setError(true);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
      window.clearTimeout(timeout);
      ctrl.abort();
    };
  }, []);

  return { categories, products, loading, error };
}




export default function Navbar({
  user,
  onSignOut,
}: {
  user?: NavUser | null;
  onSignOut?: () => void;
}) {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  const sessionUser = session?.user
    ? {
        name: session.user.name,
        email: session.user.email,
        avatarUrl: session.user.image ?? undefined,
      }
    : null;
  const activeUser = user ?? sessionUser;
  const { categories, products, loading, error } = useBazardorData();

  const date = useSyncExternalStore(
    subscribeToDate,
    getDateSnapshot,
    getServerDateSnapshot,
  );

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!menuOpen) return;
    const onDown = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const active = categories.find((c) => pathname.startsWith(`/category/${c.slug}`))?.slug;

  async function handleSignOut() {
    setMenuOpen(false);
    if (onSignOut) {
      onSignOut();
      return;
    }

    try {
      const { error: signOutError } = await authClient.signOut();
      if (signOutError) {
        toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
        return;
      }
      toast.success("সফলভাবে সাইন আউট হয়েছে।");
    } catch (error) {
      console.error("Sign-out request failed", error);
      toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
    }
  }

  return (
    <div className="sticky top-0 z-50">
      <style>{`
        @keyframes bazardor-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .bazardor-marquee { animation: bazardor-marquee var(--marquee-duration, 90s) linear infinite; }
        .bazardor-marquee:hover { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) { .bazardor-marquee { animation: none; } }
      `}</style>

      <header className="border-b border-[#e1e8e1] bg-[#fafcfa]">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#05893e] text-lg text-[#f3fbf4]">
              <span aria-hidden>🛒</span>
            </span>
            <span className="flex flex-col">
              <span className="text-xl font-bold leading-7 tracking-[-0.5px] text-[#1d271f]">
                বাজার দর
              </span>
              <span className="text-xs leading-4 text-[#1d271f]">{date || "\u00A0"}</span>
            </span>
          </Link>

          <div className="ml-auto flex items-center gap-2">
            {activeUser ? (
              <div className="relative" ref={menuRef}>
                <button
                  type="button"
                  onClick={() => setMenuOpen((o) => !o)}
                  aria-haspopup="menu"
                  aria-expanded={menuOpen}
                  className="flex h-10 items-center gap-2 rounded-lg px-[17px] hover:bg-[#f0f5f0]"
                >
                  {activeUser.avatarUrl ? (
                    <Image
                      src={activeUser.avatarUrl}
                      alt=""
                      width={36}
                      height={36}
                      unoptimized
                      className="h-9 w-9 rounded-[10.5px] object-cover"
                    />
                  ) : (
                    <span className="flex h-9 w-9 items-center justify-center rounded-[10.5px] bg-[#05893e] text-sm font-semibold text-[#f3fbf4]">
                      {activeUser.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                  <span className="hidden text-sm font-medium text-[#1d271f] sm:inline">{activeUser.name}</span>
                  <span aria-hidden className="text-xs font-semibold text-[#1d271f]">▾</span>
                </button>

                {menuOpen && (
                  <div
                    role="menu"
                    className="absolute right-0 top-full mt-2 w-64 rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] p-[9px] shadow-lg"
                  >
                    <div className="px-3 py-2">
                      <p className="text-sm font-semibold text-[#1d271f]">{activeUser.name}</p>
                      {activeUser.email && <p className="text-xs text-[#1d271f]/70">{activeUser.email}</p>}
                    </div>
                    <Link
                      href="/profile"
                      role="menuitem"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm text-[#1d271f] hover:bg-[#f0f5f0]"
                    >
                      <span aria-hidden>👤</span> আমার প্রোফাইল
                    </Link>
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => void handleSignOut()}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-sm text-[#1d271f] hover:bg-[#f0f5f0]"
                    >
                      <span aria-hidden>↩</span> সাইন আউট
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="inline-flex h-8 items-center rounded-lg px-[13px] text-xs font-semibold text-[#1d271f] hover:bg-[#f0f5f0] sm:h-10 sm:px-[17px] sm:text-sm"
                >
                  সাইন ইন
                </Link>
                <Link
                  href="/signup"
                  className="inline-flex h-8 items-center rounded-lg border border-[#047f39] bg-[#05893e] px-[13px] text-xs font-semibold text-[#f3fbf4] hover:bg-[#047f39] sm:h-10 sm:px-[17px] sm:text-sm"
                >
                  সাইন আপ
                </Link>
              </>
            )}
          </div>
        </div>

        <nav aria-label="ক্যাটাগরি" className="border-t border-[#f0f5f0]">
          <div className="mx-auto max-w-6xl px-4">
            <ul className="flex min-h-12 items-center gap-1 overflow-x-auto py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {loading
                ? Array.from({ length: 8 }).map((_, i) => (
                    <li key={i} className="shrink-0">
                      <span className="block h-8 w-[72px] animate-pulse rounded-lg bg-[#f0f5f0]" />
                    </li>
                  ))
                : error && categories.length === 0
                  ? (
                    <li role="status" className="px-3 text-xs text-[#1d271f]/70">
                      ক্যাটাগরি লোড করা যায়নি।
                    </li>
                  )
                : categories.map((c) => {
                    const isActive = active === c.slug;
                    return (
                      <li key={c.id} className="shrink-0">
                        <Link
                          href={`/category/${c.slug}`}
                          aria-current={isActive ? "page" : undefined}
                          className={
                            "inline-flex h-8 items-center gap-1.5 rounded-lg border px-[13px] text-xs font-semibold leading-[18px] transition-colors " +
                            (isActive
                              ? "border-[#047c37] bg-[#047f39] text-[#f3fbf4]"
                              : "border-transparent text-[#1d271f] hover:border-[#ccd0cc] hover:bg-[#dadeda]")
                          }
                        >
                          <span aria-hidden>{c.icon}</span>
                          {c.nameBn}
                        </Link>
                      </li>
                    );
                  })}
            </ul>
          </div>
        </nav>
      </header>

      <section
        aria-label="আজকের বাজার দর"
        className="min-h-[37px] overflow-hidden border-b border-[#e1e8e1] bg-[#fafcfa]"
      >
        {products.length > 0 && (
          <div
            className="bazardor-marquee flex w-max"
            style={{ ["--marquee-duration" as string]: `${Math.max(40, products.length * 3)}s` }}
          >
            {[0, 1].map((copy) => (
              <ul key={copy} className="flex shrink-0" aria-hidden={copy === 1}>
                {products.map((p) => {
                  const { dir, pct } = p.change;
                  return (
                    <li
                      key={`${copy}-${p.id}`}
                      className="flex items-center gap-1.5 whitespace-nowrap border-r border-[#f0f5f0] px-4 py-2 text-sm leading-5 text-[#1d271f]"
                    >
                      <span aria-hidden>{p.image}</span>
                      <span className="font-medium">{p.nameBn}</span>
                      <span>
                        {toBn(p.today)} টাকা/{UNIT_BN[p.unit] ?? p.unit}
                      </span>
                      {dir === "flat" ? (
                        <span className="font-semibold text-[#1d271f]/60">— {toBn(0, 1)}%</span>
                      ) : (
                        <span
                          className={`font-semibold ${dir === "up" ? "text-[#d03739]" : "text-[#05893e]"}`}
                        >
                          {dir === "up" ? "▲" : "▼"} {toBn(Math.abs(pct), 1)}%
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}