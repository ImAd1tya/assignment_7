"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import FormField from "@/components/auth/FormField";
import SocialButtons, { Divider } from "@/components/auth/SocialButtons";
import { authClient } from "@/lib/auth-client";
import { authErrorMessage, EMAIL_RE, isRateLimitError } from "@/lib/auth-errors";

type SocialProvider = "google" | "github";

export default function SignUpForm({
  enabledProviders,
}: {
  enabledProviders: SocialProvider[];
}) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    if (name.length === 0 || !EMAIL_RE.test(email) || password.length < 8) {
      toast.error("নাম, সঠিক ইমেইল এবং কমপক্ষে ৮ অক্ষরের পাসওয়ার্ড দিন।", {
        id: "signup-validation",
      });
      return;
    }

    setPending(true);
    try {
      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
        callbackURL: "/",
      });

      if (error) {
        toast.error(authErrorMessage(error), { id: "signup-error" });
        return;
      }

      toast.success("অ্যাকাউন্ট তৈরি হয়েছে। এখন সাইন ইন করুন।", {
        id: "signup-success",
      });
      router.push("/signin");
    } catch (error) {
      console.error("Sign-up request failed", error);
      toast.error(
        isRateLimitError(error)
          ? authErrorMessage({ status: 429 })
          : "অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করুন।",
        { id: "signup-error" },
      );
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
        <FormField
          label="নাম"
          id="name"
          type="text"
          autoComplete="name"
          required
          disabled={pending}
        />
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
          autoComplete="new-password"
          minLength={8}
          required
          disabled={pending}
        />
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-10 items-center justify-center rounded-lg bg-[#05893e] px-4 text-sm font-semibold text-white hover:bg-[#047f39] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "অপেক্ষা করুন…" : "সাইন আপ"}
        </button>
      </form>

      {enabledProviders.length > 0 && (
        <>
          <Divider />
          <SocialButtons disabled={pending} providers={enabledProviders} />
        </>
      )}

      <p className="text-center text-sm text-[#1d271f]">
        আগে থেকেই অ্যাকাউন্ট আছে?{" "}
        <Link href="/signin" className="font-semibold text-[#05893e] hover:underline">
          সাইন ইন করুন
        </Link>
      </p>
    </div>
  );
}
