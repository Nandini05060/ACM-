"use client";

import { useState } from "react";
import { FadeUp } from "@/components/animations/FadeUp";
import { QrCode, Search, CheckCircle, AlertTriangle } from "lucide-react";

export default function AttendanceManager() {
  const [ticketId, setTicketId] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [isScanning, setIsScanning] = useState(false);

  const handleMarkAttendance = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!ticketId) return;

    // Simulate marking attendance
    // In production, this would call a server action updating `attendanceStatus` to PRESENT
    if (ticketId.startsWith("ACM-")) {
      setStatus("success");
      setMessage(`Successfully marked attendance for Ticket ${ticketId}`);
      setTicketId("");
    } else {
      setStatus("error");
      setMessage("Invalid Ticket ID. Please verify and try again.");
    }
  };

  const simulateQRScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setTicketId("ACM-DEMO12");
      setIsScanning(false);
      setStatus("success");
      setMessage("Successfully scanned and marked attendance for John Doe (ACM-DEMO12)");
    }, 2000);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-4xl font-black text-white mb-2">Attendance Manager</h1>
        <p className="text-gray-400 font-medium">Scan QR codes or enter Ticket IDs to mark attendance.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Entry Panel */}
        <div className="glass-card rounded-3xl border border-white/10 p-8 flex flex-col gap-8">
          <h2 className="font-heading text-2xl font-bold text-white">Record Entry</h2>
          
          <form onSubmit={handleMarkAttendance} className="flex gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
              <input 
                type="text" 
                placeholder="Enter Ticket ID (e.g. ACM-XXXXXX)" 
                value={ticketId}
                onChange={(e) => setTicketId(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/40 pl-12 pr-4 py-4 text-white outline-none focus:border-brand-teal transition-colors font-bold uppercase tracking-widest"
              />
            </div>
            <button type="submit" className="rounded-xl bg-brand-teal px-6 font-bold text-black shadow-lg hover:bg-brand-teal-light transition-colors">
              Submit
            </button>
          </form>

          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-white/10"></div>
            <span className="flex-shrink-0 mx-4 text-gray-500 font-bold uppercase tracking-widest text-xs">OR</span>
            <div className="flex-grow border-t border-white/10"></div>
          </div>

          <button 
            onClick={simulateQRScan}
            disabled={isScanning}
            className={`flex items-center justify-center gap-3 rounded-2xl border-2 border-dashed ${isScanning ? 'border-brand-purple bg-brand-purple/10' : 'border-white/20 bg-white/5 hover:bg-white/10'} p-10 transition-all`}
          >
            {isScanning ? (
              <div className="flex flex-col items-center gap-4">
                <QrCode className="h-12 w-12 text-brand-purple-light animate-pulse" />
                <span className="text-brand-purple-light font-bold animate-pulse">Scanning QR Code...</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <QrCode className="h-12 w-12 text-gray-400" />
                <span className="text-gray-300 font-bold">Open Camera Scanner</span>
              </div>
            )}
          </button>

          {status !== "idle" && (
            <FadeUp>
              <div className={`flex items-center gap-3 p-4 rounded-xl border ${status === "success" ? "bg-green-500/10 border-green-500/30 text-green-400" : "bg-red-500/10 border-red-500/30 text-red-400"}`}>
                {status === "success" ? <CheckCircle className="h-5 w-5 shrink-0" /> : <AlertTriangle className="h-5 w-5 shrink-0" />}
                <p className="font-bold text-sm">{message}</p>
              </div>
            </FadeUp>
          )}
        </div>

        {/* Live Attendance Stats */}
        <div className="glass-card rounded-3xl border border-white/10 p-8">
          <h2 className="font-heading text-2xl font-bold text-white mb-6">Live Attendance Log</h2>
          
          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01] flex justify-between items-center text-sm font-medium">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-brand-teal/20 flex items-center justify-center text-brand-teal-light font-bold">JD</div>
                <div>
                  <div className="text-white font-bold">John Doe</div>
                  <div className="text-gray-500 text-xs">ACM-DEMO12</div>
                </div>
              </div>
              <span className="text-brand-teal-light text-xs font-bold uppercase tracking-widest px-3 py-1 bg-brand-teal/10 rounded-full border border-brand-teal/20">Present</span>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/10">
            <h3 className="font-heading text-xl font-bold text-white mb-4">Summary</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 text-center">
                <span className="block text-3xl font-black text-brand-teal-light">120</span>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1 block">Present</span>
              </div>
              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 text-center">
                <span className="block text-3xl font-black text-red-400">30</span>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1 block">Absent</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
