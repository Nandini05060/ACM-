"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { LayoutDashboard, CalendarDays, Users, CheckCircle, Megaphone, LogOut, Menu, X, UserPlus } from "lucide-react";
import { adminLogout } from "@/lib/actions/registration";

export default function AdminDashboardLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#08080C] text-white">
      {/* Mobile Header */}
      <header className="flex md:hidden items-center justify-between w-full h-16 px-6 bg-brand-900/90 border-b border-white/10 fixed top-0 left-0 z-40 backdrop-blur-md">
        <div className="flex flex-col">
          <h2 className="font-heading text-lg font-black leading-none">ACM Admin</h2>
          <span className="text-[10px] font-bold text-brand-teal-light uppercase tracking-widest mt-1">Command Center</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-white/5 rounded-xl transition-colors"
          aria-label="Toggle Navigation"
        >
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </header>

      {/* Backdrop for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`w-64 flex-shrink-0 border-r border-white/10 bg-brand-900/95 md:bg-brand-900/40 p-6 flex flex-col fixed inset-y-0 left-0 z-50 transition-transform duration-300 ease-in-out md:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="font-heading text-2xl font-black text-white">ACM Admin</h2>
            <p className="text-xs font-bold text-brand-teal-light uppercase tracking-widest mt-1">Command Center</p>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="p-1.5 hover:bg-white/5 rounded-lg md:hidden"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        <nav className="flex-1 space-y-2">
          <Link 
            href="/admin/dashboard" 
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
          >
            <LayoutDashboard className="h-5 w-5 text-brand-purple-light" />
            <span className="font-bold">Overview</span>
          </Link>
          <Link 
            href="/admin/dashboard/events" 
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
          >
            <CalendarDays className="h-5 w-5 text-blue-400" />
            <span className="font-bold">Events</span>
          </Link>
          <Link 
            href="/admin/dashboard/registrations" 
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
          >
            <Users className="h-5 w-5 text-pink-400" />
            <span className="font-bold">Registrations</span>
          </Link>
          <Link 
            href="/admin/dashboard/attendance" 
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
          >
            <CheckCircle className="h-5 w-5 text-brand-teal-light" />
            <span className="font-bold">Attendance</span>
          </Link>
          <Link 
            href="/admin/dashboard/announcements" 
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
          >
            <Megaphone className="h-5 w-5 text-yellow-400" />
            <span className="font-bold">Announcements</span>
          </Link>
          <Link 
            href="/admin/dashboard/volunteers" 
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
          >
            <UserPlus className="h-5 w-5 text-emerald-400" />
            <span className="font-bold">Volunteers</span>
          </Link>
        </nav>

        <form action={adminLogout}>
          <button type="submit" className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-400 hover:bg-red-500/10 transition-colors">
            <LogOut className="h-5 w-5" />
            <span className="font-bold">Secure Logout</span>
          </button>
        </form>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 pl-0 md:pl-64 pt-16 md:pt-0">
        <div className="p-6 md:p-12">
          {children}
        </div>
      </main>
    </div>
  );
}
