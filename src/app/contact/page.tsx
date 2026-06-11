import { FadeUp } from "@/components/animations/FadeUp";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";
import Link from "next/link";

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" height="24" viewBox="0 0 24 24" fill="none" 
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
    className={className}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" height="24" viewBox="0 0 24 24" fill="none" 
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export const metadata = {
  title: "Contact Us | ACM NMIMS Indore",
  description: "Get in touch with the SVKM's NMIMS Indore ACM Student Chapter. We'd love to hear from you regarding events, memberships, and collaborations.",
};

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#030712] pb-32 pt-24 md:pt-32 relative overflow-hidden">
      
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 bg-brand-teal/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "2s" }} />
        
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
      </div>

      <div className="relative z-10 mb-20 px-6">
        <div className="container mx-auto max-w-5xl text-center">
          <FadeUp>
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/20 border border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
              <MessageSquare className="h-8 w-8 text-blue-400" />
            </div>
            <h1 className="font-heading text-5xl md:text-7xl font-black text-white mb-6 tracking-tight drop-shadow-lg">
              Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-brand-teal-light">Touch</span>
            </h1>
            <p className="text-xl text-gray-400 font-medium max-w-2xl mx-auto leading-relaxed">
              Have questions about ACM, events, memberships, workshops, collaborations, or sponsorships? We'd love to hear from you.
            </p>
          </FadeUp>
        </div>
      </div>

      <div className="container relative z-10 mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          <div className="lg:col-span-2 space-y-6">
            <FadeUp delay={0.1}>
              <div className="glass-card rounded-[2rem] border border-blue-500/20 bg-gradient-to-br from-blue-900/10 to-transparent p-8 relative overflow-hidden group hover:border-blue-500/40 transition-colors">
                <div className="absolute top-0 right-0 p-6 opacity-5">
                  <Mail className="h-24 w-24" />
                </div>
                <h3 className="text-lg font-bold text-gray-400 uppercase tracking-widest mb-6">Official Email</h3>
                <a href="mailto:Acm.indore@nmims.edu" className="flex items-center gap-4 group-hover:scale-105 transition-transform origin-left">
                  <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                    <Mail className="h-6 w-6 text-blue-400" />
                  </div>
                  <span className="text-xl font-bold text-white tracking-wide">Acm.indore@nmims.edu</span>
                </a>
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="glass-card rounded-[2rem] border border-white/10 p-8">
                <h3 className="text-lg font-bold text-gray-400 uppercase tracking-widest mb-6">Social Networks</h3>
                <div className="space-y-4">
                  <a 
                    href="https://www.linkedin.com/company/svkm-s-nmims-indore-acm-student-chapter/posts/?feedView=all" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 rounded-2xl border border-white/5 bg-white/5 p-4 hover:bg-blue-600/20 hover:border-blue-500/30 transition-all group"
                  >
                    <div className="h-10 w-10 rounded-full bg-[#0077b5]/20 flex items-center justify-center shrink-0 group-hover:bg-[#0077b5]/40 transition-colors">
                      <LinkedinIcon className="h-5 w-5 text-[#0077b5] group-hover:text-white" />
                    </div>
                    <span className="font-bold text-white group-hover:text-blue-200">LinkedIn Official</span>
                  </a>
                  
                  <a 
                    href="https://www.instagram.com/acm_nmimsindore/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 rounded-2xl border border-white/5 bg-white/5 p-4 hover:bg-pink-600/20 hover:border-pink-500/30 transition-all group"
                  >
                    <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-yellow-400/20 via-pink-500/20 to-purple-500/20 flex items-center justify-center shrink-0 group-hover:from-yellow-400/40 group-hover:via-pink-500/40 group-hover:to-purple-500/40">
                      <InstagramIcon className="h-5 w-5 text-pink-400 group-hover:text-white" />
                    </div>
                    <span className="font-bold text-white group-hover:text-pink-200">Instagram Page</span>
                  </a>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.3}>
              <div className="glass-card rounded-[2rem] border border-brand-teal/20 p-8 relative overflow-hidden group hover:border-brand-teal/40 transition-colors">
                <h3 className="text-lg font-bold text-gray-400 uppercase tracking-widest mb-6">Chapter Leadership</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-brand-teal/20 flex items-center justify-center shrink-0 mt-1">
                      <Mail className="h-5 w-5 text-brand-teal-light" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg">Heyramb Damle</h4>
                      <p className="text-brand-teal-light text-sm font-medium uppercase tracking-widest mb-1">Chair of ACM</p>
                      <a href="mailto:HEYRAMB.DAMLE559@nmims.in" className="text-gray-300 hover:text-white transition-colors block text-sm font-mono break-all">HEYRAMB.DAMLE559@nmims.in</a>
                    </div>
                  </div>

                  <div className="h-px w-full bg-white/10" />

                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-brand-purple/20 flex items-center justify-center shrink-0 mt-1">
                      <Mail className="h-5 w-5 text-brand-purple-light" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg">Shelly Goyal</h4>
                      <p className="text-brand-purple-light text-sm font-medium uppercase tracking-widest mb-1">Chair of ACM-W</p>
                      <a href="mailto:SHELLY.GOYAL733@nmims.in" className="text-gray-300 hover:text-white transition-colors block text-sm font-mono break-all">SHELLY.GOYAL733@nmims.in</a>
                    </div>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>

          <div className="lg:col-span-3">
            <FadeUp delay={0.4} className="h-full">
              <div className="glass-card rounded-[2.5rem] border border-white/10 p-8 md:p-12 h-full flex flex-col justify-between relative overflow-hidden">
                <div className="absolute -top-32 -right-32 h-64 w-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />
                
                <div className="mb-8">
                  <h2 className="font-heading text-3xl font-bold text-white mb-2">Send us a Message</h2>
                  <p className="text-gray-400">Fill out the form below and our team will get back to you shortly.</p>
                </div>

                <div className="space-y-6 flex-grow flex flex-col justify-end">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Your Name</label>
                      <input 
                        type="text" 
                        placeholder="John Doe"
                        className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
                      <input 
                        type="email" 
                        placeholder="john@example.com"
                        className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Subject</label>
                    <select className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-blue-500 transition-colors appearance-none">
                      <option value="">Select a topic...</option>
                      <option value="membership">Membership Inquiry</option>
                      <option value="event">Event Information</option>
                      <option value="sponsorship">Sponsorship & Collaboration</option>
                      <option value="other">Other Questions</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Message</label>
                    <textarea 
                      rows={5}
                      placeholder="How can we help you?"
                      className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-blue-500 transition-colors resize-none"
                    />
                  </div>

                  <button 
                    type="button"
                    className="w-full flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-400 px-6 py-4 text-lg font-black tracking-wide text-white shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Send className="h-5 w-5" />
                    Send Message
                  </button>
                </div>

              </div>
            </FadeUp>
          </div>

        </div>
        
        <FadeUp delay={0.5} className="mt-8">
          <div className="glass-card rounded-3xl border border-white/10 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <div>
                <h4 className="text-white font-bold">Visit our Campus</h4>
                <p className="text-sm text-gray-400">SVKM's NMIMS, Super Corridor, Indore, Madhya Pradesh</p>
              </div>
            </div>
            <a 
              href="https://maps.google.com/?q=SVKM's+NMIMS+Indore,+Super+Corridor,+Indore,+Madhya+Pradesh" 
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10 text-center w-full md:w-auto"
            >
              Get Directions
            </a>
          </div>
        </FadeUp>

      </div>
    </div>
  );
}
