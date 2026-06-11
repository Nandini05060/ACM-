"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FadeUp } from "@/components/animations/FadeUp";
import {
  Megaphone,
  Radio,
  Clock,
  Users,
  CheckCircle,
  CalendarDays,
  PlusCircle,
  RefreshCcw,
  ClipboardList,
  LogOut,
} from "lucide-react";
import { adminLogout, userLogout } from "@/lib/actions/registration";

// Mock Data matching the database structure requirements
const mockEvent = {
  id: "evt_001",
  title: "ACM Annual Hackathon 2026",
  status: "REGISTRATION_OPEN", // UPCOMING, REGISTRATION_OPEN, ONGOING, EVALUATION, ENDED
  description: "Join us for the flagship annual hackathon of the ACM Student Chapter at SVKM's NMIMS Indore. Collaborate with developers, designers, and innovators to build creative solutions for real-world problems. Show your technical skills, learn from mentors, and compete for exciting prize pools.",
  shortDescription: "The premier computer science hackathon at NMIMS Indore.",
  objectives: "To foster coding excellence, build multidisciplinary solutions, and connect students with tech experts.",
  speakerDetails: "Judged by industry professionals and ACM India delegates.",
  rules: "1. Teams must consist of 2-4 members. 2. All code must be written during the hacking period. 3. Plagiarism is strictly prohibited.",
  location: "SVKM's NMIMS Indore Campus",
  startTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
  endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
};

const mockAnnouncements = [
  { id: 1, message: "Round 1 has started! Check your email for repository links.", time: "10:00 AM", isNew: true },
  { id: 2, message: "Registration closes in 10 minutes. Finalize your team members.", time: "09:50 AM", isNew: false },
  { id: 3, message: "Welcome to the ACM Annual Hackathon. Please settle down in the main hall.", time: "09:00 AM", isNew: false },
];

const mockStats = {
  registrations: { total: 250, approved: 220, remaining: 30 },
  attendance: { present: 180, absent: 40, percentage: 81 },
};

const mockTimeline = [
  {
    day: "Day 1 - Inspire & Explore",
    date: "June 12, 2026",
    status: "completed",
    activities: [
      { name: "Inauguration Ceremony", desc: "Welcome address, ACM introduction, keynote speech." },
      { name: "Future Tech Talks", desc: "Sessions on AI, Cybersecurity, Cloud Computing, Data Science." },
      { name: "Project Expo", desc: "Students showcase innovative projects and research work." },
      { name: "Networking Session", desc: "Interaction with professionals, alumni, and faculty members." }
    ],
    highlight: "Introduces participants to emerging technologies, inspires innovation, and promotes networking."
  },
  {
    day: "Day 2 - Build & Innovate",
    date: "June 13, 2026",
    status: "current",
    activities: [
      { name: "Mega Hackathon", desc: "Teams build technology solutions for real-world problems." },
      { name: "Code Clash Championship", desc: "Competitive coding rounds and programming challenges." },
      { name: "UI/UX Design Challenge", desc: "Create user-centric solutions for real-world applications." },
      { name: "Bug Hunter Competition", desc: "Find and fix bugs in pre-built applications." },
      { name: "Tech Workshops", desc: "Hands-on sessions on modern technologies." }
    ],
    highlight: "Encourages creativity, problem-solving, technical excellence, and collaborative learning."
  },
  {
    day: "Day 3 - Lead & Showcase",
    date: "June 14, 2026",
    status: "upcoming",
    activities: [
      { name: "Startup Pitch Arena", desc: "Participants pitch innovative startup ideas." },
      { name: "ACM Shark Tank", desc: "Investor-style evaluation of startup concepts." },
      { name: "Research Paper Presentation", desc: "Students present research and technical papers." },
      { name: "Career Development Zone", desc: "Resume reviews, mock interviews, and LinkedIn guidance." },
      { name: "Awards & Closing Ceremony", desc: "Recognition of winners and participants." }
    ],
    highlight: "Develops leadership, entrepreneurial thinking, professional readiness, and celebrates achievements."
  }
];

export default function LiveDashboardClient({ role }: { role: "STUDENT" | "COORDINATOR" | "GUEST" }) {
  const [event, setEvent] = useState(mockEvent);
  const [announcements, setAnnouncements] = useState(mockAnnouncements);
  const [stats, setStats] = useState(mockStats);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Polling effect
  useEffect(() => {
    async function fetchLiveData() {
      try {
        const res = await fetch("/api/live");
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.event) {
            setEvent(data.event);
            if (data.announcements && data.announcements.length > 0) {
              setAnnouncements(data.announcements);
            }
            if (data.stats) {
              setStats(data.stats);
            }
          }
        }
      } catch (err) {
        console.error("Failed to fetch live event data:", err);
      }
    }

    fetchLiveData(); // Initial fetch
    const interval = setInterval(fetchLiveData, 10000); // 10s poll
    return () => clearInterval(interval);
  }, []);

  // Countdown timer effect
  useEffect(() => {
    const updateCountdown = () => {
      const isFuture = event.status === "UPCOMING" || event.status === "REGISTRATION_OPEN";
      const targetTime = isFuture ? event.startTime : event.endTime;
      const difference = +new Date(targetTime) - +new Date();
      if (difference > 0) {
        setCountdown({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown(); // Initial update
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [event.startTime, event.endTime, event.status]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "REGISTRATION_OPEN": return "text-green-400 bg-green-400/10 border-green-400/30";
      case "ONGOING": return "text-yellow-400 bg-yellow-400/10 border-yellow-400/30";
      case "EVALUATION": return "text-blue-400 bg-blue-400/10 border-blue-400/30";
      case "ENDED": return "text-red-400 bg-red-400/10 border-red-400/30";
      default: return "text-brand-teal-light bg-brand-teal/10 border-brand-teal/30";
    }
  };

  const getStatusDot = (status: string) => {
    switch (status) {
      case "REGISTRATION_OPEN": return "bg-green-400";
      case "ONGOING": return "bg-yellow-400";
      case "EVALUATION": return "bg-blue-400";
      case "ENDED": return "bg-red-400";
      default: return "bg-brand-teal-light";
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#08080C] pb-24">
      {/* Session Controls */}
      <div className="fixed top-24 right-6 z-50 rounded-full border border-white/10 bg-black/50 p-1 backdrop-blur-md flex items-center gap-2 pr-4 shadow-lg">
        {role === "GUEST" ? (
          <Link
            href="/live/join"
            className="rounded-full bg-brand-purple hover:bg-brand-purple-light transition-colors px-4 py-1.5 text-xs font-bold text-white shadow-[0_0_15px_rgba(109,74,255,0.4)] whitespace-nowrap cursor-pointer"
          >
            Participant Login
          </Link>
        ) : (
          <>
            <div className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${role === "STUDENT" ? "bg-brand-purple text-white" : "bg-red-500 text-white"}`}>
              Role: {role}
            </div>
            <button
              onClick={() => role === "COORDINATOR" ? adminLogout() : userLogout()}
              className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              title="Logout"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </>
        )}
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
        
        {/* Soft Background Gradients */}
        <div className="pointer-events-none absolute top-0 right-0 h-[600px] w-[600px] -translate-y-1/2 translate-x-1/3 rounded-full bg-brand-purple/10 blur-[100px]" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-[500px] w-[500px] translate-y-1/2 -translate-x-1/3 rounded-full bg-brand-teal/10 blur-[100px]" />

        <div className="relative z-10 container mx-auto px-6 text-center">
          <FadeUp>
            <div className="mb-6 inline-flex cursor-default items-center gap-3 rounded-full border border-red-500/30 bg-red-500/10 px-5 py-2.5 shadow-[0_0_20px_rgba(239,68,68,0.15)]">
              <Radio className="text-red-400 h-4 w-4 animate-pulse" />
              <span className="text-red-400 text-sm font-bold tracking-[0.2em] uppercase">
                Live Tracking Enabled
              </span>
            </div>
            <h1 className="font-heading mb-6 text-5xl font-black tracking-tight text-white md:text-7xl">
              Live Event <span className="from-brand-purple-light to-brand-teal-light bg-gradient-to-br bg-clip-text text-transparent">Center</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg font-medium text-gray-400">
              Track all ongoing ACM events in real-time. Stay updated with announcements, countdowns, and live statistics.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Guest Status Checker Banner */}
      {role === "GUEST" && (
        <section className="container mx-auto px-6 mb-8">
          <FadeUp delay={0.05}>
            <div className="glass-card rounded-3xl border border-brand-purple/20 bg-gradient-to-r from-brand-purple/10 to-transparent p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-brand-purple/20">
                  <Megaphone className="h-5 w-5 text-brand-purple-light animate-pulse" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Already registered for this event?</h4>
                  <p className="text-xs text-gray-400 mt-0.5">Log in with your Ticket ID to check your participation status, track live attendance, and access certificates.</p>
                </div>
              </div>
              <Link
                href="/live/join"
                className="px-5 py-2.5 rounded-xl bg-brand-purple hover:bg-brand-purple-light transition-all text-xs font-bold text-white shadow-[0_0_15px_rgba(109,74,255,0.4)] whitespace-nowrap cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                Participant Login
              </Link>
            </div>
          </FadeUp>
        </section>
      )}

      {/* Main Content Grid */}
      <section className="container mx-auto px-6">
        <div className="grid gap-6 lg:grid-cols-12">
          
          {/* Left Column: Announcements & Timeline */}
          <div className="flex flex-col gap-6 lg:col-span-8">
            
            {/* Quick Panel (Coordinators Only) */}
            {role === "COORDINATOR" && (
              <FadeUp>
                <div className="glass-card rounded-[2rem] border border-white/10 p-6 bg-brand-900/40">
                  <h3 className="font-heading text-lg font-bold text-white mb-4">Coordinator Quick Actions</h3>
                  <div className="flex flex-wrap gap-4">
                    <button className="flex items-center gap-2 rounded-xl bg-brand-purple/20 border border-brand-purple/30 px-4 py-2.5 text-sm font-bold text-brand-purple-light transition-colors hover:bg-brand-purple/30">
                      <PlusCircle className="h-4 w-4" /> New Announcement
                    </button>
                    <button className="flex items-center gap-2 rounded-xl bg-brand-teal/20 border border-brand-teal/30 px-4 py-2.5 text-sm font-bold text-brand-teal-light transition-colors hover:bg-brand-teal/30">
                      <RefreshCcw className="h-4 w-4" /> Update Status
                    </button>
                    <button className="flex items-center gap-2 rounded-xl bg-blue-500/20 border border-blue-500/30 px-4 py-2.5 text-sm font-bold text-blue-400 transition-colors hover:bg-blue-500/30">
                      <ClipboardList className="h-4 w-4" /> Update Attendance
                    </button>
                  </div>
                </div>
              </FadeUp>
            )}

            {/* Event Header & Status */}
            <FadeUp delay={0.1}>
              <div className="glass-card flex flex-col md:flex-row md:items-center justify-between rounded-[2.5rem] border border-white/10 p-8 md:p-10 relative overflow-hidden gap-6">
                <div className="absolute inset-0 bg-gradient-to-r from-brand-900/50 to-transparent pointer-events-none" />
                <div className="relative z-10 flex-grow">
                  <h2 className="font-heading text-3xl md:text-4xl font-black text-white mb-2">{event.title}</h2>
                  <p className="text-gray-400 font-medium">
                    {event.status === "UPCOMING" || event.status === "REGISTRATION_OPEN"
                      ? "Upcoming event — registrations are now open."
                      : "Currently active and tracking live metrics."}
                  </p>
                </div>
                <div className="relative z-10 flex flex-wrap items-center gap-4">
                  <Link
                    href={`/events/${event.id}/register`}
                    className="rounded-xl bg-brand-purple hover:bg-brand-purple-light transition-colors px-5 py-3 text-center text-sm font-bold text-white shadow-[0_0_20px_rgba(109,74,255,0.4)] whitespace-nowrap cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Register Now
                  </Link>
                  <div className={`flex items-center gap-3 rounded-full border px-6 py-3 font-bold uppercase tracking-widest text-sm shadow-lg ${getStatusColor(event.status)}`}>
                    <div className={`h-2.5 w-2.5 rounded-full ${getStatusDot(event.status)} animate-pulse`} />
                    {event.status.replace("_", " ")}
                  </div>
                </div>
              </div>
            </FadeUp>

            {/* Event Details Card */}
            <FadeUp delay={0.15}>
              <div className="glass-card rounded-[2.5rem] border border-white/10 p-8 md:p-10">
                <h3 className="font-heading text-2xl font-bold text-white mb-4">Event Details</h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  {event.description || "Join us for this amazing technical event at NMIMS."}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/5">
                  {(event.objectives || event.location) && (
                    <div>
                      <h4 className="text-sm font-bold text-brand-teal-light uppercase tracking-widest mb-2">Objectives & Location</h4>
                      <ul className="space-y-2 text-sm text-gray-400 leading-relaxed">
                        {event.objectives && <li><span className="text-white font-semibold">Objective:</span> {event.objectives}</li>}
                        {event.location && <li><span className="text-white font-semibold">Location:</span> {event.location}</li>}
                      </ul>
                    </div>
                  )}
                  {(event.speakerDetails || event.rules) && (
                    <div>
                      <h4 className="text-sm font-bold text-brand-purple-light uppercase tracking-widest mb-2">Speaker & Guidelines</h4>
                      <ul className="space-y-2 text-sm text-gray-400 leading-relaxed">
                        {event.speakerDetails && <li><span className="text-white font-semibold">Speaker/Judges:</span> {event.speakerDetails}</li>}
                        {event.rules && <li><span className="text-white font-semibold">Rules:</span> {event.rules}</li>}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </FadeUp>

            {/* Live Announcements */}
            <FadeUp delay={0.2}>
              <div className="glass-card rounded-[2.5rem] border border-white/10 p-8 md:p-10 h-[400px] flex flex-col">
                <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/5">
                  <div className="bg-brand-purple/20 p-2 rounded-xl">
                    <Megaphone className="h-6 w-6 text-brand-purple-light" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-white">Live Announcements</h3>
                </div>
                
                <div className="flex-grow overflow-y-auto pr-2 space-y-4 custom-scrollbar">
                  {announcements.map((ann, idx) => (
                    <div key={ann.id} className="group flex gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-5 transition-colors hover:bg-white/5">
                      <div className="flex flex-col items-center gap-2 text-gray-500">
                        <span className="text-xs font-bold uppercase tracking-wider">{ann.time}</span>
                        <div className="h-full w-px bg-white/10 group-hover:bg-brand-purple/30 transition-colors" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center gap-3 mb-2">
                          {ann.isNew && (
                            <span className="rounded-md bg-red-500/20 px-2 py-0.5 text-[10px] font-bold text-red-400 uppercase tracking-widest border border-red-500/30">
                              New
                            </span>
                          )}
                        </div>
                        <p className="text-gray-300 font-medium leading-relaxed">{ann.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>

            {/* Event Timeline */}
            <FadeUp delay={0.3}>
              <div className="glass-card rounded-[2.5rem] border border-white/10 p-8 md:p-10">
                <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/5">
                  <div className="bg-brand-teal/20 p-2 rounded-xl">
                    <CalendarDays className="h-6 w-6 text-brand-teal-light" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-white">Event Itinerary</h3>
                </div>
                
                <div className="relative pl-6">
                  {mockTimeline.map((item, idx) => (
                    <div key={idx} className="mb-12 relative last:mb-0">
                      {/* Line */}
                      {idx !== mockTimeline.length - 1 && (
                        <div className={`absolute top-8 bottom-[-3rem] left-[-1.35rem] w-0.5 ${item.status === 'completed' ? 'bg-brand-teal/50' : 'bg-white/10'}`} />
                      )}
                      
                      {/* Dot */}
                      <div className={`absolute left-[-1.6rem] top-1.5 h-3 w-3 rounded-full border-2 border-[#08080C] shadow-sm ${item.status === 'completed' ? 'bg-brand-teal-light shadow-brand-teal' : item.status === 'current' ? 'bg-brand-purple-light shadow-brand-purple animate-pulse' : 'bg-gray-600'}`} />
                      
                      <div>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
                          <span className={`text-sm font-bold tracking-widest ${item.status === 'current' ? 'text-brand-purple-light animate-pulse font-extrabold' : 'text-gray-400'}`}>
                            {item.day}
                          </span>
                          <span className="text-xs font-bold text-gray-500 uppercase">{item.date}</span>
                        </div>

                        {/* Activities List */}
                        <div className="space-y-3 pl-2">
                          {item.activities.map((act, aIdx) => (
                            <div key={aIdx} className="p-4 rounded-xl border border-white/5 bg-white/[0.01] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                              <div>
                                <h5 className="text-white font-bold text-sm">{act.name}</h5>
                                <p className="text-xs text-gray-400 mt-1">{act.desc}</p>
                              </div>
                              <Link 
                                href={`/events/${event.id}/register`}
                                className="px-3 py-1.5 rounded-lg bg-brand-purple/20 border border-brand-purple/30 text-[11px] font-bold text-brand-purple-light hover:bg-brand-purple/30 hover:text-white transition-all text-center shrink-0 self-start sm:self-center"
                              >
                                Register Event
                              </Link>
                            </div>
                          ))}
                        </div>

                        <div className="mt-3 pl-2 text-xs italic text-brand-teal-light font-medium">
                          Highlight: {item.highlight}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>

          {/* Right Column: Timers & Stats */}
          <div className="flex flex-col gap-6 lg:col-span-4">
            
            {/* Countdown Card */}
            <FadeUp delay={0.1}>
              <div className="glass-card rounded-[2rem] border border-brand-purple/20 bg-gradient-to-b from-brand-purple/10 to-transparent p-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
                <Clock className="mx-auto h-8 w-8 text-brand-purple-light mb-4" />
                <h3 className="text-sm font-bold tracking-widest text-gray-400 uppercase mb-6">
                  {event.status === "UPCOMING" || event.status === "REGISTRATION_OPEN" 
                    ? "Event Starts In" 
                    : "Event Ends In"}
                </h3>
                
                <div className="flex justify-center gap-3">
                  {[
                    { label: "Days", val: countdown.days },
                    { label: "Hrs", val: countdown.hours },
                    { label: "Min", val: countdown.minutes },
                    { label: "Sec", val: countdown.seconds }
                  ].map((unit, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                      <div className="glass flex h-14 w-14 items-center justify-center rounded-xl border-white/10 bg-black/40 shadow-inner">
                        <span className="font-heading text-2xl font-black text-white">
                          {unit.val.toString().padStart(2, "0")}
                        </span>
                      </div>
                      <span className="mt-2 text-[10px] font-bold tracking-widest text-gray-500 uppercase">{unit.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>

            {/* Registrations Card */}
            <FadeUp delay={0.2}>
              <div className="glass-card rounded-[2rem] border border-white/10 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Users className="h-5 w-5 text-blue-400" />
                  <h3 className="font-heading text-xl font-bold text-white">Registrations</h3>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400 font-medium">Capacity Filled</span>
                      <span className="text-white font-bold">{Math.round((stats.registrations.approved / stats.registrations.total) * 100)}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden">
                      <div className="h-full bg-blue-400 rounded-full" style={{ width: `${(stats.registrations.approved / stats.registrations.total) * 100}%` }} />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 text-center">
                      <span className="block text-2xl font-black text-white">{stats.registrations.approved}</span>
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1 block">Approved</span>
                    </div>
                    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 text-center">
                      <span className="block text-2xl font-black text-white">{stats.registrations.remaining}</span>
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1 block">Seats Left</span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeUp>

            {/* Attendance Dashboard */}
            <FadeUp delay={0.3}>
              <div className="glass-card rounded-[2rem] border border-white/10 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <CheckCircle className="h-5 w-5 text-brand-teal-light" />
                  <h3 className="font-heading text-xl font-bold text-white">Attendance</h3>
                </div>
                
                <div className="flex items-center gap-6">
                  {/* Circular Progress Mock */}
                  <div className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-brand-900 border-[6px] border-white/5">
                    <svg className="absolute inset-0 h-full w-full -rotate-90">
                      <circle
                        cx="50%"
                        cy="50%"
                        r="42%"
                        className="fill-transparent stroke-brand-teal-light"
                        strokeWidth="12%"
                        strokeDasharray="264"
                        strokeDashoffset={264 - (264 * stats.attendance.percentage) / 100}
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="font-heading text-2xl font-black text-white">{stats.attendance.percentage}%</span>
                  </div>
                  
                  <div className="flex flex-col justify-center gap-3 flex-grow">
                    <div className="flex justify-between items-center bg-white/[0.02] border border-white/5 rounded-lg px-3 py-2">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Present</span>
                      <span className="text-brand-teal-light font-bold">{stats.attendance.present}</span>
                    </div>
                    <div className="flex justify-between items-center bg-white/[0.02] border border-white/5 rounded-lg px-3 py-2">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Absent</span>
                      <span className="text-red-400 font-bold">{stats.attendance.absent}</span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeUp>

          </div>
        </div>
      </section>

      {/* Global CSS for custom scrollbar within this page */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(109, 74, 255, 0.5);
        }
      `}} />
    </div>
  );
}
