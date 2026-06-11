"use client";

import { Download, CheckCircle, XCircle, Search } from "lucide-react";
import { useState } from "react";

export default function RegistrationsClient({ initialData }: { initialData: any[] }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = initialData.filter(user => 
    user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.ticketId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportCSV = () => {
    const headers = ["Ticket ID", "Full Name", "Email", "Mobile", "College", "Status"];
    const rows = filteredData.map(user => [
      user.ticketId,
      user.fullName,
      user.email,
      user.mobileNumber || "N/A",
      user.collegeName || "N/A",
      user.registrationStatus
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(e => e.join(","))
    ].join("\\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "registrations_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h1 className="font-heading text-4xl font-black text-white mb-2">Registration Approvals</h1>
          <p className="text-gray-400 font-medium">Manage and export event registrations.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search ID, Name, Email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="rounded-xl border border-white/10 bg-black/40 pl-10 pr-4 py-2.5 text-white outline-none focus:border-brand-purple transition-colors"
            />
          </div>
          <button 
            onClick={exportCSV}
            className="flex items-center gap-2 rounded-xl bg-brand-purple px-5 py-2.5 font-bold text-white shadow-lg hover:bg-brand-purple-light transition-colors"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </button>
        </div>
      </div>

      <div className="glass-card rounded-3xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-white/5 text-xs font-bold uppercase tracking-widest text-gray-300">
              <tr>
                <th className="px-6 py-4">Participant</th>
                <th className="px-6 py-4">Ticket ID</th>
                <th className="px-6 py-4">College</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredData.map((attendee) => (
                <tr key={attendee.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-white text-base mb-1">{attendee.fullName}</div>
                    <div className="text-xs">{attendee.email}</div>
                  </td>
                  <td className="px-6 py-4 font-bold tracking-widest text-white">
                    {attendee.ticketId}
                  </td>
                  <td className="px-6 py-4 font-medium">
                    {attendee.collegeName || "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider border ${
                      attendee.registrationStatus === 'APPROVED' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                      attendee.registrationStatus === 'REJECTED' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                      'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                    }`}>
                      {attendee.registrationStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-green-400 hover:bg-green-400/20 rounded-lg transition-colors" title="Approve">
                        <CheckCircle className="h-5 w-5" />
                      </button>
                      <button className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors" title="Reject">
                        <XCircle className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center font-medium">
                    No registrations found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
