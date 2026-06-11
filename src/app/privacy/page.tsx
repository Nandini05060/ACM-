import { FadeUp } from "@/components/animations/FadeUp";
import { Shield, Mail, Lock } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | ACM NMIMS Indore",
  description: "Learn how the SVKM's NMIMS Indore ACM Student Chapter handles and protects your personal data.",
};

export default function PrivacyPolicyPage() {
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
              <Shield className="h-8 w-8 text-brand-purple-light" />
            </div>
            <h1 className="font-heading text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
              Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple-light to-brand-teal-light">Policy</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Last Updated: June 10, 2026. Your privacy is critical to us. Read how SVKM's NMIMS Indore ACM Student Chapter manages your information.
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
                Information We Collect
              </h2>
              <p>
                We only collect information that you explicitly provide when registering for events, workshops, memberships, or when contacting us through our platform. This includes:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-400">
                <li>Personal Identifiers: Name, Email Address, Phone Number.</li>
                <li>Academic Identifiers: SAP ID, Year of Study, Department.</li>
                <li>Event Tickets: Temporary event codes (ACM-XXXXXX) issued to check attendance and customize your live event experience.</li>
              </ul>
            </section>

            <div className="h-px w-full bg-white/10" />

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-purple/20 text-brand-purple-light text-sm font-bold">2</span>
                How We Use Your Data
              </h2>
              <p>
                The information we collect is strictly used to organize, manage, and facilitate Student Chapter activities, specifically:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-400">
                <li>To register you for our upcoming events and track live attendance.</li>
                <li>To issue certificates and coordinate event communications.</li>
                <li>To maintain official membership records for NMIMS Indore and the global ACM organization.</li>
              </ul>
            </section>

            <div className="h-px w-full bg-white/10" />

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-purple/20 text-brand-purple-light text-sm font-bold">3</span>
                Cookies & Authentication Session
              </h2>
              <p>
                We use secure cookies and browser local storage to maintain session states for registered participants and administrators. These cookies (`acm_event_ticket`, `acm_admin_session`) are essential to permit access to live dashboard centers or admin portal interfaces. They contain no cross-site tracking markers and expire when no longer required.
              </p>
            </section>

            <div className="h-px w-full bg-white/10" />

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-purple/20 text-brand-purple-light text-sm font-bold">4</span>
                Third-Party Sharing
              </h2>
              <p>
                We do not sell, trade, or distribute your private personal information to external commercial third parties. Your registration details may be shared exclusively with SVKM's NMIMS Indore academic administration and the Association for Computing Machinery (ACM) parent body for official chapter audit purposes.
              </p>
            </section>

            <div className="h-px w-full bg-white/10" />

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-purple/20 text-brand-purple-light text-sm font-bold">5</span>
                Data Security
              </h2>
              <p className="flex items-start gap-3">
                <Lock className="h-5 w-5 text-brand-purple-light shrink-0 mt-1" />
                <span>
                  All sensitive registration and authorization data is stored inside database containers and protected through secure SSL connection layers. Access to dashboard administration tables is tightly restricted via cryptographically verified sessions.
                </span>
              </p>
            </section>

            <div className="h-px w-full bg-white/10" />

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-purple/20 text-brand-purple-light text-sm font-bold">6</span>
                Contact Information
              </h2>
              <p>
                If you have questions regarding this policy or want to update your registration information, feel free to contact us:
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
