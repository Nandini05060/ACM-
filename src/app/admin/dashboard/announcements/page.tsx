import { Megaphone, Plus, Trash2 } from "lucide-react";

export default function AdminAnnouncementsPage() {
  const mockAnnouncements = [
    { id: 1, message: "Round 1 has started! Check your email for repository links.", time: "10:00 AM", isNew: true },
    { id: 2, message: "Registration closes in 10 minutes. Finalize your team members.", time: "09:50 AM", isNew: false },
    { id: 3, message: "Welcome to the ACM Annual Hackathon. Please settle down in the main hall.", time: "09:00 AM", isNew: false },
  ];

  return (
    <div>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="font-heading text-4xl font-black text-white mb-2">Live Announcements</h1>
          <p className="text-gray-400 font-medium">Push real-time updates to all connected participant dashboards.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Create Announcement Form */}
        <div className="glass-card rounded-3xl border border-white/10 p-8 lg:col-span-1">
          <h2 className="font-heading text-2xl font-bold text-white mb-6">New Announcement</h2>
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Select Event</label>
              <select className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-yellow-400 appearance-none">
                <option>ACM TechVerse 2026</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Message</label>
              <textarea rows={4} className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-yellow-400 resize-none" placeholder="Type your announcement here..." />
            </div>
            <button type="button" className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-yellow-400 px-6 py-3 font-bold text-black shadow-[0_0_20px_rgba(250,204,21,0.3)] transition-all hover:bg-yellow-300">
              <Plus className="h-5 w-5" />
              Push Live
            </button>
          </form>
        </div>

        {/* Live Feed */}
        <div className="glass-card rounded-3xl border border-white/10 p-8 lg:col-span-2">
          <div className="flex items-center gap-3 mb-8">
            <Megaphone className="h-6 w-6 text-yellow-400" />
            <h2 className="font-heading text-2xl font-bold text-white">Broadcast History</h2>
          </div>

          <div className="space-y-4">
            {mockAnnouncements.map((ann) => (
              <div key={ann.id} className="flex items-center justify-between p-5 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/5 transition-colors">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-bold text-gray-500 tracking-widest uppercase">{ann.time}</span>
                    {ann.isNew && (
                      <span className="rounded-md bg-red-500/20 px-2 py-0.5 text-[10px] font-bold text-red-400 uppercase tracking-widest border border-red-500/30">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-gray-300 font-medium">{ann.message}</p>
                </div>
                <button className="p-2 text-red-400 hover:text-white hover:bg-red-500/20 rounded-lg transition-colors ml-4 shrink-0">
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
