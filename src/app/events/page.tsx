"use client";

import { useState } from "react";
import { FadeUp } from "@/components/animations/FadeUp";
import {
  Calendar,
  MapPin,
  ArrowUpRight,
  PlayCircle,
  Users,
  Activity,
  Target,
  Shield,
  Terminal,
  Cpu,
  BookOpen,
  Award,
  FileText,
  Download,
  Briefcase,
  Filter,
} from "lucide-react";
import Link from "next/link";

export default function EventsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const workshops = [
    {
      title: "CodeSwap Tech Sprints",
      icon: <Terminal className="text-brand-purple-light h-7 w-7" />,
      color: "brand-purple",
      desc: "Teams logic-build for 30 minutes, after which a systematic repository hand-off is enforced. Rival teams take control of incomplete code, requiring real-time comprehension and rapid debugging.",
      tag: "Hackathon",
    },
    {
      title: "Laser Labyrinth: Escape the Grid",
      icon: <Target className="h-7 w-7 text-red-400" />,
      color: "red",
      desc: "Funded by central competitive grants. Teams enter physical logic grids where they must bypass electronic beams, decode cryptographic keys, and write algorithms to open checkpoint nodes.",
      tag: "Gamified",
    },
    {
      title: "Line Follower Bot Hardware",
      icon: <Cpu className="text-brand-teal-light h-7 w-7" />,
      color: "brand-teal",
      desc: "An intensive 2-day embedded systems training covering microcontrollers, infrared array calibrations, and motor driver testing, concluding with a time-trial lap race.",
      tag: "Workshop",
    },
    {
      title: "The 3-Day Technical Model UN",
      icon: <Briefcase className="h-7 w-7 text-blue-400" />,
      color: "blue",
      desc: "Merges technological standardizations with legal policy. Delegations debate global tech governance (open-access AI, privacy laws), forcing students to justify logic under geopolitical constraints.",
      tag: "Policy",
    },
  ];

  const filteredWorkshops =
    activeFilter === "All" ? workshops : workshops.filter((w) => w.tag === activeFilter);

  return (
    <div className="flex min-h-screen flex-col pb-24">
      {/* Hero Section & Highlight Reel */}
      <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden border-b border-white/5 pt-24">
        {/* Abstract Backgrounds */}
        <div className="absolute inset-0 bg-[#030712]" />
        <div className="bg-aurora pointer-events-none absolute top-0 right-0 h-[800px] w-[800px] rounded-full mix-blend-screen blur-[120px] bg-brand-purple/20" />
        <div className="bg-aurora pointer-events-none absolute bottom-0 left-0 h-[600px] w-[600px] rounded-full mix-blend-screen blur-[120px] bg-brand-teal/20" />
        <div className="pointer-events-none absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />

        <div className="relative z-10 container mx-auto flex flex-col items-center gap-12 px-6 lg:flex-row">
          <div className="flex-1 text-center lg:text-left">
            <FadeUp>
              <div className="glass mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 px-5 py-2.5 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                <Activity className="text-brand-purple-light h-4 w-4" />
                <span className="text-sm font-semibold tracking-[0.2em] text-white uppercase">
                  Program Registry
                </span>
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <h1 className="font-heading mb-6 text-6xl font-black tracking-tighter md:text-8xl">
                Events{" "}
                <span className="from-brand-purple-light to-brand-teal-light bg-gradient-to-br bg-clip-text text-transparent">
                  Archive
                </span>
              </h1>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="mx-auto max-w-2xl text-xl leading-relaxed font-medium text-gray-400 lg:mx-0">
                A comprehensive registry of High-Concept Technical Sprints, Regional Summits, and
                Policy Challenges across the last two academic years.
              </p>
            </FadeUp>
          </div>

          {/* Highlight Reel Video Area */}
          <FadeUp delay={0.3} className="w-full max-w-2xl flex-1">
            <div className="glass-card group relative aspect-video overflow-hidden rounded-3xl border border-white/20 shadow-[0_0_50px_rgba(109,74,255,0.2)]">
              <video
                src="/gallery/m.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover opacity-60 transition-opacity duration-700 group-hover:opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#05050A] via-transparent to-transparent opacity-80" />

              <div className="absolute right-6 bottom-6 left-6 flex items-end justify-between">
                <div>
                  <h3 className="mb-1 text-xl font-bold text-white">ACM Chapter Summit 2025</h3>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Statistics Dashboard */}
      <section className="relative z-20 -mt-10 mb-24">
        <div className="container mx-auto px-6">
          <div className="glass-card border-brand-teal/20 rounded-[2rem] p-8 shadow-[0_0_40px_rgba(0,229,192,0.1)] lg:p-12">
            <div className="grid grid-cols-2 gap-8 divide-x divide-white/10 lg:grid-cols-4">
              <div className="px-4 text-center lg:text-left">
                <div className="text-brand-teal-light mb-2 flex justify-center lg:justify-start">
                  <Users className="h-6 w-6" />
                </div>
                <div className="mb-2 text-4xl font-black text-white md:text-5xl">1,200+</div>
                <div className="text-sm font-semibold tracking-wider text-gray-400 uppercase">
                  Unique Students
                </div>
              </div>
              <div className="px-4 text-center lg:text-left">
                <div className="text-brand-purple-light mb-2 flex justify-center lg:justify-start">
                  <MapPin className="h-6 w-6" />
                </div>
                <div className="mb-2 text-4xl font-black text-white md:text-5xl">45+</div>
                <div className="text-sm font-semibold tracking-wider text-gray-400 uppercase">
                  External Chapters
                </div>
              </div>
              <div className="px-4 text-center lg:text-left">
                <div className="mb-2 flex justify-center text-yellow-400 lg:justify-start">
                  <Award className="h-6 w-6" />
                </div>
                <div className="mb-2 text-4xl font-black text-white md:text-5xl">₹15k</div>
                <div className="text-sm font-semibold tracking-wider text-gray-400 uppercase">
                  ABF Funding Secured
                </div>
              </div>
              <div className="px-4 text-center lg:text-left">
                <div className="mb-2 flex justify-center text-blue-400 lg:justify-start">
                  <Terminal className="h-6 w-6" />
                </div>
                <div className="mb-2 text-4xl font-black text-white md:text-5xl">30+</div>
                <div className="text-sm font-semibold tracking-wider text-gray-400 uppercase">
                  Engineering Teams
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Flagship Events */}
      <section className="relative py-16">
        <div className="container mx-auto px-6">
          <FadeUp>
            <div className="mb-12 flex items-center gap-4">
              <Shield className="text-brand-purple h-8 w-8" />
              <h2 className="font-heading text-4xl font-black text-white">
                Flagship & National Summits
              </h2>
            </div>
          </FadeUp>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Summit */}
            <FadeUp delay={0.1}>
              <div className="glass-card group relative overflow-hidden rounded-[2.5rem] border border-white/5 p-10 transition-all duration-700 hover:-translate-y-2 hover:border-brand-purple/30 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.8)] h-full">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-purple/15 via-transparent to-transparent pointer-events-none" />
                <div className="relative z-10">
                  <div className="mb-6 flex items-start justify-between">
                    <div className="bg-brand-purple/20 text-brand-purple-light border-brand-purple/30 rounded-full border px-4 py-1.5 text-xs font-bold tracking-wider uppercase">
                      National Level
                    </div>
                    <span className="text-sm font-semibold text-gray-500">Dec 2025</span>
                  </div>
                  <h3 className="mb-3 text-3xl font-black text-white">
                    Annual ACM India Chapter Summit
                  </h3>
                  <p className="text-brand-purple-light mb-6 font-medium italic">
                    "The Human-AI Partnership: Shaping Human Capital for an AI Era"
                  </p>
                  <p className="mb-8 leading-relaxed text-gray-400">
                    Two full days of continuous flagship programming including panel debates,
                    technical presentations, and executive networking mixers. Targeted at delegations
                    from computing student chapters, professional bodies, and SIG leaders.
                  </p>
                </div>
              </div>
            </FadeUp>

            {/* COMPUTE */}
            <FadeUp delay={0.2}>
              <div className="glass-card group relative overflow-hidden rounded-[2.5rem] border border-white/5 p-10 transition-all duration-700 hover:-translate-y-2 hover:border-brand-teal/30 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.8)] h-full">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-teal/15 via-transparent to-transparent pointer-events-none" />
                <div className="relative z-10">
                  <div className="mb-6 flex items-start justify-between">
                    <div className="bg-brand-teal/20 text-brand-teal-light border-brand-teal/30 rounded-full border px-4 py-1.5 text-xs font-bold tracking-wider uppercase">
                      Regional Level
                    </div>
                    <span className="text-sm font-semibold text-gray-500">Early 2026</span>
                  </div>
                  <h3 className="mb-3 text-3xl font-black text-white">
                    COMPUTE Regional Event (CRE)
                  </h3>
                  <p className="text-brand-teal-light mb-6 font-medium">
                    In collaboration with iSIGCSE
                  </p>
                  <p className="mb-8 leading-relaxed text-gray-400">
                    A dedicated academic symposium structured around computer science educational
                    frameworks, curriculum modernization, and tech-focused action research. Audience
                    included elite regional academics and department heads across Central India.
                  </p>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Technical Tracks & Workshops Grid */}
      <section className="bg-brand-900/30 relative border-y border-white/5 py-24">
        <div className="container mx-auto px-6">
          <FadeUp>
            <div className="mb-16 flex flex-col items-center justify-between gap-6 md:flex-row">
              <div>
                <h2 className="font-heading mb-2 text-4xl font-black text-white">
                  Workshops & Gamified Escapes
                </h2>
                <p className="text-lg text-gray-400">
                  Event cards with filters across extreme programming and embedded hardware.
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/40 p-1.5 backdrop-blur-md">
                <Filter className="ml-3 h-4 w-4 text-gray-400" />
                {["All", "Hackathon", "Gamified", "Workshop", "Policy"].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setActiveFilter(tag)}
                    className={`rounded-xl px-4 py-2 text-sm font-bold transition-all ${
                      activeFilter === tag
                        ? "bg-white/10 text-white shadow"
                        : "text-gray-500 hover:bg-white/5 hover:text-gray-300"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </FadeUp>

          <div className="grid gap-6 md:grid-cols-2">
            {filteredWorkshops.map((workshop, i) => (
              <FadeUp key={workshop.title} delay={0.1 * i}>
                <div className="glass-card group relative overflow-hidden rounded-[2rem] border border-white/5 p-8 transition-all duration-700 hover:-translate-y-2 hover:border-white/20 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.8)] h-full flex flex-col">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none z-0" />
                  <div className="relative z-10 flex-1 flex flex-col">
                    <div
                      className={`h-14 w-14 rounded-2xl bg-${workshop.color === "brand-purple" ? "brand-purple/20" : workshop.color === "brand-teal" ? "brand-teal/20" : workshop.color === "red" ? "red-500/20" : "blue-500/20"} mb-6 flex items-center justify-center transition-transform duration-500 group-hover:scale-110`}
                    >
                      {workshop.icon}
                    </div>
                    <h3 className="mb-3 text-2xl font-bold text-white group-hover:text-glow transition-all">{workshop.title}</h3>
                    <p className="mb-6 text-sm leading-relaxed text-gray-400 flex-1">{workshop.desc}</p>
                    <div className="mt-auto flex gap-2">
                      <span className="rounded-md border border-white/10 bg-white/10 px-2 py-1 text-[10px] font-bold tracking-wider text-gray-300 uppercase">
                        {workshop.tag}
                      </span>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* temporal Archive Timeline */}
      <section className="relative py-24">
        <div className="container mx-auto max-w-5xl px-6">
          <FadeUp>
            <h2 className="font-heading mb-12 text-center text-4xl font-black text-white">
              Temporal Archive Layout
            </h2>
          </FadeUp>

          <div className="glass-card overflow-hidden rounded-[2rem]">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5 text-sm font-bold tracking-wider text-gray-300 uppercase">
                    <th className="p-6">Academic Timeline</th>
                    <th className="p-6">Primary Event Focus</th>
                    <th className="p-6">Operational Lead Entity</th>
                    <th className="p-6 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-gray-400">
                  <tr className="transition-colors hover:bg-white/5">
                    <td className="p-6 font-medium whitespace-nowrap text-white">Sep - Nov 2024</td>
                    <td className="p-6">Launch of Structural Inclusivity Panels</td>
                    <td className="p-6">Initial ACM-W Core Group</td>
                    <td className="p-6 text-center">
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-gray-300">
                        Archived
                      </span>
                    </td>
                  </tr>
                  <tr className="transition-colors hover:bg-white/5">
                    <td className="p-6 font-medium whitespace-nowrap text-white">Sep - Nov 2025</td>
                    <td className="p-6">ACM India Chapter Summit Prep</td>
                    <td className="p-6">Full Joint Executive Board</td>
                    <td className="p-6 text-center">
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-gray-300">
                        Archived
                      </span>
                    </td>
                  </tr>
                  <tr className="transition-colors hover:bg-white/5">
                    <td className="p-6 font-medium whitespace-nowrap text-white">
                      Dec 19 - 20, 2025
                    </td>
                    <td className="text-brand-purple-light p-6 font-bold">
                      Flagship India Chapter Summit Execution
                    </td>
                    <td className="p-6">Organizing Chair & Full Board</td>
                    <td className="p-6 text-center">
                      <span className="bg-brand-purple/20 border-brand-purple/30 text-brand-purple-light rounded-full border px-3 py-1 text-xs font-bold">
                        Archived
                      </span>
                    </td>
                  </tr>
                  <tr className="transition-colors hover:bg-white/5">
                    <td className="p-6 font-medium whitespace-nowrap text-white">
                      Jan 30 - 31, 2026
                    </td>
                    <td className="p-6">Line Follower Robotic Automation Blueprint</td>
                    <td className="p-6">LEADS Operations (Events/Tech)</td>
                    <td className="p-6 text-center">
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-gray-300">
                        Archived
                      </span>
                    </td>
                  </tr>
                  <tr className="transition-colors hover:bg-white/5">
                    <td className="p-6 font-medium whitespace-nowrap text-white">Feb - Mar 2026</td>
                    <td className="text-brand-teal-light p-6 font-bold">
                      COMPUTE Regional Event (CRE Zone Hosting)
                    </td>
                    <td className="p-6">Senior Faculty Councils</td>
                    <td className="p-6 text-center">
                      <span className="bg-brand-teal/20 border-brand-teal/30 text-brand-teal-light rounded-full border px-3 py-1 text-xs font-bold">
                        Archived
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Speaker Profiles Showcase */}
      <section className="from-brand-900/40 relative bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] via-transparent to-transparent py-24">
        <div className="container mx-auto px-6">
          <FadeUp>
            <div className="mb-16 text-center">
              <h2 className="font-heading mb-4 text-4xl font-black text-white">
                Eminent Speaker Registry
              </h2>
              <p className="mx-auto max-w-2xl text-gray-400">
                Premium tech-policy influencers and computing researchers who drove domain authority
                during the last two cycles.
              </p>
            </div>
          </FadeUp>

          <div className="grid gap-8 md:grid-cols-2">
            {[
              {
                name: "Prof. Suhas Joshi",
                role: "Director, IIT Indore",
                track: "Opening Keynote Address, ACM India Summit 2025",
                discussion:
                  "The systematic evolution of engineering human capital in an environment saturated by deep generative AI frameworks.",
              },
              {
                name: "Prof. Sashikumaar Ganesan",
                role: "Professor, IISc Bangalore & Founder, Zenteiq Aitech Innovations",
                track: "Advanced Computing Keynote",
                discussion:
                  '"The Scientific Foundation Model: Neural Approaches to Engineering Problems", focusing on utilizing multi-modal deep models to solve physical structural engineering equations.',
              },
              {
                name: "Dr. Srinivas Padmanabhuni",
                role: "Co-founder, testAIng, Bangalore",
                track: "Special AI Validation Series",
                discussion:
                  '"Testing Agentic AI", highlighting debugging paradigms, unpredictable automated logical inference loops, and structural frameworks for validating multi-agent clusters.',
              },
              {
                name: "Dr. Sasi Kumar",
                role: "Former Director, CDAC Mumbai",
                track: "Distant Education & Learning Research (Virtual Track)",
                discussion:
                  "Re-architecting modern computer science pedagogical structures to balance rapid unlearning and adaptive industry upskilling.",
              },
            ].map((speaker, i) => (
              <FadeUp
                key={speaker.name}
                delay={0.1 * i}
                className="glass-card hover:border-brand-purple/30 flex flex-col rounded-[2rem] p-8 transition-colors"
              >
                <div className="mb-6 flex items-center gap-4">
                  <div className="from-brand-purple/40 to-brand-teal/40 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{speaker.name}</h3>
                    <p className="text-brand-teal-light text-sm font-semibold">{speaker.role}</p>
                  </div>
                </div>
                <div className="mb-4">
                  <span className="mb-1 block text-xs font-bold tracking-wider text-gray-500 uppercase">
                    Session Track
                  </span>
                  <p className="text-sm text-white">{speaker.track}</p>
                </div>
                <div className="mt-auto">
                  <span className="mb-1 block text-xs font-bold tracking-wider text-gray-500 uppercase">
                    Core Discussion
                  </span>
                  <p className="text-sm leading-relaxed text-gray-400 italic">
                    {speaker.discussion}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Certificates & Resources */}
      <section className="relative border-t border-white/5 py-24">
        <div className="container mx-auto px-6">
          <div className="grid items-start gap-12 lg:grid-cols-2 max-w-5xl mx-auto">
            <FadeUp>
              <h2 className="font-heading mb-6 text-4xl font-black text-white">
                Automated Asset Distribution Engine
              </h2>
              <p className="text-lg leading-relaxed text-gray-400">
                The chapter provides automated, authenticated asset distribution mechanisms for all
                event attendees and core organizers. Every certificate carries a tamper-proof,
                programmatic validation ID coupled to the student’s profile.
              </p>
            </FadeUp>

            <FadeUp delay={0.1} className="space-y-6">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/5">
                  <FileText className="text-brand-purple-light h-5 w-5" />
                </div>
                <div>
                  <h4 className="mb-1 font-bold text-white">Executive & Technical Credentials</h4>
                  <p className="text-sm text-gray-400">
                    Formal structural service certificates and technical merit credentials issued
                    strictly to winners and core leadership.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/5">
                  <BookOpen className="text-brand-teal-light h-5 w-5" />
                </div>
                <div>
                  <h4 className="mb-1 font-bold text-white">Slide Decks & Code Repositories</h4>
                  <p className="text-sm text-gray-400">
                    Instant access to verified storage zones housing presentations, Github project
                    pathways, and hardware pin-out diagrams.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/5">
                  <PlayCircle className="text-brand-purple-light h-5 w-5" />
                </div>
                <div>
                  <h4 className="mb-1 font-bold text-white">Recorded Lectures Vault</h4>
                  <p className="text-sm text-gray-400">
                    Indexed video deep-dives of all expert panels, AI design workshops, and
                    software instructionals.
                  </p>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
    </div>
  );
}
