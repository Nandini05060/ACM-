import { FadeUp } from "@/components/animations/FadeUp";
import { Scale, Mail, AlertTriangle } from "lucide-react";

export const metadata = {
  title: "Terms of Service | ACM NMIMS Indore",
  description: "Read the Terms of Service governing participation in SVKM's NMIMS Indore ACM Student Chapter events and activities.",
};

export default function TermsOfServicePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#030712] pb-32 pt-24 md:pt-32 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 bg-brand-purple/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 bg-brand-teal/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "2s" }} />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
      </div>

      <div className="relative z-10 mb-12 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <FadeUp>
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-purple/20 border border-brand-purple/30 shadow-[0_0_30px_rgba(168,85,247,0.3)]">
              <Scale className="h-8 w-8 text-brand-purple-light" />
            </div>
            <h1 className="font-heading text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
              Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple-light to-brand-teal-light">Service</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Last Updated: June 10, 2026. Please read these terms carefully before registering for events or joining our student chapter operations.
            </p>
          </FadeUp>
        </div>
      </div>

      <div className="container relative z-10 mx-auto px-6 max-w-4xl">
        <FadeUp delay={0.1}>
          <div className="glass-card rounded-[2rem] border border-white/10 p-8 md:p-12 space-y-8 text-gray-300 leading-relaxed">
            
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-purple/20 text-brand-purple-light text-sm font-bold">1</span>
                Acceptance of Terms
              </h2>
              <p>
                By accessing this website, registering for ACM events, or participating in workshops, you agree to comply with and be bound by these Terms of Service, all applicable laws, and regulations of SVKM's NMIMS Indore and the Association for Computing Machinery (ACM).
              </p>
            </section>

            <div className="h-px w-full bg-white/10" />

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-purple/20 text-brand-purple-light text-sm font-bold">2</span>
                Membership & Event Eligibility
              </h2>
              <p>
                ACM Indore events are open to students enrolled at SVKM's NMIMS Indore, as well as external participants when explicitly stated by chapter leaders.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-400">
                <li>You must provide accurate, current, and complete registration details.</li>
                <li>Each registration ticket (ACM-XXXXXX) is unique and linked to a specific user. It cannot be sold or transferred without official permissions.</li>
                <li>Fake SAP IDs or false student credentials may result in ticket cancellation and restriction from future events.</li>
              </ul>
            </section>

            <div className="h-px w-full bg-white/10" />

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-purple/20 text-brand-purple-light text-sm font-bold">3</span>
                Code of Conduct
              </h2>
              <p>
                All participants, members, and guest users are expected to behave in a professional, ethical, and inclusive manner. Harassment, academic dishonesty (e.g., plagiarizing code during hackathons), and disruption of physical or digital venues will lead to immediate disqualification and reporting to NMIMS student discipline authorities.
              </p>
            </section>

            <div className="h-px w-full bg-white/10" />

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-purple/20 text-brand-purple-light text-sm font-bold">4</span>
                Intellectual Property
              </h2>
              <p>
                All resources, logos, platform source codes, and event graphics displayed on this website are the intellectual property of SVKM's NMIMS Indore ACM Student Chapter. Materials submitted by participants during contests (e.g., repositories, presentations) remain the property of the authors, with ACM granted a royalty-free license to feature them.
              </p>
            </section>

            <div className="h-px w-full bg-white/10" />

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-purple/20 text-brand-purple-light text-sm font-bold">5</span>
                Disclaimers & Limitation of Liability
              </h2>
              <p className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-brand-purple-light shrink-0 mt-1" />
                <span>
                  This website and all interactive portals are provided "as is" without warranties of any kind. While we make every effort to maintain real-time updates and server uptime, we do not guarantee uninterrupted dashboard service. We are not liable for scheduling shifts caused by academic overrides or technical network failure.
                </span>
              </p>
            </section>

            <div className="h-px w-full bg-white/10" />

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-purple/20 text-brand-purple-light text-sm font-bold">6</span>
                Governing Jurisdiction
              </h2>
              <p>
                These Terms of Service are governed by and construed in accordance with the regulations of SVKM's NMIMS Indore, Madhya Pradesh, India, and general code guidelines of the Association for Computing Machinery.
              </p>
            </section>

            <div className="h-px w-full bg-white/10" />

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-purple/20 text-brand-purple-light text-sm font-bold">7</span>
                Queries and Clarifications
              </h2>
              <p>
                If you have any questions or require clarifications regarding these terms, please contact our administrative team:
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <a href="mailto:acm.indore@nmims.edu" className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/5 p-4 hover:bg-brand-purple/20 hover:border-brand-purple/30 transition-all">
                  <Mail className="h-5 w-5 text-brand-purple-light" />
                  <span className="font-bold text-white">acm.indore@nmims.edu</span>
                </a>
              </div>
            </section>

          </div>
        </FadeUp>
      </div>
    </div>
  );
}
