"use client";

import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import RedirectToast from "@/components/RedirectToast";

export default function ToastProvider() {
  return (
    <div data-rht-toaster>
      <Toaster position="top-center" />
      <Suspense fallback={null}>
        <RedirectToast />
      </Suspense>
    </div>
  );
}
