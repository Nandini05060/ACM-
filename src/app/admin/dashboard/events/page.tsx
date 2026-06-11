import prisma from "@/lib/prisma";
import { Plus, Edit, Trash2, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";

async function getEvents() {
  try {
    return await prisma.event.findMany({ orderBy: { createdAt: "desc" } });
  } catch (e) {
    return [
      {
        id: "evt_techverse_2026",
        title: "ACM TechVerse 2026",
        category: "Flagship Summit",
        date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        status: "REGISTRATION_OPEN",
        isPublished: true,
        capacity: 150
      }
    ] as any[];
  }
}

export default async function AdminEventsPage() {
  const events = await getEvents();

  return (
    <div>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="font-heading text-4xl font-black text-white mb-2">Event Management</h1>
          <p className="text-gray-400 font-medium">Create, edit, and publish your organization's events.</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-brand-teal px-5 py-3 font-bold text-black shadow-[0_0_20px_rgba(0,229,192,0.3)] transition-all hover:bg-brand-teal-light">
          <Plus className="h-5 w-5" />
          Create Event
        </button>
      </div>

      <div className="glass-card rounded-3xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-white/5 text-xs font-bold uppercase tracking-widest text-gray-300">
              <tr>
                <th className="px-6 py-4">Event Name</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Published</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {events.map((evt) => (
                <tr key={evt.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-white text-base mb-1">{evt.title}</div>
                    <div className="text-xs uppercase tracking-widest">{evt.category}</div>
                  </td>
                  <td className="px-6 py-4 font-medium">
                    {new Date(evt.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-brand-purple/20 px-3 py-1 text-xs font-bold text-brand-purple-light uppercase tracking-wider border border-brand-purple/30">
                      {evt.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {evt.isPublished ? (
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-400" />
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-3">
                      <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-red-400 hover:text-white hover:bg-red-500/20 rounded-lg transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {events.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center font-medium">
                    No events found. Click Create Event to get started.
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
