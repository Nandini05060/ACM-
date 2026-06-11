import { FadeUp } from "@/components/animations/FadeUp";
import { Users, CheckCircle, Award, Network, BookOpen, Briefcase, HelpCircle, ArrowRight, GitPullRequest, Layout, Megaphone, Video } from "lucide-react";
import Link from "next/link";
import VolunteerForm from "./VolunteerForm";

export const metadata = {
  title: "Membership & Onboarding | ACM NMIMS Indore",
  description: "Join the SVKM's NMIMS Indore ACM Student Chapter. Explore the registration pipeline, benefits, recruitment cycles, and organizing committee applications.",
};

export default function MembershipPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#030712] pb-32 pt-24 md:pt-32 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 h-[800px] w-[800px] bg-brand-purple/10 rounded-full blur-[150px] opacity-50" />
        <div className="absolute bottom-0 left-0 h-[800px] w-[800px] bg-brand-teal/10 rounded-full blur-[150px] opacity-50" />
      </div>

      {/* Hero Section */}
      <div className="relative mb-20 px-6 z-10">
        
        <div className="container relative mx-auto max-w-5xl text-center">
          <FadeUp>
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-purple/20 border border-brand-purple/30">
              <Users className="h-8 w-8 text-brand-purple-light" />
            </div>
            <h1 className="font-heading text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
              Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple-light to-brand-teal-light">Network</span>
            </h1>
            <p className="text-xl text-gray-400 font-medium max-w-3xl mx-auto mb-8">
              Membership, Recruitment, and Onboarding System of the SVKM’s NMIMS Indore ACM Student Chapter.
            </p>
            <div className="flex justify-center">
              <a 
                href="https://www.acm.org/membership/join?utm_source=chatgpt.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-brand-purple to-brand-teal px-8 py-3.5 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(139,92,246,0.3)] cursor-pointer"
              >
                <span>Buy ACM Global Membership</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </FadeUp>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-6xl space-y-24">
        
        {/* 1. Membership Registration Pipeline */}
        <FadeUp delay={0.1}>
          <div className="flex flex-col gap-12">
            <div className="text-center">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">1. Membership Registration Pipeline</h2>
              <p className="text-gray-400 max-w-3xl mx-auto">
                The chapter runs a dual-layer registration architecture to cleanly separate local campus engagement from the global professional network.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
              {/* Connecting lines for desktop */}
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-white/10 -z-10 -translate-y-1/2" />
              
              <div className="glass-card group rounded-3xl border border-brand-purple/20 bg-gradient-to-b from-brand-purple/5 to-transparent p-8 relative transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-10px_rgba(109,74,255,0.2)]">
                <div className="absolute -top-5 -left-5 h-10 w-10 rounded-full bg-[#030712] border-2 border-brand-purple-light flex items-center justify-center font-bold text-brand-purple-light transition-transform duration-500 group-hover:scale-110">1</div>
                <h3 className="text-xl font-bold text-white mb-3">Local Chapter Intake</h3>
                <p className="text-sm text-gray-400">
                  Students complete the verified digital portal form using their official corporate NMIMS Indore email. Validates academic credentials, engineering streams (STME), and current batch status.
                </p>
              </div>

              <div className="glass-card group rounded-3xl border border-brand-teal/20 bg-gradient-to-b from-brand-teal/5 to-transparent p-8 relative transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-10px_rgba(0,229,192,0.2)]">
                <div className="absolute -top-5 -left-5 h-10 w-10 rounded-full bg-[#030712] border-2 border-brand-teal-light flex items-center justify-center font-bold text-brand-teal-light transition-transform duration-500 group-hover:scale-110">2</div>
                <h3 className="text-xl font-bold text-white mb-3">ACM Global Activation</h3>
                <p className="text-sm text-gray-400">
                  Approved candidates are routed to the central ACM quick-join application. The student pricing tier for India is set at a base rate of <span className="text-white font-bold">₹1,250 per annum</span>, with an optional 10% discount on multi-year renewals.
                </p>
              </div>

              <div className="glass-card group rounded-3xl border border-blue-500/20 bg-gradient-to-b from-blue-500/5 to-transparent p-8 relative transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-10px_rgba(59,130,246,0.2)]">
                <div className="absolute -top-5 -left-5 h-10 w-10 rounded-full bg-[#030712] border-2 border-blue-400 flex items-center justify-center font-bold text-blue-400 transition-transform duration-500 group-hover:scale-110">3</div>
                <h3 className="text-xl font-bold text-white mb-3">System Onboarding</h3>
                <p className="text-sm text-gray-400">
                  Upon confirming active IDs, the automated roster engine hooks directly into the chapter's platforms to assign server roles (@ACM-Member) and whitelist profiles for GitHub code repositories.
                </p>
              </div>
            </div>
          </div>
        </FadeUp>

        {/* 2. Global & Local ACM Benefits Matrix */}
        <FadeUp delay={0.2}>
          <div className="glass-card rounded-[2.5rem] border border-white/10 p-8 md:p-12">
            <div className="flex items-center gap-4 mb-10">
              <div className="h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center">
                <Award className="h-6 w-6 text-yellow-500" />
              </div>
              <h2 className="font-heading text-3xl font-bold text-white">2. Global & Local ACM Benefits Matrix</h2>
            </div>
            
            <p className="text-gray-400 mb-10">
              Activating an official student membership unlocks an extensive portfolio of academic, career, and research-grade resources.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-3 border-b border-white/10 pb-4">
                  <BookOpen className="h-5 w-5 text-brand-teal-light" />
                  Resource & Learning Infrastructure
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3 text-gray-400">
                    <CheckCircle className="h-5 w-5 text-brand-teal-light shrink-0 mt-0.5" />
                    <span><strong className="text-white">The ACM Learning Center:</strong> Unlimited access to professional training suites, short-form task-focused videos, and technical certifications via Skillsoft Percipio.</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-400">
                    <CheckCircle className="h-5 w-5 text-brand-teal-light shrink-0 mt-0.5" />
                    <span><strong className="text-white">ACM TechTalks & Webinars:</strong> Regular live technical sessions led by top software practitioners, research scientists, and Turing Award laureates.</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-400">
                    <CheckCircle className="h-5 w-5 text-brand-teal-light shrink-0 mt-0.5" />
                    <span><strong className="text-white">Exclusive Publications:</strong> Full electronic subscriptions to XRDS (premium student magazine), ACM CareerNews, and TechNews.</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-3 border-b border-white/10 pb-4">
                  <Briefcase className="h-5 w-5 text-brand-purple-light" />
                  Financial Grants & Mobility
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3 text-gray-400">
                    <CheckCircle className="h-5 w-5 text-brand-purple-light shrink-0 mt-0.5" />
                    <span><strong className="text-white">ACM India Travel Grants:</strong> Financial packages ranging from ₹60,000 to ₹1,00,000 to cover airfare, registration, and lodging when presenting original computing research at international conferences.</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-400">
                    <CheckCircle className="h-5 w-5 text-brand-purple-light shrink-0 mt-0.5" />
                    <span><strong className="text-white">SIG & Conference Entry Discounts:</strong> Discounted registration pricing for over 170 international symposia, research workshops, and special interest groups (SIGCSE, SIGGRAPH).</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </FadeUp>

        {/* 3. Core Recruitment Cycles & Announcements */}
        <FadeUp delay={0.3}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-3xl font-bold text-white mb-6">3. Core Recruitment Cycles</h2>
              <p className="text-gray-400 mb-8">
                The chapter schedules two systematic recruitment drives per academic cycle to maintain its operational talent pipeline.
              </p>
              <div className="space-y-6">
                <div className="glass-card p-6 rounded-2xl border border-white/5 border-l-4 border-l-blue-500">
                  <h4 className="text-lg font-bold text-white mb-2">The Monsoon Intake (August – September)</h4>
                  <p className="text-sm text-gray-400">Primarily targets incoming engineering students to fill foundational executive tracks, associate positions, and event-day management crews.</p>
                </div>
                <div className="glass-card p-6 rounded-2xl border border-white/5 border-l-4 border-l-brand-teal">
                  <h4 className="text-lg font-bold text-white mb-2">The Spring Shift (February – March)</h4>
                  <p className="text-sm text-gray-400">Focuses on onboarding technical leads, research project members, and layout developers to build out major event ecosystems like the COMPUTE Regional Events.</p>
                </div>
              </div>
            </div>
            
            <div className="glass-card rounded-[2rem] border border-white/10 p-8 text-center bg-white/[0.02]">
              <Network className="h-12 w-12 text-brand-purple-light mx-auto mb-6" />
              <h3 className="text-xl font-bold text-white mb-4">How We Broadcast</h3>
              <p className="text-gray-400">
                Open recruitment drives are announced through minimalist, cyberpunk-themed digital asset drops, physical campus poster grids, and direct broadcast lines managed by the Public Relations and Media wings.
              </p>
            </div>
          </div>
        </FadeUp>

        {/* 4. Volunteer & Organizing Committee Applications */}
        <FadeUp delay={0.4}>
          <div>
            <div className="text-center mb-10">
              <h2 className="font-heading text-3xl font-bold text-white mb-4">4. Organizing Committee Departments</h2>
              <p className="text-gray-400 max-w-3xl mx-auto">
                When a major flagship event enters production, the LEADS Core Group opens specialized, short-term volunteer positions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-card p-6 rounded-2xl border border-white/10 flex items-start gap-4">
                <div className="mt-1 h-10 w-10 shrink-0 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <GitPullRequest className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">Technical & Systems</h4>
                  <p className="text-sm text-brand-teal-light font-medium mb-3">React, Tailwind CSS, APIs, GitHub</p>
                  <p className="text-sm text-gray-400">Deploying custom landing sheets, coding competitive sandboxes, running live technical rooms.</p>
                </div>
              </div>

              <div className="glass-card p-6 rounded-2xl border border-white/10 flex items-start gap-4">
                <div className="mt-1 h-10 w-10 shrink-0 rounded-lg bg-pink-500/20 flex items-center justify-center">
                  <Layout className="h-5 w-5 text-pink-400" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">Design & UI</h4>
                  <p className="text-sm text-brand-teal-light font-medium mb-3">Figma, Motion Design, Cyberpunk</p>
                  <p className="text-sm text-gray-400">Rendering standard vector badges, modeling promotional posters, detailing social grids.</p>
                </div>
              </div>

              <div className="glass-card p-6 rounded-2xl border border-white/10 flex items-start gap-4">
                <div className="mt-1 h-10 w-10 shrink-0 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                  <Megaphone className="h-5 w-5 text-yellow-400" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">Public Relations (PR)</h4>
                  <p className="text-sm text-brand-teal-light font-medium mb-3">Communication Agility, Outreach</p>
                  <p className="text-sm text-gray-400">Driving multi-institutional chapter registrations, coordinating hospitality loops for incoming speakers.</p>
                </div>
              </div>

              <div className="glass-card p-6 rounded-2xl border border-white/10 flex items-start gap-4">
                <div className="mt-1 h-10 w-10 shrink-0 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <Video className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">Media Production</h4>
                  <p className="text-sm text-brand-teal-light font-medium mb-3">Video Editing Suites, Camera Eng.</p>
                  <p className="text-sm text-gray-400">Scripting aftermovies, documenting live sprints, managing sound and visual layers during keynotes.</p>
                </div>
              </div>
            </div>
          </div>
        </FadeUp>

        {/* 5. Volunteer Registration */}
        <div id="register" className="relative pt-8">
          <VolunteerForm />
        </div>

      </div>
    </div>
  );
}
