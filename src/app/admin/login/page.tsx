"use client";

import { useState } from "react";
import { FadeUp } from "@/components/animations/FadeUp";
import { adminLogin } from "@/lib/actions/registration";
import { ArrowRight, ShieldAlert, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(formData: FormData) {
    setIsLoading(true);
    setError(null);

    const result = await adminLogin(formData);

    if (result.error) {
      setError(result.error);
      setIsLoading(false);
    } else {
      router.push("/admin/dashboard");
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#08080C] px-6">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
      <div className="pointer-events-none absolute h-[500px] w-[500px] rounded-full bg-red-500/10 blur-[100px]" />
      
      <FadeUp className="w-full max-w-md">
        <div className="mb-10 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20">
            <ShieldAlert className="h-8 w-8 text-red-400" />
          </div>
          <h1 className="font-heading mb-4 text-4xl font-black text-white">Admin Portal</h1>
          <p className="text-gray-400">Restricted access. Coordinators and Admins only.</p>
        </div>

        <form action={onSubmit} className="glass-card relative z-10 space-y-6 rounded-[2rem] border border-white/10 p-8">
          {error && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm font-medium text-red-400">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="text-xs font-bold uppercase tracking-widest text-gray-400">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                required
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-heading text-lg font-bold tracking-widest text-white placeholder-gray-700 outline-none transition-colors focus:border-red-500/50 focus:bg-white/10"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="text-xs font-bold uppercase tracking-widest text-gray-400">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-heading text-lg font-bold tracking-widest text-white placeholder-gray-700 outline-none transition-colors focus:border-red-500/50 focus:bg-white/10"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-4 font-bold text-white transition-all hover:bg-red-500 disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                Authenticate
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </form>
      </FadeUp>
    </div>
  );
}
