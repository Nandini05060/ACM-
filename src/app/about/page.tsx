"use client";

import { FadeUp } from "@/components/animations/FadeUp";
import {
  Globe,
  Shield,
  Users,
  MapPin,
  Target,
  Sparkles,
  BookOpen,
  Fingerprint,
  RefreshCcw,
  Handshake,
  Award,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#030712] relative">
      {/* Hero Section */}
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden">
        <div
          className="animate-float pointer-events-none absolute top-1/4 left-1/4 h-[400px] w-[400px] rounded-full opacity-30 mix-blend-screen"
          style={{
            background: "radial-gradient(circle, rgba(109,74,255,0.6) 0%, rgba(109,74,255,0) 70%)",
          }}
        />
        <div
          className="animate-float-delayed pointer-events-none absolute right-1/4 bottom-1/4 h-[500px] w-[500px] rounded-full opacity-20 mix-blend-screen"
          style={{
            background: "radial-gradient(circle, rgba(0,229,192,0.6) 0%, rgba(0,229,192,0) 70%)",
          }}
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay z-[-1]" />

        <div className="relative z-10 container mx-auto px-6 pt-24 text-center">
          <FadeUp>
            <div className="glass mb-8 inline-flex cursor-default items-center gap-3 rounded-full border border-white/10 px-5 py-2.5 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
              <Sparkles className="text-brand-purple-light h-4 w-4" />
              <span className="text-sm font-semibold tracking-[0.2em] text-white uppercase">
                Our Heritage
              </span>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h1 className="font-heading mb-6 text-6xl font-black tracking-tighter text-white md:text-8xl">
              About{" "}
              <span className="from-purple-400 to-teal-400 bg-gradient-to-br bg-clip-text text-transparent">
                ACM
              </span>
            </h1>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="mx-auto max-w-3xl text-xl leading-relaxed font-medium text-gray-400 md:text-2xl">
              The world’s largest and most prestigious educational and scientific computing society.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Global & Local Context */}
      <section className="relative z-10 -mt-10 py-24">
        <div className="container mx-auto px-6">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Global ACM */}
            <FadeUp delay={0.1} className="h-full">
              <div className="glass-card group hover:border-brand-purple/40 hover:glow-purple relative flex h-full flex-col overflow-hidden rounded-[3rem] p-10 transition-all duration-500 md:p-14">
                <div className="bg-brand-purple/10 group-hover:bg-brand-purple/20 absolute -top-10 -right-10 h-64 w-64 rounded-full blur-[60px] transition-colors" />
                <Globe className="text-brand-purple-light mb-8 h-12 w-12 transition-transform group-hover:scale-110" />
                <h3 className="font-heading mb-6 text-3xl font-black text-white">
                  About ACM Globally
                </h3>
                <p className="mb-8 text-lg leading-relaxed text-gray-300">
                  Founded in <strong>1947</strong> at Columbia University, ACM spans across more
                  than 190 countries with over 100,000 professional and student members. It serves
                  as the collective, international voice for computer science researchers,
                  educators, and industry practitioners.
                </p>
                <div className="mt-auto space-y-4">
                  <div className="flex items-start gap-4">
                    <BookOpen className="text-brand-purple mt-1 h-6 w-6 shrink-0" />
                    <div>
                      <strong className="text-white">Digital Library:</strong> The premier
                      repository now operating on a Fully Open Access (OA) model.
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Users className="text-brand-purple mt-1 h-6 w-6 shrink-0" />
                    <div>
                      <strong className="text-white">38 SIGs:</strong> Special Interest Groups
                      focusing on technical sub-disciplines like SIGCSE and SIGGRAPH.
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Award className="text-brand-purple mt-1 h-6 w-6 shrink-0" />
                    <div>
                      <strong className="text-white">The Turing Award:</strong> The "Nobel Prize of
                      Computing" recognizing major technical contributions.
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Shield className="text-brand-purple mt-1 h-6 w-6 shrink-0" />
                    <div>
                      <strong className="text-white">ACM-W:</strong> Global advocacy dedicated to
                      supporting women in computing fields.
                    </div>
                  </div>
                </div>
              </div>
            </FadeUp>

            {/* Local Chapter */}
            <FadeUp delay={0.2} className="h-full">
              <div className="glass-card group hover:border-brand-teal/40 hover:glow-teal relative flex h-full flex-col overflow-hidden rounded-[3rem] p-10 transition-all duration-500 md:p-14">
                <div className="bg-brand-teal/10 group-hover:bg-brand-teal/20 absolute -top-10 -right-10 h-64 w-64 rounded-full blur-[60px] transition-colors" />
                <MapPin className="text-brand-teal-light mb-8 h-12 w-12 transition-transform group-hover:scale-110" />
                <h3 className="font-heading mb-6 text-3xl font-black text-white">
                  The Local Student Chapter
                </h3>
                <p className="mb-8 text-lg leading-relaxed text-gray-300">
                  Operating natively under <strong>SVKM's NMIMS Indore</strong> within the{" "}
                  <strong>STME</strong>, our chapter serves as a specialized high-tier technical
                  hub. Working directly with <strong>ACM India</strong>, we link standard
                  engineering curricula with demanding industry expectations.
                </p>
                <div className="mt-auto rounded-3xl border border-white/10 bg-white/5 p-8">
                  <h4 className="mb-4 text-sm font-bold tracking-wider text-white uppercase">
                    Leadership Structure
                  </h4>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-3">
                      <div className="bg-brand-teal-light h-2 w-2 rounded-full" />
                      <span className="text-gray-300">
                        <strong>Main ACM Exec Council:</strong> Core leadership.
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="bg-brand-teal-light h-2 w-2 rounded-full" />
                      <span className="text-gray-300">
                        <strong>ACM-W Wing:</strong> Targeting campus-wide diversity.
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="bg-brand-teal-light h-2 w-2 rounded-full" />
                      <span className="text-gray-300">
                        <strong>LEADS Core Group:</strong> Managing execution & logistics.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="bg-gradient-to-b from-[#030712] to-[#050816] relative overflow-hidden border-y border-white/5 py-24">
        <div className="from-brand-purple/5 absolute inset-0 bg-gradient-to-r to-transparent" />
        <div className="relative z-10 container mx-auto px-6">
          <FadeUp>
            <div className="mb-16 text-center">
              <h2 className="font-heading mb-4 text-4xl font-black text-white md:text-5xl">
                Chapter Objectives
              </h2>
              <div className="bg-brand-purple mx-auto h-1 w-16 rounded-full" />
            </div>
          </FadeUp>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Bridging Theory & Practice",
                desc: "Implementing advanced technical modules and continuous codebase testing environments.",
              },
              {
                title: "Cultivating Acumen",
                desc: "Connecting students with computing scientists and regional symposiums.",
              },
              {
                title: "Alternative Pedagogy",
                desc: "Designing interactive, gamified spaces like live codebase handovers for extreme agility.",
              },
              {
                title: "Expanding Diversity",
                desc: "Leveraging ACM-W to create dedicated mentorship exclusively for women engineers.",
              },
            ].map((obj, i) => (
              <FadeUp
                key={obj.title}
                delay={0.1 * i}
                className="glass-card hover:border-brand-purple/30 rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2"
              >
                <Target className="text-brand-purple-light mb-6 h-8 w-8" />
                <h4 className="mb-3 text-xl font-bold text-white">{obj.title}</h4>
                <p className="text-sm leading-relaxed text-gray-400">{obj.desc}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* NMIMS Indore Highlight Video Section */}
      <section className="relative py-24 bg-[#030712] overflow-hidden border-b border-white/5">
        <div className="bg-brand-teal/5 absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px] pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <FadeUp>
            <div className="mb-16 text-center">
              <span className="text-brand-teal-light mb-4 text-sm font-bold tracking-widest uppercase block">
                Campus Spotlight
              </span>
              <h2 className="font-heading mb-4 text-4xl font-black text-white md:text-5xl">
                SVKM's NMIMS Indore
              </h2>
              <div className="bg-brand-teal mx-auto h-1 w-16 rounded-full mb-6" />
              <p className="mx-auto max-w-2xl text-gray-400">
                Explore our state-of-the-art campus infrastructure and active learning environment that powers the SVKM's NMIMS Indore Student Chapter.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.2} className="mx-auto max-w-4xl">
            <div className="glass-card group relative aspect-video overflow-hidden rounded-[2.5rem] border border-white/10 shadow-[0_0_50px_rgba(0,229,192,0.15)] hover:border-white/20 transition-all duration-500">
              <video
                src="/nmims.mp4"
                controls
                muted
                playsInline
                className="h-full w-full object-cover transition-transform duration-700"
              />
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Core Values Table / Grid */}
      <section className="relative py-32">
        <div className="container mx-auto px-6">
          <FadeUp>
            <div className="mb-16 flex flex-col items-center">
              <h2 className="font-heading mb-4 text-4xl font-black text-white md:text-5xl">
                Our Core Values
              </h2>
              <div className="bg-brand-teal mx-auto mb-8 h-1 w-16 rounded-full" />
              <p className="max-w-2xl text-center text-gray-400">
                The fundamental principles that dictate our operational manifestations and culture.
              </p>
            </div>
          </FadeUp>

          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
            {[
              {
                icon: Fingerprint,
                val: "Character & Integrity",
                desc: "Enforcing strict documentation standards, ethical collaborative open-source practices, and systemic code accountability.",
              },
              {
                icon: RefreshCcw,
                val: "Continuous Innovation",
                desc: "Moving completely away from stale, repetitive technical seminars to deploy complex, original event frameworks.",
              },
              {
                icon: Shield,
                val: "Inclusivity & Equity",
                desc: "Breaking structural barriers in computing by keeping technical events accessible and empowering underrepresented groups.",
              },
              {
                icon: Handshake,
                val: "Teamwork & Trust",
                desc: "Instilling an understanding of mutual respect and cross-functional interdependence between operational leads and engineering squads.",
              },
            ].map((value, i) => (
              <FadeUp key={value.val} delay={0.1 * i}>
                <div className="glass-card hover:border-brand-teal flex h-full gap-6 rounded-3xl border-l-4 border-transparent p-8 transition-colors hover:bg-white/5">
                  <div className="bg-brand-teal/20 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl">
                    <value.icon className="text-brand-teal-light h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="mb-2 text-xl font-bold text-white">{value.val}</h4>
                    <p className="text-gray-400">{value.desc}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Journey & Milestones */}
      <section className="relative border-y border-white/5 bg-[#030712] py-32">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none z-0" />
        <div className="container mx-auto max-w-4xl px-6 relative z-10">
          <FadeUp>
            <h2 className="font-heading text-glow mb-16 text-center text-4xl font-black text-white md:text-5xl">
              Journey & Milestones
            </h2>
          </FadeUp>

          <div className="before:from-brand-purple before:via-brand-teal relative space-y-12 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:-translate-x-px before:bg-gradient-to-b before:to-transparent md:before:mx-auto md:before:translate-x-0">
            {[
              {
                step: "01",
                title: "Hosting the ACM India Chapter Summit",
                desc: "Achieved premier status. Centered on 'The Human-AI Partnership'. Gathered student chapters and elite researchers from across India, featuring keynotes from Prof. Suhas Joshi (IIT Indore) and Prof. Sashikumaar Ganesan (IISc Bangalore).",
              },
              {
                step: "02",
                title: "COMPUTE Regional Event (CRE) Host Zone",
                desc: "Expanded regional footprint in coordination with iSIGCSE. Provided a centralized platform for Computer Science educators across Central India to debate curriculum advancements and research initiatives.",
              },
              {
                step: "03",
                title: "High-Concept Structural Sprints & Escape Rooms",
                desc: "Pioneered disruptive formats: The 'CodeSwap Challenge' for extreme debugging resilience, 'Laser Labyrinth' (secured ACM India ABF funding), and the '3-Day Technical Model UN'.",
              },
            ].map((item, i) => (
              <FadeUp
                key={item.step}
                delay={0.1 * i}
                className="group is-active relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse"
              >
                <div className="bg-[#030712] text-brand-teal-light group-hover:bg-brand-teal z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-4 border-[#030712] shadow-[0_0_15px_rgba(0,229,192,0.3)] font-bold transition-colors group-hover:text-white md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  {item.step}
                </div>
                <div className="glass-card w-[calc(100%-4rem)] rounded-3xl p-8 transition-all duration-300 group-hover:-translate-y-1 md:w-[calc(50%-2.5rem)]">
                  <h3 className="mb-3 text-2xl font-bold text-white">{item.title}</h3>
                  <p className="leading-relaxed text-gray-400">{item.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty Coordinators */}
      <section className="relative overflow-hidden py-32">
        <div className="from-brand-900 via-brand-800 to-brand-900 absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))]" />
        <div className="relative z-10 container mx-auto px-6">
          <FadeUp>
            <div className="mb-16 text-center">
              <h2 className="font-heading mb-4 text-4xl font-black text-white md:text-5xl">
                Faculty Mentorship
              </h2>
              <p className="mx-auto max-w-2xl text-gray-400">
                Strategic direction and structural compliance guided by senior faculty advisors from
                STME.
              </p>
            </div>
          </FadeUp>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "Dr. Shruti Sharma", role: "Organizing Chair & Chief Chapter Advisor" },
              { name: "Dr. Vikas Khare", role: "Faculty Coordinator & Strategic Strategy Advisor" },
              {
                name: "Dr. Ankur Ratmele",
                role: "Faculty Coordinator & Technical Module Evaluator",
              },
              { name: "Dr. Abhay Deep Seth", role: "Faculty Coordinator & Operational Mentor" },
            ].map((faculty, i) => (
              <FadeUp
                key={faculty.name}
                delay={0.1 * i}
                className="glass-card group rounded-3xl p-8 text-center transition-colors hover:bg-white/5"
              >
                <div className="from-brand-purple/40 to-brand-teal/40 mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-tr transition-transform group-hover:scale-110">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">{faculty.name}</h3>
                <p className="text-brand-teal-light text-sm font-medium">{faculty.role}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
