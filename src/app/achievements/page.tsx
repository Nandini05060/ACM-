"use client";

import { FadeUp } from "@/components/animations/FadeUp";
import {
  Trophy,
  Award,
  Users,
  Terminal,
  Cpu,
  Sparkles,
  Link2,
  Play,
  ArrowRight,
  ShieldAlert,
  GraduationCap,
} from "lucide-react";
import { motion } from "framer-motion";

export default function AchievementsPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 16,
      },
    },
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#030712] pb-32 pt-24 md:pt-32 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 h-[800px] w-[800px] bg-brand-purple/10 rounded-full blur-[150px] opacity-40" />
        <div className="absolute bottom-0 left-0 h-[800px] w-[800px] bg-brand-teal/5 rounded-full blur-[150px] opacity-35" />
      </div>

      {/* Hero Section */}
      <div className="relative mb-20 px-6 z-10">
        <div className="container relative mx-auto max-w-5xl text-center">
          <FadeUp>
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-purple/20 border border-brand-purple/30 shadow-[0_0_30px_rgba(109,74,255,0.25)]">
              <Trophy className="h-8 w-8 text-brand-purple-light animate-pulse" />
            </div>
            <h1 className="font-heading text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
              Honors & <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple-light to-brand-teal-light">Milestones</span>
            </h1>
            <p className="text-xl text-gray-400 font-medium max-w-3xl mx-auto leading-relaxed">
              The <strong>SVKM’s NMIMS Indore ACM Student Chapter</strong> has established itself as a highly active, high-impact hub within the national ACM India community. Through large-scale event organization, academic collaborations, and robust technical programming, the chapter has achieved several key milestones.
            </p>
          </FadeUp>
        </div>
      </div>

      {/* Main achievements layout */}
      <div className="container mx-auto px-6 max-w-6xl space-y-20 relative z-10">
        
        {/* Achievements Timeline/Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-8"
        >
          {/* Card 1: Hosting ACM India Chapter Summit 2025 */}
          <motion.div
            variants={itemVariants}
            className="glass-card rounded-[2.5rem] border border-white/10 p-8 md:p-12 hover:border-brand-purple/40 hover:shadow-[0_20px_50px_-10px_rgba(109,74,255,0.15)] transition-all duration-500 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="h-16 w-16 shrink-0 rounded-2xl bg-brand-purple/20 border border-brand-purple/30 flex items-center justify-center text-brand-purple-light">
                <Users className="h-8 w-8 group-hover:scale-110 transition-transform" />
              </div>
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="bg-brand-purple/20 border-brand-purple/30 text-brand-purple-light rounded-full border px-4.5 py-1 text-xs font-bold uppercase tracking-wider">
                    Flagship Hosting
                  </span>
                  <span className="text-sm font-semibold text-gray-500">December 18–20, 2025</span>
                </div>
                <h2 className="text-3xl font-black text-white group-hover:text-glow transition-all">
                  1. Hosting the Flagship ACM India Chapter Summit 2025
                </h2>
                <p className="text-brand-purple-light text-lg font-semibold italic">
                  “The Human–AI Partnership: Shaping Human Capital for an AI Era.”
                </p>
                <p className="text-gray-300 leading-relaxed font-medium">
                  The crowning national achievement for the NMIMS Indore chapter was being selected to organize and host the prestigious <strong>ACM India All India Chapter Summit</strong>.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/10">
                  <div className="space-y-2">
                    <h4 className="text-white font-bold flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-purple" />
                      National Scale
                    </h4>
                    <p className="text-sm text-gray-400">
                      The campus served as the central node for ACM student leaders, faculty sponsors, researchers, and professional chapters from prominent engineering institutes across India (such as IISc, IITs, OIST, and Stanley College).
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-white font-bold flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-purple" />
                      High-Profile Panelists
                    </h4>
                    <p className="text-sm text-gray-400">
                      Successfully brought together elite national tech minds, including the Director of IIT-Indore (Prof. Suhas Joshi), IISc Bangalore professors, and former directors of C-DAC, providing a stellar platform for national networking.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: High-Impact Technical Initiatives & Experiential Learning */}
          <motion.div
            variants={itemVariants}
            className="glass-card rounded-[2.5rem] border border-white/10 p-8 md:p-12 hover:border-brand-teal/40 hover:shadow-[0_20px_50px_-10px_rgba(0,229,192,0.15)] transition-all duration-500 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-teal/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="h-16 w-16 shrink-0 rounded-2xl bg-brand-teal/20 border border-brand-teal/30 flex items-center justify-center text-brand-teal-light">
                <Cpu className="h-8 w-8 group-hover:scale-110 transition-transform" />
              </div>
              <div className="space-y-4">
                <span className="bg-brand-teal/20 border-brand-teal/30 text-brand-teal-light rounded-full border px-4.5 py-1 text-xs font-bold uppercase tracking-wider inline-block">
                  Hands-On Pedagogy
                </span>
                <h2 className="text-3xl font-black text-white group-hover:text-glow transition-all">
                  2. High-Impact Technical Initiatives & Experiential Learning
                </h2>
                <p className="text-gray-300 leading-relaxed font-medium">
                  The chapter has consistently succeeded in bridging classroom theory with heavy hands-on industry application. Key recurring triumphs include:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-white/10">
                  <div className="space-y-2">
                    <div className="text-brand-teal-light font-bold text-lg flex items-center gap-2">
                      <Terminal className="h-5 w-5" />
                      Advanced Tech
                    </div>
                    <p className="text-sm text-gray-400">
                      Hosting intensive, activity-based workshops ranging from UI/UX and Full-Stack Development to Game Design and High-End Tech Stack deep-dives.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="text-brand-teal-light font-bold text-lg flex items-center gap-2">
                      <Cpu className="h-5 w-5" />
                      Robotics & Hardware
                    </div>
                    <p className="text-sm text-gray-400">
                      Promoting edge AI and robotic engineering concepts, mobilizing students to conceptualize, design, and assemble custom prototypes for robowars and line-followers.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="text-brand-teal-light font-bold text-lg flex items-center gap-2">
                      <Sparkles className="h-5 w-5" />
                      Hackathons & Sprints
                    </div>
                    <p className="text-sm text-gray-400">
                      Facilitating multi-hour mini-hackathons and technical cup events that push students to build functional web applications and data systems under intense time constraints.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Fostering Inclusive Tech Ecosystems (ACM-W India Support) */}
          <motion.div
            variants={itemVariants}
            className="glass-card rounded-[2.5rem] border border-white/10 p-8 md:p-12 hover:border-pink-500/40 hover:shadow-[0_20px_50px_-10px_rgba(244,114,182,0.15)] transition-all duration-500 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="h-16 w-16 shrink-0 rounded-2xl bg-pink-500/20 border border-pink-500/30 flex items-center justify-center text-pink-400">
                <Sparkles className="h-8 w-8 group-hover:scale-110 transition-transform" />
              </div>
              <div className="space-y-4">
                <span className="bg-pink-500/20 border-pink-500/30 text-pink-400 rounded-full border px-4.5 py-1 text-xs font-bold uppercase tracking-wider inline-block">
                  Diversity & Inclusion
                </span>
                <h2 className="text-3xl font-black text-white group-hover:text-glow transition-all">
                  3. Fostering Inclusive Tech Ecosystems
                </h2>
                <p className="text-gray-300 leading-relaxed font-medium">
                  Aligning with ACM India’s nationwide push for diversity, the NMIMS Indore chapter has been a major proponent of inclusive tech leadership:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/10">
                  <div className="space-y-2">
                    <h4 className="text-white font-bold flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-pink-400" />
                      Empowering Female Innovators
                    </h4>
                    <p className="text-sm text-gray-400">
                      Actively promoting and preparing its members for high-tier national programming tracks, such as the <em>ACM-W Lady Ada National Level Programming Contest</em> and the <em>Grad Cohort</em> mentorship programs.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-white font-bold flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-pink-400" />
                      Peer-to-Peer Technical Leadership
                    </h4>
                    <p className="text-sm text-gray-400">
                      Cultivating a strong culture of student mentorship, where senior chapter office-bearers and core technical teams directly train junior batches in DSA, DBMS, and frontend engineering.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 4: Corporate and Institutional Placement Bridges */}
          <motion.div
            variants={itemVariants}
            className="glass-card rounded-[2.5rem] border border-white/10 p-8 md:p-12 hover:border-blue-500/40 hover:shadow-[0_20px_50px_-10px_rgba(59,130,246,0.15)] transition-all duration-500 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="h-16 w-16 shrink-0 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <GraduationCap className="h-8 w-8 group-hover:scale-110 transition-transform" />
              </div>
              <div className="space-y-4">
                <span className="bg-blue-500/20 border-blue-500/30 text-blue-400 rounded-full border px-4.5 py-1 text-xs font-bold uppercase tracking-wider inline-block">
                  Career Readiness
                </span>
                <h2 className="text-3xl font-black text-white group-hover:text-glow transition-all">
                  4. Corporate and Institutional Placement Bridges
                </h2>
                <p className="text-gray-300 leading-relaxed font-medium">
                  The active presence of the ACM chapter has directly translated into strong institutional outcomes. The chapter's focus on secure, scalable development and modern system architectures has helped equip students to excel on competitive national stages—such as securing premier placements and project recognitions via intense national tech-challenges (e.g., the <em>RBIH National Fraud Hackathon</em> initiatives).
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Summit Highlights Video Section */}
        <FadeUp delay={0.4}>
          <div className="glass-card rounded-[2.5rem] border border-white/10 p-8 md:p-12 relative overflow-hidden bg-gradient-to-b from-white/[0.02] to-transparent">
            <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-6">
              <div>
                <h3 className="font-heading text-2xl font-bold text-white flex items-center gap-3">
                  <Play className="h-6 w-6 text-brand-purple-light" />
                  Summit Highlights Video
                </h3>
                <p className="text-sm text-gray-400 mt-2">
                  This video captures the panel discussions, student interactions, and key highlights of the national summit.
                </p>
              </div>
              <a
                href="https://www.youtube.com/watch?v=NlzYTRUckrk"
                target="_blank"
                rel="noopener noreferrer"
                className="glass rounded-xl border border-white/10 px-5 py-2.5 text-xs font-bold text-white uppercase tracking-wider hover:bg-white/10 hover:border-white/20 transition-all inline-flex items-center gap-2"
              >
                Watch on YouTube
                <ArrowRight className="h-4.5 w-4.5" />
              </a>
            </div>

            {/* Embedded Player */}
            <div className="relative aspect-video w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl bg-black">
              <iframe
                src="https://www.youtube.com/embed/NlzYTRUckrk?mute=1"
                title="ACM India Chapter Summit 2025 Highlights"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0 rounded-3xl"
              />
            </div>
          </div>
        </FadeUp>

        {/* Where to Track Continued Growth (Quick Links) */}
        <FadeUp delay={0.5}>
          <div className="glass-card rounded-[2.5rem] border border-white/10 p-8 md:p-12 bg-white/[0.01]">
            <h3 className="font-heading text-2xl font-bold text-white mb-8 border-b border-white/10 pb-4">
              Where to Track Their Continued Growth
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-4 group">
                <div className="h-12 w-12 rounded-xl bg-brand-teal/20 border border-brand-teal/30 flex items-center justify-center shrink-0 text-brand-teal-light group-hover:scale-105 transition-transform">
                  <Link2 className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-2 text-lg">ACM India Recognition Space</h4>
                  <p className="text-sm text-gray-400 leading-relaxed mb-4">
                    The chapter routinely submits its operational logs to compete for national categories like the <em>Outstanding Chapter Activities Award</em> and <em>Outstanding Website Award</em>.
                  </p>
                  <a
                    href="https://acmindia-studentchapters.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-brand-teal-light hover:text-white font-bold text-sm transition-colors"
                  >
                    acmindia-studentchapters.in
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>

              <div className="flex gap-4 group">
                <div className="h-12 w-12 rounded-xl bg-brand-purple/20 border border-brand-purple/30 flex items-center justify-center shrink-0 text-brand-purple-light group-hover:scale-105 transition-transform">
                  <Link2 className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-2 text-lg">Campus Archive</h4>
                  <p className="text-sm text-gray-400 leading-relaxed mb-4">
                    Major event milestones and departmental triumphs are preserved in the NMIMS Spandan E-Magazine Archive.
                  </p>
                  <a
                    href="https://spandan.nmims.edu/category/nmims-indore-campus/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-brand-purple-light hover:text-white font-bold text-sm transition-colors"
                  >
                    spandan.nmims.edu
                    <ArrowRight className="h-4 w-4" />
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
