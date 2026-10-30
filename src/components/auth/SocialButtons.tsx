"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { authErrorMessage, isRateLimitError } from "@/lib/auth-errors";

export type SocialProvider = "google" | "github";

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
    <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z" />
    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z" />
    <path fill="#FBBC05" d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z" />
    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75z" />
  </svg>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 16 16" className="h-4 w-4" fill="currentColor" aria-hidden>
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
  </svg>
);

export default function SocialButtons({
  callbackURL = "/",
  disabled,
  providers,
}: {
  callbackURL?: string;
  disabled?: boolean;
  providers: SocialProvider[];
}) {
  const [pending, setPending] = useState<SocialProvider | null>(null);

  const go = async (provider: SocialProvider) => {
    setPending(provider);
    try {
      const callback = new URL(callbackURL, window.location.origin);
      callback.searchParams.set("auth", "success");
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: `${callback.pathname}${callback.search}${callback.hash}`,
      });
      if (!error) return;
      toast.error(
        authErrorMessage(error) ||
          "সোশ্যাল লগইন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।",
        { id: "social-auth-error" },
      );
    } catch (error) {
      console.error("Social sign-in request failed", error);
      toast.error(
        isRateLimitError(error)
          ? authErrorMessage({ status: 429 })
          : "সোশ্যাল লগইন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।",
        { id: "social-auth-error" },
      );
    } finally {
      setPending(null);
    }
  };

  const btn =
    "inline-flex h-10 flex-1 items-center justify-center gap-1.5 rounded-lg border border-[#e1e8e1] bg-[#fafcfa] px-4 text-sm font-semibold text-[#1d271f] hover:bg-[#f0f5f0] disabled:opacity-60";

  if (providers.length === 0) return null;

  return (
    <div className="flex gap-2">
      {providers.includes("google") && (
        <button type="button" className={btn} disabled={disabled || pending !== null} onClick={() => go("google")}>
          <GoogleIcon /> {pending === "google" ? "অপেক্ষা করুন…" : "Google"}
        </button>
      )}
      {providers.includes("github") && (
        <button type="button" className={btn} disabled={disabled || pending !== null} onClick={() => go("github")}>
          <GitHubIcon /> {pending === "github" ? "অপেক্ষা করুন…" : "GitHub"}
        </button>
      )}
    </div>
  );
}

export function Divider() {
  return (
    <div className="flex items-center gap-4" role="separator">
      <span className="h-px flex-1 bg-[#e1e8e1]" />
      <span className="text-xs text-[#1d271f]">অথবা</span>
      <span className="h-px flex-1 bg-[#e1e8e1]" />
    </div>
  );
}