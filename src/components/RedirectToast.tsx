"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

const MESSAGES: Record<string, string> = {
  "login-required": "এই পেজ দেখতে আগে সাইন ইন করুন।",
};

export default function RedirectToast() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const error = params.get("error");
  const authStatus = params.get("auth");

  useEffect(() => {
    if (!error && authStatus !== "success") return;
    if (error) {
      toast.error(MESSAGES[error] ?? "লগইন করা যায়নি, আবার চেষ্টা করুন", {
        id: `auth-${error}`,
      });
    } else {
      toast.success("সফলভাবে সাইন ইন হয়েছে।", { id: "auth-success" });
    }

    const nextParams = new URLSearchParams(params.toString());
    nextParams.delete("error");
    nextParams.delete("auth");
    const query = nextParams.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  }, [authStatus, error, params, pathname, router]);

  return null;
}