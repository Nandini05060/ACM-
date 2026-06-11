"use client";

import { useState } from "react";
import { FadeUp } from "@/components/animations/FadeUp";
import { registerForEvent } from "@/lib/actions/registration";
import { CheckCircle, AlertCircle, ArrowRight, Download, QrCode } from "lucide-react";
import { QRCodeGenerator } from "@/components/shared/QRCodeGenerator";

import { use } from "react";

export default function RegistrationPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [ticketId, setTicketId] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    
    const formData = new FormData(e.currentTarget);
    formData.append("eventId", resolvedParams.id);
    
    const res = await registerForEvent(formData);
    
    if (res.error) {
      setErrorMsg(res.error);
      setStatus("error");
    } else if (res.success && res.ticketId) {
      setTicketId(res.ticketId);
      setStatus("success");
    }
  }

  // Print function for the Registration Slip
  const handleDownloadSlip = () => {
    window.print();
  };

  if (status === "success") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#08080C] p-6 pt-32">
        <FadeUp className="w-full max-w-xl">
          {/* This container has classes that ensure it looks good when printed */}
          <div className="glass-card rounded-3xl border border-white/10 bg-gradient-to-b from-brand-900/50 to-[#08080C] p-8 md:p-12 text-center print-card print:bg-white print:border-black print:text-black">
            
            <div className="print-hide">
              <CheckCircle className="mx-auto h-16 w-16 text-green-400 mb-6" />
              <h1 className="font-heading text-4xl font-black text-white mb-2">Registration Successful!</h1>
              <p className="text-gray-400 mb-8 font-medium">You are now registered for the event. Please save your Ticket ID.</p>
            </div>

            {/* The Ticket Slip - visible normally and targeted by print styles */}
            <div className="border-2 border-brand-purple/30 bg-black/40 rounded-2xl p-6 md:p-10 mb-8 relative overflow-hidden print:border-black print:bg-gray-100">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-brand-purple/20 rounded-full blur-2xl print:hidden" />
              
              <h2 className="text-brand-purple-light font-bold uppercase tracking-widest text-sm mb-2 print:text-black">Event Ticket ID</h2>
              <div className="font-heading text-4xl md:text-5xl font-black text-white tracking-widest mb-8 print:text-black">
                {ticketId}
              </div>

              <div className="flex flex-col items-center justify-center gap-4 border-t border-white/10 pt-8 print:border-black/20">
                <p className="text-sm font-bold text-gray-500 uppercase tracking-widest print:text-black/60">Scan to mark attendance</p>
                <div className="bg-white p-4 rounded-xl shadow-lg inline-block">
                  <QRCodeGenerator value={ticketId} size={150} />
                </div>
              </div>
            </div>

            {/* Action Buttons - Hidden when printing */}
            <div className="print-hide flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={handleDownloadSlip}
                className="flex items-center justify-center gap-2 rounded-xl bg-white/10 border border-white/20 px-6 py-3 font-bold text-white transition-colors hover:bg-white/20"
              >
                <Download className="h-5 w-5" />
                Download Slip
              </button>
              <a 
                href="/live/join"
                className="flex items-center justify-center gap-2 rounded-xl bg-brand-purple px-6 py-3 font-bold text-white shadow-lg transition-colors hover:bg-brand-purple-light"
              >
                Go to Live Dashboard
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>
        </FadeUp>

        {/* CSS for print logic */}
        <style dangerouslySetInnerHTML={{__html: `
          @media print {
            body { background: white !important; color: black !important; }
            .print-hide { display: none !important; }
            nav, footer { display: none !important; }
            .print-card { box-shadow: none !important; margin: 0 !important; padding: 0 !important; border: none !important; }
            @page { margin: 2cm; }
          }
        `}} />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#08080C] px-6 py-32">
      <FadeUp className="w-full max-w-3xl">
        <div className="text-center mb-10">
          <h1 className="font-heading text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            Secure Your Spot
          </h1>
          <p className="text-gray-400 font-medium">Please fill out all the details accurately. This information will be used for your certificate and attendance tracking.</p>
        </div>

        <form onSubmit={handleSubmit} className="glass-card rounded-3xl border border-white/10 p-8 md:p-12 flex flex-col gap-8">
          
          {errorMsg && (
            <div className="flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-400">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <p className="text-sm font-bold">{errorMsg}</p>
            </div>
          )}

          {/* Section 1: Personal Info */}
          <div>
            <h3 className="text-brand-purple-light font-bold uppercase tracking-widest text-sm mb-6 border-b border-white/10 pb-2">1. Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-400">Full Name *</label>
                <input required name="name" type="text" className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-brand-purple transition-colors" placeholder="John Doe" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-400">Email Address *</label>
                <input required name="email" type="email" className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-brand-purple transition-colors" placeholder="john@example.com" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-400">Mobile Number *</label>
                <input required name="mobileNumber" type="tel" className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-brand-purple transition-colors" placeholder="+91 9876543210" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-400">Gender</label>
                <select name="gender" className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-brand-purple transition-colors appearance-none">
                  <option value="">Select Gender</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                  <option value="PREFER_NOT_TO_SAY">Prefer not to say</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Academic Info */}
          <div>
            <h3 className="text-brand-teal-light font-bold uppercase tracking-widest text-sm mb-6 border-b border-white/10 pb-2">2. Academic Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm font-bold text-gray-400">College / University Name *</label>
                <input required name="collegeName" type="text" className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-brand-teal transition-colors" placeholder="NMIMS, Indore" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-400">Department / Branch *</label>
                <input required name="department" type="text" className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-brand-teal transition-colors" placeholder="Computer Science" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-400">Year / Semester *</label>
                <input required name="yearSemester" type="text" className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-brand-teal transition-colors" placeholder="3rd Year / 6th Sem" />
              </div>
            </div>
          </div>

          {/* Section 3: Additional Info */}
          <div>
            <h3 className="text-blue-400 font-bold uppercase tracking-widest text-sm mb-6 border-b border-white/10 pb-2">3. Additional Information</h3>
            <div className="grid grid-cols-1 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-400">City *</label>
                <input required name="city" type="text" className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-blue-400 transition-colors" placeholder="Indore" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-400">Skills / Interests</label>
                <textarea name="skillsInterests" rows={3} className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-blue-400 transition-colors" placeholder="Web Development, Machine Learning, UI/UX..." />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-400">Emergency Contact Number *</label>
                <input required name="emergencyContact" type="tel" className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-blue-400 transition-colors" placeholder="+91 XXXXXXXXXX" />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-purple to-brand-teal px-6 py-4 text-lg font-black tracking-wide text-white transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(109,74,255,0.4)] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100"
          >
            {status === "loading" ? (
              <span className="animate-pulse">Processing...</span>
            ) : (
              <>
                Confirm Registration
                <ArrowRight className="h-5 w-5" />
              </>
            )}
          </button>
        </form>
      </FadeUp>
    </div>
  );
}
