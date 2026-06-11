import { FadeUp } from "@/components/animations/FadeUp";
import {
  ChevronRight,
  Calendar,
  Users,
  Award,
  Zap,
  Code2,
  Globe,
  Target,
  Shield,
  Rocket,
  MapPin,
  Clock,
} from "lucide-react";
import Link from "next/link";
import prisma from "@/lib/prisma";

async function getActiveEvents() {
  try {
    const events = await prisma.event.findMany({
      where: { isPublished: true },
      orderBy: { date: "asc" },
      take: 3,
    });
    return events;
  } catch (error) {
    // Fallback if DB is not connected
    console.warn("DB Connection failed. Using mock event data.");
    return [
      {
        id: "evt_techverse_2026",
        title: "ACM TechVerse 2026",
        shortDescription: "A flagship three-day technology summit featuring hackathons, startup pitching, and expert talks.",
        date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        time: "9:00 AM - 4:00 PM",
        location: "NMIMS, Indore",
        category: "Flagship Summit",
        imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
        capacity: 150,
        status: "REGISTRATION_OPEN",
      }
    ] as any[];
  }
}

export default async function Home() {
  const activeEvents = await getActiveEvents();

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative flex min-h-[100vh] items-center justify-center overflow-hidden">
        {/* Cinematic Aurora Background */}
        <div className="absolute inset-0 bg-[#030712] z-[-2]" />
        <div className="bg-aurora absolute top-[-20%] left-[-10%] h-[700px] w-[700px] rounded-full bg-brand-purple/10 blur-[120px] mix-blend-screen z-[-1]" />
        <div className="bg-aurora absolute bottom-[-20%] right-[-10%] h-[600px] w-[600px] rounded-full bg-brand-teal/10 blur-[120px] mix-blend-screen z-[-1]" style={{ animationDelay: "2s" }} />
        <div className="bg-aurora absolute top-[20%] right-[20%] h-[400px] w-[400px] rounded-full bg-brand-emerald/5 blur-[100px] mix-blend-screen z-[-1]" style={{ animationDelay: "4s" }} />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay pointer-events-none z-[-1]" />

        <div className="relative z-10 container mx-auto px-6 pt-24 text-center">
          <FadeUp delay={0.1}>
            <div className="glass border-brand-teal/20 mb-10 inline-flex cursor-default items-center gap-3 rounded-full border px-5 py-2.5 shadow-sm transition-colors hover:bg-white/5">
              <span className="bg-brand-teal h-2 w-2 rounded-full animate-pulse" />
              <span className="text-brand-teal-light text-sm font-semibold tracking-[0.15em] uppercase">
                SVKM's NMIMS Indore
              </span>
            </div>
          </FadeUp>

          <FadeUp delay={0.2}>
            <h1 className="font-heading mb-6 text-5xl sm:text-7xl leading-[0.9] font-black tracking-tighter md:text-8xl lg:text-[10rem]">
              ACM Student <br className="hidden md:block" />
              <span className="from-brand-purple-light via-brand-teal-light bg-gradient-to-br to-white bg-clip-text text-transparent">
                Chapter
              </span>
            </h1>
          </FadeUp>

          <FadeUp delay={0.3}>
            <p className="font-heading mx-auto mb-6 max-w-4xl text-2xl leading-relaxed font-semibold text-white md:text-3xl">
              Fostering Innovation. Building Community.
            </p>
            <p className="mx-auto mb-12 max-w-3xl text-lg leading-relaxed font-medium text-gray-400 md:text-xl">
              The ACM Student Chapter at SVKM's NMIMS Indore (STME) provides a peer-driven technical ecosystem,
              helping students bridge the gap between academic study and modern industry practices.
            </p>
          </FadeUp>

          <FadeUp
            delay={0.4}
            className="flex flex-col items-center justify-center gap-6 sm:flex-row"
          >
            <Link
              href="/membership#register"
              className="group text-black relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-8 py-4.5 font-bold transition-all duration-300 hover:scale-[1.02] hover:bg-gray-100 active:scale-95 sm:w-auto shadow-md"
            >
              <span className="relative z-10 text-base">Join ACM Today</span>
              <ChevronRight className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/achievements"
              className="glass inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-4.5 text-base font-bold text-white backdrop-blur-xl transition-all duration-300 hover:border-white/30 hover:bg-white/10 sm:w-auto"
            >
              Explore Our Accomplishments
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* Premium Stats Section */}
      <section className="relative overflow-hidden border-y border-white/5 bg-[#050816] py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-purple/5 via-transparent to-transparent opacity-30" />
        <div className="relative z-10 container mx-auto px-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {[
              {
                label: "Technical Summits",
                value: "2",
                sub: "Major Chapter Hostings",
                icon: Calendar,
                color: "text-brand-purple-light",
                border: "group-hover:border-brand-purple/40",
              },
              {
                label: "Executive Committee",
                value: "3",
                sub: "Governing Council",
                icon: Shield,
                color: "text-brand-teal-light",
                border: "group-hover:border-brand-teal/40",
              },
              {
                label: "Expert Mentors",
                value: "4",
                sub: "Faculty Advisors",
                icon: Users,
                color: "text-blue-400",
                border: "group-hover:border-blue-400/40",
              },
              {
                label: "ACM India Grants",
                value: "15K+",
                sub: "Approved Budget Funding",
                icon: Award,
                color: "text-yellow-400",
                border: "group-hover:border-yellow-400/40",
              },
              {
                label: "Active Teams",
                value: "30+",
                sub: "Project Collaborations",
                icon: Code2,
                color: "text-pink-400",
                border: "group-hover:border-pink-400/40",
              },
            ].map((stat, i) => (
              <FadeUp
                key={stat.label}
                delay={0.05 * i}
                className="h-full"
              >
                <div className={`glass-card flex flex-col items-center rounded-3xl p-8 border border-white/10 ${stat.border} text-center group transition-all duration-300 hover:-translate-y-2 overflow-hidden relative h-full`}>
                  <stat.icon
                    className={`mb-6 h-10 w-10 ${stat.color} transition-transform duration-300 group-hover:scale-105`}
                  />
                  <h3 className="font-heading mb-2 text-5xl font-black tracking-tight text-white">
                    {stat.value}
                  </h3>
                  <p className="mb-2 text-xs font-bold tracking-[0.15em] text-gray-300 uppercase">
                    {stat.label}
                  </p>
                  <p className="text-sm font-medium text-gray-500">{stat.sub}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Active Events Section */}
      <section id="events" className="relative border-y border-white/5 bg-[#030712] py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-brand-teal/5 via-transparent to-transparent opacity-50" />
        <div className="container mx-auto px-6 relative z-10">
          <FadeUp>
            <div className="mb-20 flex flex-col items-center text-center">
              <span className="text-brand-teal-light mb-4 text-sm font-bold tracking-widest uppercase">
                Join The Movement
              </span>
              <h2 className="font-heading mb-6 text-5xl font-black tracking-tight text-white md:text-7xl">
                Upcoming Events
              </h2>
              <div className="from-brand-teal to-brand-purple h-1.5 w-24 rounded-full bg-gradient-to-r" />
            </div>
          </FadeUp>

          {activeEvents.length === 0 ? (
            <div className="text-center text-gray-500 py-12 border border-white/10 rounded-3xl glass">
              <p className="text-xl font-medium">No active events at the moment. Stay tuned!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activeEvents.map((evt, idx) => (
                <FadeUp key={evt.id} delay={0.1 * idx} className="h-full">
                  <div className="glass-card group flex h-full flex-col overflow-hidden rounded-[2.5rem] border border-white/10 transition-all duration-700 hover:-translate-y-3 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.6)]">
                    {/* Event Banner */}
                    <div className="relative h-56 overflow-hidden bg-brand-900">
                      {evt.imageUrl ? (
                        <img src={evt.imageUrl} alt={evt.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/20 to-brand-teal/20" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#08080C] to-transparent" />
                      
                      <div className="absolute top-4 left-4 rounded-full bg-black/60 px-3 py-1 backdrop-blur-md border border-white/10">
                        <span className="text-[10px] font-bold tracking-widest text-white uppercase">{evt.category || "Event"}</span>
                      </div>
                      <div className="absolute top-4 right-4 rounded-full bg-green-500/20 px-3 py-1 border border-green-500/30">
                        <span className="text-[10px] font-bold tracking-widest text-green-400 uppercase">
                          {evt.status.replace("_", " ")}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-grow flex-col p-8">
                      <h3 className="font-heading mb-3 text-2xl font-black text-white">{evt.title}</h3>
                      <p className="mb-6 text-sm font-medium text-gray-400 line-clamp-2 flex-grow">
                        {evt.shortDescription || evt.description || "Join us for this amazing technical event at NMIMS."}
                      </p>

                      <div className="mb-8 space-y-3">
                        <div className="flex items-center gap-3 text-sm text-gray-300">
                          <Calendar className="h-4 w-4 text-brand-purple-light" />
                          <span>{new Date(evt.date).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                          {evt.time && (
                            <>
                              <Clock className="h-4 w-4 ml-2 text-brand-purple-light" />
                              <span>{evt.time}</span>
                            </>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-300">
                          <MapPin className="h-4 w-4 text-brand-teal-light" />
                          <span>{evt.location || "NMIMS, Indore"}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-300">
                          <Users className="h-4 w-4 text-blue-400" />
                          <span>{evt.capacity > 0 ? `${evt.capacity} Seats Available` : 'Open Event'}</span>
                        </div>
                      </div>

                      <div className="mt-auto">
                        <Link href="/live" className="block w-full rounded-xl bg-brand-purple hover:bg-brand-purple-light transition-colors px-4 py-3 text-center text-sm font-bold text-white shadow-[0_0_20px_rgba(109,74,255,0.3)]">
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="bg-[#050816] relative overflow-hidden py-24">
        <div className="bg-brand-purple/5 pointer-events-none absolute top-1/2 right-0 h-[800px] w-[800px] -translate-y-1/2 rounded-full blur-[150px]" />

        <div className="relative z-10 container mx-auto px-6">
          <FadeUp>
            <div className="mb-16 text-center">
              <h2 className="font-heading mb-4 text-4xl font-black tracking-tight text-white md:text-5xl">
                Vision & Mission
              </h2>
              <div className="from-brand-purple to-brand-teal mx-auto mb-6 h-1 w-20 rounded-full bg-gradient-to-r" />
              <p className="mx-auto max-w-2xl text-lg font-medium text-gray-400">
                Driving innovation and technical excellence within our student community.
              </p>
            </div>
          </FadeUp>

          <div className="flex flex-col items-center gap-10 lg:flex-row">
            {/* Left side: Vision and Mission Stacked */}
            <div className="flex w-full flex-col gap-8 lg:w-2/3">
              <FadeUp delay={0.1}>
                <div className="glass-card group hover:border-brand-purple/40 relative flex h-full flex-col overflow-hidden rounded-[2rem] p-10 transition-all duration-300 border border-white/10">
                  <div className="from-brand-purple/20 to-brand-purple/5 border-brand-purple/30 mb-8 flex h-14 w-14 items-center justify-center rounded-2xl border bg-gradient-to-br transition-transform group-hover:scale-105">
                    <Globe className="text-brand-purple-light h-6 w-6" />
                  </div>
                  <h3 className="font-heading mb-4 text-2xl font-bold tracking-tight text-white">
                    Our Vision
                  </h3>
                  <p className="text-gray-300 leading-relaxed font-medium">
                    To build a vibrant, technical ecosystem that brings the global computing network
                    closer to students, cultivating a passionate tech community on campus
                    that drives technical readiness and shapes the next generation of engineers.
                  </p>
                </div>
              </FadeUp>

              <FadeUp delay={0.2}>
                <div className="glass-card group hover:border-brand-teal/40 relative flex h-full flex-col overflow-hidden rounded-[2rem] p-10 transition-all duration-300 border border-white/10">
                  <div className="from-brand-teal/20 to-brand-teal/5 border-brand-teal/30 mb-8 flex h-14 w-14 items-center justify-center rounded-2xl border bg-gradient-to-br transition-transform group-hover:scale-105">
                    <Target className="text-brand-teal-light h-6 w-6" />
                  </div>
                  <h3 className="font-heading mb-4 text-2xl font-bold tracking-tight text-white">
                    Our Mission
                  </h3>
                  <ul className="space-y-4 font-medium text-gray-300">
                    <li className="flex items-start gap-3">
                      <div className="bg-brand-teal/20 mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full">
                        <div className="bg-brand-teal-light h-1.5 w-1.5 rounded-full" />
                      </div>
                      <span className="leading-relaxed">
                        <strong className="text-white">Practical Learning:</strong> Providing platforms such as hackathons, coding contests, and technical workshops.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-brand-teal/20 mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full">
                        <div className="bg-brand-teal-light h-1.5 w-1.5 rounded-full" />
                      </div>
                      <span className="leading-relaxed">
                        <strong className="text-white">Inclusivity & Diversity:</strong> Expanding opportunities for women in computing through dedicated ACM-W initiatives.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-brand-teal/20 mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full">
                        <div className="bg-brand-teal-light h-1.5 w-1.5 rounded-full" />
                      </div>
                      <span className="leading-relaxed">
                        <strong className="text-white">Professional Connections:</strong> Connecting students with industry practitioners, researchers, and professional networks.
                      </span>
                    </li>
                  </ul>
                </div>
              </FadeUp>
            </div>

            {/* Right side: Portrait Video */}
            <div className="flex w-full justify-center lg:w-1/3 lg:justify-end">
              <FadeUp delay={0.3} className="w-full max-w-[300px]">
                <div className="relative aspect-[9/16] overflow-hidden rounded-[2rem] border border-white/10 shadow-lg transition-transform duration-300 hover:scale-[1.01]">
                  <video
                    src="/gallery/acm.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-cover"
                  />
                  <div className="from-brand-900/60 pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6">
                    <span className="text-[10px] font-bold tracking-[0.15em] text-white/80 uppercase">
                      Chapter Highlights
                    </span>
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Achievements */}
      <section id="achievements" className="relative border-y border-white/5 bg-[#030712] py-24">
        <div className="container mx-auto px-6 relative z-10">
          <FadeUp>
            <div className="mb-16 flex flex-col items-center text-center">
              <span className="text-brand-purple-light mb-2 text-sm font-bold tracking-widest uppercase">
                Legacy of Excellence
              </span>
              <h2 className="font-heading mb-4 text-4xl font-black tracking-tight text-white md:text-5xl">
                Featured Accomplishments
              </h2>
              <div className="from-brand-purple to-brand-teal mx-auto mb-6 h-1 w-20 rounded-full bg-gradient-to-r" />
            </div>
          </FadeUp>

          <div className="mx-auto max-w-5xl space-y-6">
            {[
              {
                title: "ACM India Chapter Summit 2025",
                desc: "Achieved national distinction by hosting the Annual Summit. Led by Dr. Shruti Sharma, with keynote tracks from IIT and IISc directors on 'The Human-AI Partnership'.",
                tag: "Flagship Event",
              },
              {
                title: "COMPUTE Regional Event (CRE) 2026",
                desc: "Served as the host zone for CRE in collaboration with iSIGCSE, gathering premier CS educators to redefine tech curricula across Central India.",
                tag: "Research & Academia",
              },
              {
                title: "Technical Competitions",
                desc: "Pioneered extreme debugging via 'CodeSwap', gamified 'Laser Labyrinth' algorithms (backed by ACM India funding), and a 3-Day Technical Model UN Series.",
                tag: "Innovation",
              },
              {
                title: "ACM-W Chapter Launch",
                desc: "Formally established the ACM-W wing, creating targeted pathways for diversity in technology with interactive panels and female mentorship drives.",
                tag: "Diversity",
              },
            ].map((achievement, i) => (
              <FadeUp key={achievement.title} delay={0.05 * i} className="group cursor-pointer">
                <div
                  className="glass-card rounded-[2rem] border border-white/10 p-8 hover:border-white/20 relative flex flex-col items-start gap-6 overflow-hidden bg-gradient-to-r from-white/[0.01] to-transparent transition-all duration-300 hover:bg-white/[0.02] md:flex-row md:items-center"
                >
                  <div className="relative z-10 flex-grow">
                    <span
                      className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold tracking-widest uppercase text-brand-teal-light mb-4"
                    >
                      {achievement.tag}
                    </span>
                    <h3 className="font-heading mb-2 text-2xl font-bold tracking-tight text-white">
                      {achievement.title}
                    </h3>
                    <p className="max-w-4xl text-lg font-medium text-gray-400 transition-colors group-hover:text-gray-300">
                      {achievement.desc}
                    </p>
                  </div>

                  <div className="glass relative z-10 hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border-white/10 transition-colors group-hover:bg-white md:flex">
                    <ChevronRight className="group-hover:text-brand-900 h-5 w-5 text-white transition-colors" />
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Join ACM CTA - Premium Animated Banner */}
      <section id="join" className="relative overflow-hidden py-24 bg-[#050816]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-purple/5 via-transparent to-transparent opacity-40 pointer-events-none" />

        <div className="relative z-10 container mx-auto px-6">
          <FadeUp>
            <div className="glass-card relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-black/40 p-10 text-center backdrop-blur-3xl md:p-16">
              
              <div className="relative z-10">
                <Rocket className="text-brand-teal-light mx-auto mb-8 h-14 w-14" />

                <h2 className="font-heading mb-6 text-4xl font-black tracking-tight text-white md:text-5xl">
                  Empower Your Technical Journey <br className="hidden md:block" />
                  <span className="from-brand-purple-light to-brand-teal-light bg-gradient-to-r bg-clip-text text-transparent">
                    with ACM Indore
                  </span>
                </h2>

                <p className="mx-auto mb-10 max-w-3xl text-lg leading-relaxed font-medium text-gray-300">
                  Join our community of developers, designers, and tech enthusiasts. Collaborate on projects,
                  develop practical skills, and access global ACM resources.
                </p>

                <div className="mb-12 grid gap-6 text-left md:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-colors">
                    <Award className="mb-4 h-8 w-8 text-yellow-400" />
                    <h4 className="mb-2 text-xl font-bold text-white">Official Certificates</h4>
                    <p className="text-sm font-medium text-gray-400">
                      Gain recognition with official participation certificates backed by ACM.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-colors">
                    <Zap className="text-brand-teal-light mb-4 h-8 w-8" />
                    <h4 className="mb-2 text-xl font-bold text-white">National Competitions</h4>
                    <p className="text-sm font-medium text-gray-400">
                      Participate in hackathons, summer schools, and chapter awards.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-colors">
                    <Users className="text-brand-purple-light mb-4 h-8 w-8" />
                    <h4 className="mb-2 text-xl font-bold text-white">Eminent Speakers</h4>
                    <p className="text-sm font-medium text-gray-400">
                      Learn from computing professionals and researchers through guest lectures.
                    </p>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Link
                    href="/membership#register"
                    className="relative overflow-hidden group rounded-full px-10 py-4 text-base font-bold text-white transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-md hover:shadow-lg"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-purple to-brand-teal transition-transform duration-300 group-hover:scale-105" />
                    <span className="relative z-10">ACTIVATE MEMBERSHIP</span>
                  </Link>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Sponsors Marquee Section */}
      <section className="bg-[#030712] overflow-hidden border-t border-white/10 py-20">
        <div className="container mx-auto mb-12 px-6 text-center">
          <h2 className="text-sm font-bold tracking-[0.3em] text-gray-500 uppercase">
            Supported By Global Leaders
          </h2>
        </div>
        <div className="group relative flex overflow-x-hidden">
          <div className="from-brand-900 absolute top-0 bottom-0 left-0 z-10 w-40 bg-gradient-to-r to-transparent" />
          <div className="from-brand-900 absolute top-0 right-0 bottom-0 z-10 w-40 bg-gradient-to-l to-transparent" />
          <div className="animate-marquee group-hover:pause flex min-w-max items-center gap-24 whitespace-nowrap">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center gap-24">
                <span className="font-heading hover:text-glow cursor-pointer text-4xl font-black text-gray-700 transition-all duration-300 hover:text-white">
                  Google
                </span>
                <span className="font-heading hover:text-glow cursor-pointer text-4xl font-black text-gray-700 transition-all duration-300 hover:text-white">
                  Microsoft
                </span>
                <span className="font-heading hover:text-glow cursor-pointer text-4xl font-black text-gray-700 transition-all duration-300 hover:text-white">
                  Vercel
                </span>
                <span className="font-heading hover:text-glow cursor-pointer text-4xl font-black text-gray-700 transition-all duration-300 hover:text-white">
                  Stripe
                </span>
                <span className="font-heading hover:text-glow cursor-pointer text-4xl font-black text-gray-700 transition-all duration-300 hover:text-white">
                  Linear
                </span>
                <span className="font-heading hover:text-glow cursor-pointer text-4xl font-black text-gray-700 transition-all duration-300 hover:text-white">
                  Framer
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
