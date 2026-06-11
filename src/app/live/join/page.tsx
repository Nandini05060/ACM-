"use client";

import { useState } from "react";
import { FadeUp } from "@/components/animations/FadeUp";
import { joinEvent } from "@/lib/actions/registration";
import { ArrowRight, KeyRound, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function JoinEventPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(formData: FormData) {
    setIsLoading(true);
    setError(null);

    const result = await joinEvent(formData);

    if (result.error) {
      setError(result.error);
      setIsLoading(false);
    } else {
      router.push("/live");
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#08080C] px-6">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
      <div className="pointer-events-none absolute h-[500px] w-[500px] rounded-full bg-brand-purple/10 blur-[100px]" />
      
      <FadeUp className="w-full max-w-md">
        <div className="mb-10 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-purple/20">
            <KeyRound className="h-8 w-8 text-brand-purple-light" />
          </div>
          <h1 className="font-heading mb-4 text-4xl font-black text-white">Join Event</h1>
          <p className="text-gray-400">Enter your unique Ticket ID to access the live dashboard.</p>
        </div>

        <form action={onSubmit} className="glass-card relative z-10 space-y-6 rounded-[2rem] border border-white/10 p-8">
          {error && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm font-medium text-red-400">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="ticketId" className="text-xs font-bold uppercase tracking-widest text-gray-400">
              Ticket ID
            </label>
            <input
              type="text"
              id="ticketId"
              name="ticketId"
              required
              placeholder="ACM-XXXXXX"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-center font-heading text-xl font-bold tracking-widest text-white placeholder-gray-700 outline-none transition-colors focus:border-brand-purple/50 focus:bg-white/10 uppercase"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-brand-purple py-4 font-bold text-white transition-all hover:bg-brand-purple-light disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                Access Live Center
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
          
          <div className="text-center mt-6">
             <span className="text-sm text-gray-500">Don't have a ticket? </span>
             <Link href="/events/evt_001/register" className="text-sm font-bold text-brand-purple-light hover:underline">
               Register here
             </Link>
          </div>
        </form>
      </FadeUp>
    </div>
  );
}
