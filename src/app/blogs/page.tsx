"use client";

import { FadeUp } from "@/components/animations/FadeUp";
import {
  Mail,
  Globe,
  Calendar,
  Award,
  BookOpen,
  Cpu,
  Layers,
  Lock,
  Code2,
  Users,
  CheckCircle,
  ArrowUpRight,
  Activity,
} from "lucide-react";
import Link from "next/link";

export default function NewslettersPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#030712] pb-32 pt-24 md:pt-32 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 h-[800px] w-[800px] -translate-x-1/2 bg-brand-purple/10 rounded-full blur-[150px] opacity-40" />
        <div className="absolute bottom-0 right-0 h-[600px] w-[600px] bg-brand-teal/5 rounded-full blur-[120px] opacity-30" />
      </div>

      {/* Hero Section */}
      <div className="relative mb-20 px-6 z-10">
        <div className="container relative mx-auto max-w-5xl text-center">
          <FadeUp>
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-purple/20 border border-brand-purple/30">
              <Mail className="h-8 w-8 text-brand-purple-light" />
            </div>
            <h1 className="font-heading text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
              National Bulletins <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple-light to-brand-teal-light">
                & Newsletters
              </span>
            </h1>
            <p className="text-xl text-gray-400 font-medium max-w-3xl mx-auto leading-relaxed">
              The official national <strong>ACM India Bulletins and Newsletters</strong> serve as the primary pipeline for major announcements, event calendars, and compute research initiatives across the country.
            </p>
          </FadeUp>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-6xl space-y-16 relative z-10">
        {/* Intro Highlight Box */}
        <FadeUp delay={0.1}>
          <div className="glass-card rounded-[2.5rem] border border-white/10 p-8 md:p-12 bg-gradient-to-br from-white/[0.02] to-transparent relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Activity className="h-40 w-40 text-brand-teal" />
            </div>
            <p className="text-lg md:text-xl leading-relaxed text-gray-300 font-medium">
              The current major highlights from the official 2026 ACM India communications include the following updates, call-for-participations, and national initiatives:
            </p>
          </div>
        </FadeUp>

        {/* Bulletins Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Section 1: Major National Events & Elections */}
          <FadeUp delay={0.2} className="h-full">
            <div className="glass-card h-full rounded-[2rem] border border-white/10 p-8 hover:border-brand-purple/40 hover:shadow-[0_20px_45px_-10px_rgba(109,74,255,0.15)] transition-all duration-500 group flex flex-col justify-between">
              <div>
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-brand-purple/20 border border-brand-purple/30 text-brand-purple-light">
                  <Calendar className="h-7 w-7 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-2xl font-black text-white mb-6">1. Major National Events & Elections</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-bold text-gray-200 mb-2 flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-brand-purple" />
                      2026 ACM India Council Election
                    </h4>
                    <p className="text-sm text-gray-400 leading-relaxed pl-4">
                      The election site recently closed on June 5, 2026. Eligible professional members voted for the next Executive Council term (running from July 1, 2026, to June 30, 2030) featuring a slate of candidates from premier institutions like IIT Bombay, IIT Kharagpur, IISc Bangalore, and IBM Research.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-200 mb-2 flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-brand-purple" />
                      ACM India Annual Event 2026 Summary
                    </h4>
                    <p className="text-sm text-gray-400 leading-relaxed pl-4">
                      Hosted at IIT Hyderabad, the flagship annual event brought together the national computing community alongside ACM President Prof. Yannis Ioannidis. Keynote tracks highlighted <strong>Responsible AI for Societal Transformation</strong> (by Prof. Dr. Virginia Dignum) and a highly anticipated fireside chat with Turing Awardee <strong>Prof. Raj Reddy</strong>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>

          {/* Section 2: Academic & Training Programs */}
          <FadeUp delay={0.3} className="h-full">
            <div className="glass-card h-full rounded-[2rem] border border-white/10 p-8 hover:border-brand-teal/40 hover:shadow-[0_20px_45px_-10px_rgba(0,229,192,0.15)] transition-all duration-500 group flex flex-col justify-between">
              <div>
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-brand-teal/20 border border-brand-teal/30 text-brand-teal-light">
                  <BookOpen className="h-7 w-7 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-2xl font-black text-white mb-6">2. Academic & Training Programs</h3>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-bold text-gray-200 mb-3 flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-brand-teal" />
                      2026 ACM India Summer Schools
                    </h4>
                    <p className="text-sm text-gray-400 mb-3 pl-4">
                      The official announcement outlined six competitive subject tracks for the upcoming cohort:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-4">
                      {[
                        { name: "Systems for ML", desc: "VIT Vellore (Women-only)" },
                        { name: "Natural Language Models", desc: "Language Tech Development" },
                        { name: "Symmetric Key Cryptography", desc: "Encryption Systems" },
                        { name: "Competitive Programming", desc: "Algorithms & Logic" },
                        { name: "Foundations of Hardware Security", desc: "Embedded Logic" },
                        { name: "Edge AI and Robotics", desc: "Autonomous Automation" },
                      ].map((track) => (
                        <div key={track.name} className="bg-white/5 border border-white/5 rounded-xl p-2.5 hover:bg-white/10 transition-colors">
                          <div className="text-xs font-bold text-white">{track.name}</div>
                          <div className="text-[10px] text-brand-teal-light font-semibold">{track.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-200 mb-2 flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-brand-teal" />
                      Faculty Development Program (FDP)
                    </h4>
                    <p className="text-sm text-gray-400 leading-relaxed pl-4">
                      A nationwide call for participation went out to technical educators to align academic coursework with emerging industry standards.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>

          {/* Section 3: ACM-W India (Women in Computing) Bulletins */}
          <FadeUp delay={0.4} className="h-full">
            <div className="glass-card h-full rounded-[2rem] border border-white/10 p-8 hover:border-pink-500/40 hover:shadow-[0_20px_45px_-10px_rgba(244,114,182,0.15)] transition-all duration-500 group flex flex-col justify-between">
              <div>
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-pink-500/20 border border-pink-500/30 text-pink-400">
                  <Award className="h-7 w-7 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-2xl font-black text-white mb-6">3. ACM-W India Bulletins</h3>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-bold text-gray-200 mb-2 flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-pink-400" />
                      Lady Ada Programming Contest
                    </h4>
                    <p className="text-sm text-gray-400 leading-relaxed pl-4">
                      Launched explicitly for women students enrolled in Bachelor's or Master's science, engineering, and management programs, featuring national cash prizes and placement recognition.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-200 mb-2 flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-pink-400" />
                      7th ACM-W India Grad Cohort
                    </h4>
                    <p className="text-sm text-gray-400 leading-relaxed pl-4">
                      Celebrated and summarized during the International Women's Day bulletin, this track focuses on mentoring women graduate students in computing research careers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>

          {/* Section 4: Technical Calls for Participation */}
          <FadeUp delay={0.5} className="h-full">
            <div className="glass-card h-full rounded-[2rem] border border-white/10 p-8 hover:border-blue-500/40 hover:shadow-[0_20px_45px_-10px_rgba(59,130,246,0.15)] transition-all duration-500 group flex flex-col justify-between">
              <div>
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-400">
                  <Cpu className="h-7 w-7 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-2xl font-black text-white mb-6">4. Calls for Participation</h3>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-bold text-gray-200 mb-2 flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-blue-400" />
                      Quantum Circuits & Error Correction
                    </h4>
                    <p className="text-sm text-gray-400 leading-relaxed pl-4">
                      A specialized national research track workshop open for immediate registration. Focusing on quantum communication algorithms and noise tolerance calculations.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-200 mb-2 flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-blue-400" />
                      Indian Technology Policy Committee
                    </h4>
                    <p className="text-sm text-gray-400 leading-relaxed pl-4">
                      An active invitation inviting academic and professional members to contribute directly to domestic computing policy frameworks.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>

        {/* How to Access Directly (Bottom CTA) */}
        <FadeUp delay={0.6}>
          <div className="glass-card rounded-[2.5rem] border border-white/10 p-8 md:p-12 bg-white/[0.01] overflow-hidden relative">
            <h3 className="font-heading text-2xl font-bold text-white mb-8 border-b border-white/10 pb-4">
              How to Keep Accessing These Directly
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-4 group">
                <div className="h-12 w-12 rounded-xl bg-brand-purple/20 border border-brand-purple/30 flex items-center justify-center shrink-0 text-brand-purple-light group-hover:scale-105 transition-transform">
                  <Globe className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-2 text-lg">National Portal</h4>
                  <p className="text-sm text-gray-400 leading-relaxed mb-4">
                    Every single official bulletin update is cataloged chronologically on the ACM India News and Updates page.
                  </p>
                  <a
                    href="https://india.acm.org/news-and-updates"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-brand-purple-light hover:text-white font-bold text-sm transition-colors"
                  >
                    Visit News and Updates
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </div>

              <div className="flex gap-4 group">
                <div className="h-12 w-12 rounded-xl bg-brand-teal/20 border border-brand-teal/30 flex items-center justify-center shrink-0 text-brand-teal-light group-hover:scale-105 transition-transform">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-2 text-lg">Student Chapter Hub</h4>
                  <p className="text-sm text-gray-400 leading-relaxed mb-4">
                    For student-run events across chapters (such as regional hackathons, quiz challenges, or local AI workshops), updates are routinely compiled at the ACM India Student Chapters Portal.
                  </p>
                  <a
                    href="https://acmindia-studentchapters.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-brand-teal-light hover:text-white font-bold text-sm transition-colors"
                  >
                    Visit Student Chapters Hub
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </div>
  );
}
