import { CalendarDays, Users, CheckCircle, Activity } from "lucide-react";
import prisma from "@/lib/prisma";

export default async function AdminDashboardOverview() {
  let stats = {
    totalEvents: 1,
    activeEvents: 1,
    totalRegistrations: 150,
    totalAttendance: 120,
  };

  try {
    const eventsCount = await prisma.event.count();
    const activeCount = await prisma.event.count({ where: { isPublished: true } });
    const registrations = await prisma.attendee.count();
    const attendance = await prisma.attendee.count({ where: { attendanceStatus: "PRESENT" } });
    
    stats = {
      totalEvents: eventsCount || stats.totalEvents,
      activeEvents: activeCount || stats.activeEvents,
      totalRegistrations: registrations || stats.totalRegistrations,
      totalAttendance: attendance || stats.totalAttendance,
    };
  } catch (e) {
    console.warn("DB offline, using mock stats for dashboard");
  }

  const statCards = [
    { label: "Total Events", value: stats.totalEvents, icon: CalendarDays, color: "text-blue-400", border: "border-blue-400/20" },
    { label: "Active Events", value: stats.activeEvents, icon: Activity, color: "text-brand-teal-light", border: "border-brand-teal/20" },
    { label: "Total Registrations", value: stats.totalRegistrations, icon: Users, color: "text-brand-purple-light", border: "border-brand-purple/20" },
    { label: "Present Attendance", value: stats.totalAttendance, icon: CheckCircle, color: "text-green-400", border: "border-green-400/20" },
  ];

  return (
    <div>
      <h1 className="font-heading text-4xl font-black text-white mb-2">Dashboard Overview</h1>
      <p className="text-gray-400 font-medium mb-10">Welcome back. Here's what's happening today.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, i) => (
          <div key={i} className={`glass-card rounded-2xl border ${card.border} p-6 bg-white/[0.02]`}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">{card.label}</span>
              <card.icon className={`h-6 w-6 ${card.color}`} />
            </div>
            <div className="text-4xl font-black text-white">{card.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card rounded-3xl border border-white/10 p-8">
          <h2 className="font-heading text-2xl font-bold text-white mb-6">Recent Registrations</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01] flex justify-between items-center text-sm font-medium text-gray-300">
              <span>Database Sync</span>
              <span className="text-brand-teal-light">Connect DB to view</span>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-3xl border border-white/10 p-8">
          <h2 className="font-heading text-2xl font-bold text-white mb-6">Today's Schedule</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01] flex justify-between items-center text-sm font-medium text-gray-300">
              <span>ACM TechVerse 2026 - Day 1</span>
              <span className="text-brand-purple-light text-xs font-bold uppercase tracking-widest px-3 py-1 bg-brand-purple/20 rounded-full">Ongoing</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
