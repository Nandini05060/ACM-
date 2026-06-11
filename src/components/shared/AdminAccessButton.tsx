import Link from "next/link";
import { Shield } from "lucide-react";

export function AdminAccessButton() {
  return (
    <Link
      href="/admin/login"
      aria-label="Admin Access"
      className="fixed bottom-6 right-6 z-50 flex h-8 w-8 items-center justify-center rounded-full border border-white/5 bg-black/40 text-gray-600 backdrop-blur-md transition-all hover:border-white/10 hover:bg-black/60 hover:text-gray-400 active:scale-95"
    >
      <Shield className="h-4 w-4" />
    </Link>
  );
}
