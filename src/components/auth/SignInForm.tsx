"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import FormField from "@/components/auth/FormField";
import SocialButtons, { Divider } from "@/components/auth/SocialButtons";
import { authClient } from "@/lib/auth-client";
import {
  authErrorMessage,
  EMAIL_RE,
  isRateLimitError,
  safeRedirect,
} from "@/lib/auth-errors";

type SocialProvider = "google" | "github";

export default function SignInForm({
  enabledProviders,
}: {
  enabledProviders: SocialProvider[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pending, setPending] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    if (!EMAIL_RE.test(email) || password.length === 0) {
      toast.error("সঠিক ইমেইল ও পাসওয়ার্ড দিন।", { id: "signin-validation" });
      return;
    }

    setPending(true);
    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: safeRedirect(searchParams.get("redirect")),
      });

      if (error) {
        toast.error(authErrorMessage(error), { id: "signin-error" });
        return;
      }

      toast.success("সফলভাবে সাইন ইন হয়েছে।", { id: "signin-success" });
      router.replace(safeRedirect(searchParams.get("redirect")));
      router.refresh();
    } catch (error) {
      console.error("Sign-in request failed", error);
      toast.error(
        isRateLimitError(error)
          ? authErrorMessage({ status: 429 })
          : "সাইন ইন করা যায়নি। আবার চেষ্টা করুন।",
        { id: "signin-error" },
      );
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
        <FormField
          label="ইমেইল"
          id="email"
          type="email"
          autoComplete="email"
          required
          disabled={pending}
        />
        <FormField
          label="পাসওয়ার্ড"
          id="password"
          type="password"
          autoComplete="current-password"
          required
          disabled={pending}
        />
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-10 items-center justify-center rounded-lg bg-[#05893e] px-4 text-sm font-semibold text-white hover:bg-[#047f39] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "অপেক্ষা করুন…" : "সাইন ইন"}
        </button>
      </form>

      {enabledProviders.length > 0 && (
        <>
          <Divider />
          <SocialButtons
            callbackURL={safeRedirect(searchParams.get("redirect"))}
            disabled={pending}
            providers={enabledProviders}
          />
        </>
      )}

      <p className="text-center text-sm text-[#1d271f]">
        অ্যাকাউন্ট নেই?{" "}
        <Link href="/signup" className="font-semibold text-[#05893e] hover:underline">
          সাইন আপ করুন
        </Link>
      </p>
    </div>
  );
}
