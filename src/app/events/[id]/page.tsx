import { FadeUp } from "@/components/animations/FadeUp";
import { Calendar, MapPin, Users, Clock, Info, CheckCircle, Ticket, AlertTriangle, Target } from "lucide-react";
import Link from "next/link";
import prisma from "@/lib/prisma";

// Generate mock data exactly as per the provided PDF images
const mockEvent = {
  id: "evt_techverse_2026",
  title: "ACM TechVerse 2026",
  shortDescription: "A flagship three-day technology summit to foster technical excellence and innovation.",
  description: "ACM TechVerse 2026 is a flagship three-day technology summit organized by the ACM Student Chapter to bring together students, industry professionals, researchers, innovators, and entrepreneurs under one platform. The event is designed to foster technical excellence, innovation, collaboration, leadership, and problem-solving skills among participants. Unlike traditional coding competitions or technical fests, TechVerse combines learning, competition, networking, and innovation through hackathons, coding contests, startup pitching, technical workshops, expert talks, project exhibitions, and career development activities.",
  objectives: [
    "Enhance students' technical and problem-solving skills through hands-on competitions.",
    "Encourage innovation and creativity by providing a platform for project development.",
    "Bridge the gap between academia and industry through expert talks.",
    "Promote teamwork, leadership, and collaboration.",
    "Foster entrepreneurial thinking through startup pitching.",
    "Strengthen the ACM community."
  ],
  schedule: [
    {
      day: "Day 1 – Inspire & Explore",
      activities: [
        "Inauguration Ceremony: Welcome address, ACM introduction, keynote speech.",
        "Future Tech Talks: Sessions on AI, Cybersecurity, Cloud Computing, Data Science.",
        "Project Expo: Students showcase innovative projects and research work.",
        "Networking Session: Interaction with professionals, alumni, and faculty members."
      ]
    },
    {
      day: "Day 2 – Build & Innovate",
      activities: [
        "Mega Hackathon: Teams build technology solutions for real-world problems.",
        "Code Clash Championship: Competitive coding rounds and programming challenges.",
        "UI/UX Design Challenge: Create user-centric solutions.",
        "Bug Hunter Competition: Find and fix bugs in pre-built applications.",
        "Tech Workshops: Hands-on sessions on modern technologies."
      ]
    },
    {
      day: "Day 3 – Lead & Showcase",
      activities: [
        "Startup Pitch Arena: Participants pitch innovative startup ideas.",
        "ACM Shark Tank: Investor-style evaluation of startup concepts.",
        "Research Paper Presentation: Students present research and technical papers.",
        "Career Development Zone: Resume reviews, mock interviews, LinkedIn guidance.",
        "Awards & Closing Ceremony: Recognition of winners and participants."
      ]
    }
  ],
  date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
  time: "9:00 AM – 4:00 PM (Daily)",
  location: "NMIMS, Indore",
  venueInfo: "Auditorium, Labs, Seminar Halls. High-speed internet and power backup provided.",
  category: "Flagship Summit",
  imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
  capacity: 150,
  rules: "Participants must bring their own laptops. Teams for hackathon can be 2-5 members. Solo participation allowed for individual events.",
  contactInfo: "acm.indore@nmims.edu",
  registrationDeadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
  status: "REGISTRATION_OPEN",
};

export default async function EventDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const eventId = resolvedParams.id;

  // Try fetching from DB first, fallback to mock
  let eventData = mockEvent;
  try {
    const dbEvent = await prisma.event.findUnique({
      where: { id: eventId }
    });
    if (dbEvent) {
      // Mapping logic would go here, but for demo we just use mock if ID matches or fallback
      if (dbEvent.id === eventId) {
        eventData = {
          ...mockEvent,
          title: dbEvent.title,
          description: dbEvent.description,
          // other overrides from DB
        };
      }
    }
  } catch (e) {
    console.warn("Using mock event due to DB error or missing ID", e);
  }

  const isRegistrationOpen = eventData.status === "REGISTRATION_OPEN";

  return (
    <div className="flex min-h-screen flex-col bg-[#08080C] pb-32">
      {/* Event Hero Banner */}
      <div className="relative h-[40vh] min-h-[400px] w-full bg-brand-900 overflow-hidden">
        <div className="absolute inset-0">
          <img src={eventData.imageUrl} alt={eventData.title} className="h-full w-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08080C] via-[#08080C]/60 to-transparent" />
        </div>
        
        <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-end pb-12 pt-32">
          <FadeUp>
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="rounded-full bg-brand-purple/20 border border-brand-purple/30 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-purple-light backdrop-blur-md">
                {eventData.category}
              </span>
              <span className={`rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest backdrop-blur-md border ${isRegistrationOpen ? 'bg-green-500/20 border-green-500/30 text-green-400' : 'bg-red-500/20 border-red-500/30 text-red-400'}`}>
                {eventData.status.replace("_", " ")}
              </span>
            </div>
            <h1 className="font-heading text-5xl md:text-7xl font-black text-white mb-4 tracking-tight">
              {eventData.title}
            </h1>
            <p className="text-xl md:text-2xl font-medium text-gray-300 max-w-3xl">
              {eventData.shortDescription}
            </p>
          </FadeUp>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content (Left 2/3) */}
          <div className="lg:col-span-2 space-y-12">
            
            <FadeUp delay={0.1}>
              <section className="glass-card rounded-3xl border border-white/10 p-8">
                <h2 className="font-heading text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <Info className="h-6 w-6 text-brand-teal-light" />
                  Overview
                </h2>
                <p className="text-lg text-gray-300 leading-relaxed font-medium">
                  {eventData.description}
                </p>
              </section>
            </FadeUp>

            <FadeUp delay={0.2}>
              <section className="glass-card rounded-3xl border border-white/10 p-8">
                <h2 className="font-heading text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <Target className="h-6 w-6 text-brand-purple-light" />
                  Objectives & Outcomes
                </h2>
                <ul className="space-y-4">
                  {eventData.objectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-4 text-gray-300 font-medium">
                      <CheckCircle className="h-6 w-6 text-brand-teal-light shrink-0" />
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </FadeUp>

            <FadeUp delay={0.3}>
              <section className="glass-card rounded-3xl border border-white/10 p-8">
                <h2 className="font-heading text-3xl font-bold text-white mb-8 flex items-center gap-3">
                  <Clock className="h-6 w-6 text-blue-400" />
                  Event Schedule
                </h2>
                <div className="space-y-8">
                  {eventData.schedule.map((day, i) => (
                    <div key={i} className="relative pl-8 border-l-2 border-white/10">
                      <div className="absolute -left-[11px] top-0 h-5 w-5 rounded-full bg-[#08080C] border-4 border-brand-purple-light" />
                      <h3 className="text-xl font-bold text-white mb-4">{day.day}</h3>
                      <ul className="space-y-3">
                        {day.activities.map((act, j) => (
                          <li key={j} className="text-gray-400 font-medium flex items-center gap-3">
                            <span className="h-1.5 w-1.5 rounded-full bg-brand-teal-light shrink-0" />
                            {act}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            </FadeUp>

          </div>

          {/* Sticky Sidebar (Right 1/3) */}
          <div className="lg:col-span-1">
            <FadeUp delay={0.2} className="sticky top-32">
              <div className="glass-card rounded-3xl border border-white/10 p-8 flex flex-col gap-8">
                
                {/* Registration Action */}
                <div className="text-center pb-8 border-b border-white/10">
                  {isRegistrationOpen ? (
                    <>
                      <div className="mb-4 text-sm font-bold tracking-widest text-brand-teal-light uppercase">Registration Open</div>
                      <Link 
                        href={`/events/${eventId}/register`}
                        className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-brand-purple to-brand-teal px-6 py-4 text-lg font-black tracking-wide text-white shadow-[0_0_20px_rgba(109,74,255,0.4)] transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(0,229,192,0.6)]"
                      >
                        <Ticket className="h-6 w-6" />
                        REGISTER NOW
                      </Link>
                      <p className="mt-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Deadline: {new Date(eventData.registrationDeadline).toLocaleDateString()}
                      </p>
                    </>
                  ) : (
                    <div className="rounded-xl bg-white/5 border border-white/10 py-4 px-6 text-gray-400 font-bold uppercase tracking-widest">
                      Registration Closed
                    </div>
                  )}
                </div>

                {/* Quick Info */}
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Calendar className="h-6 w-6 text-brand-purple-light shrink-0" />
                    <div>
                      <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Date</h4>
                      <p className="text-white font-medium">{new Date(eventData.date).toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Clock className="h-6 w-6 text-brand-purple-light shrink-0" />
                    <div>
                      <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Timing</h4>
                      <p className="text-white font-medium">{eventData.time}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-brand-teal-light shrink-0" />
                    <div>
                      <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Venue</h4>
                      <p className="text-white font-medium">{eventData.location}</p>
                      <p className="text-sm text-gray-400 mt-1">{eventData.venueInfo}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Users className="h-6 w-6 text-blue-400 shrink-0" />
                    <div>
                      <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Capacity</h4>
                      <p className="text-white font-medium">{eventData.capacity} Seats Available</p>
                    </div>
                  </div>
                </div>

                {/* Rules & Guidelines */}
                <div className="pt-6 border-t border-white/10">
                  <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    Rules & Guidelines
                  </h4>
                  <p className="text-sm text-gray-400 font-medium leading-relaxed">
                    {eventData.rules}
                  </p>
                </div>

              </div>
            </FadeUp>
          </div>

        </div>
      </div>
    </div>
  );
}

// Ensure the icon used in Objectives is imported. Target is imported from lucide-react. 
