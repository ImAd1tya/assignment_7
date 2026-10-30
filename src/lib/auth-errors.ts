
export function authErrorMessage(error: { code?: string; message?: string; status?: number }) {
  const code = error.code ?? "";
  if (code === "INVALID_EMAIL_OR_PASSWORD" || error.status === 401)
    return "ইমেইল বা পাসওয়ার্ড সঠিক নয়।";
  if (code.startsWith("USER_ALREADY_EXISTS"))
    return "এই ইমেইল দিয়ে আগে থেকেই অ্যাকাউন্ট আছে।";
  if (code === "PASSWORD_TOO_SHORT") return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।";
  if (code === "INVALID_EMAIL") return "সঠিক ইমেইল দিন।";
  return error.message || "কিছু একটা ভুল হয়েছে। আবার চেষ্টা করুন।";
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function safeRedirect(path: string | null) {
  return path && path.startsWith("/") && !path.startsWith("//") ? path : "/";
}