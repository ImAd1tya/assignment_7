
export function authErrorMessage(error: { code?: string; message?: string; status?: number }) {
  const code = error.code ?? "";
  if (
    error.status === 429 ||
    code === "TOO_MANY_REQUESTS" ||
    error.message === "Too many requests. Please try again later."
  ) {
    return "অনেকবার চেষ্টা করা হয়েছে। ১০ সেকেন্ড অপেক্ষা করে আবার চেষ্টা করুন।";
  }
  if (code === "INVALID_EMAIL_OR_PASSWORD" || error.status === 401)
    return "ইমেইল বা পাসওয়ার্ড সঠিক নয়।";
  if (code.startsWith("USER_ALREADY_EXISTS"))
    return "এই ইমেইল দিয়ে আগে থেকেই অ্যাকাউন্ট আছে।";
  if (code === "PASSWORD_TOO_SHORT") return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।";
  if (code === "INVALID_EMAIL") return "সঠিক ইমেইল দিন।";
  return error.message || "কিছু একটা ভুল হয়েছে। আবার চেষ্টা করুন।";
}

export function isRateLimitError(error: unknown): boolean {
  if (typeof error !== "object" || error === null) return false;
  const candidate = error as { code?: unknown; message?: unknown; status?: unknown };
  return (
    candidate.status === 429 ||
    candidate.code === "TOO_MANY_REQUESTS" ||
    candidate.message === "Too many requests. Please try again later."
  );
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function safeRedirect(path: string | null) {
  return path && path.startsWith("/") && !path.startsWith("//") ? path : "/";
}