import { FadeUp } from "@/components/animations/FadeUp";
import { Users, Mail, Star, Shield, Cpu, Sparkles } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "Our Team | ACM NMIMS Indore",
  description: "Meet the faculty coordinators, ACM core board, ACM-W board, and technical leads driving the SVKM's NMIMS Indore Student Chapter.",
};

const facultyCoordinators = [
  { name: "Prof. Vikas Khare", role: "Faculty Coordinator", designation: "Associate Dean", image: "/team/Vikas khare.png", linkedin: "https://www.linkedin.com/in/dr-vikas-khare-postdoc-phd-m-tech-pgdm-b-e-4505b9135/" },
  { name: "Prof. Shruti Sharma", role: "Faculty Coordinator", image: "/team/shruti sharma.png", linkedin: "https://www.linkedin.com/in/shruti-sharma-phd-3b45969/" },
  { name: "Prof. Abhaydeep Seth", role: "Faculty Coordinator", image: "/team/abhaydeep seth.png", linkedin: "https://www.linkedin.com/in/dr-abhay-deep-seth-21b32b52/" },
  { name: "Prof. Ankur Ramtele", role: "Faculty Coordinator", image: "/team/ankur ramtele.png", linkedin: "https://www.linkedin.com/in/dr-ankur-ratmele-4213a81b0/" }
];

const acmCore = [
  { name: "Heyramb Damle", role: "Chairperson", image: "/team/HEYRAMB DAMLE chair.png", linkedin: "https://www.linkedin.com/in/heyramb-damle/" },
  { name: "Anupam", role: "Vice Chairperson", image: "/team/ANUPAM vice chair.png", linkedin: "https://www.linkedin.com/in/tiak/" },
  { name: "Krishna Shah", role: "Secretary", image: "/team/KRISHNA SHAH secretary.png", linkedin: "https://www.linkedin.com/in/krishna-shah-32413023b/" },
  { name: "Toshan Dubey", role: "Treasurer", image: "/team/TOSHAN DUBEY treasurer.png", linkedin: "https://www.linkedin.com/in/thetoshandubey/" },
  { name: "Maithli Singh", role: "Membership Chair", image: "/team/MAITHLI SINGH membership chair.png", linkedin: "https://www.linkedin.com/in/maithli-singh-tomar-3b7276320/" },
  { name: "Nandini Namdeo", role: "Membership Chair", image: "/team/NANDINI NAMDEO membership chair.jpg", linkedin: "https://www.linkedin.com/in/nandini-namdeo-0799a0314" }
];

const acmwCore = [
  { name: "Shelly Goyal", role: "Chairperson, ACM-W", image: "/team/SHELLY GOYAL chair.png", linkedin: "https://www.linkedin.com/in/shelly-goyal-16521b200/" },
  { name: "Dravya Gangwal", role: "Vice Chairperson, ACM-W", image: "/team/DRAVYA GANGWAL vice chair.png", linkedin: "https://www.linkedin.com/in/dravya-gangwal-b4416b31a/" },
  { name: "Shivatmika Bharnwal", role: "Secretary, ACM-W", image: "/team/SHIVATMIKA BHARNWAL secretary.png", linkedin: "https://www.linkedin.com/in/shivatmika-baranwal-47ab26300/" },
  { name: "Daksh Patel", role: "Membership Chair, ACM-W", image: "/team/DAKSH PATEL membership chair.png", linkedin: "https://www.linkedin.com/in/daksh-patel2675/" },
  { name: "Dhyanvi Patel", role: "Membership Chair, ACM-W", image: "/team/DHYANVI PATEL membership chair.png", linkedin: "#" }
];

const leads = [
  { name: "Priyansh Saxena", role: "Technical Lead", image: "/team/technical leaad PRIYANSH SAXENA.png", department: "Technical", linkedin: "https://www.linkedin.com/in/priyansh-saxena-027a40317/" },
  { name: "Kashvi Sethi", role: "Social Media Lead", image: "/team/social media lead KASHVI SETHI.png", department: "Social Media", linkedin: "https://www.linkedin.com/in/kashvi-sethi-461b32319/" },
  { name: "Mahi Yadav", role: "Media Production Lead", image: "/team/media production lead MAHI YADAV.jpeg", department: "Media", linkedin: "#" },
  { name: "Devan Modi", role: "Social Media Lead (ACM-W)", image: "/team/DEVAN MODI socal media lead.png", department: "Social Media", linkedin: "https://www.linkedin.com/in/devan-modi/" }
];

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

const GithubIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
);

// Reusable Team Card Component
const TeamCard = ({ member, theme = "purple" }: { member: any, theme?: "purple" | "teal" | "blue" | "pink" }) => {
  const themeColors = {
    purple: "from-brand-purple to-brand-purple-light border-brand-purple/30 group-hover:border-brand-purple shadow-brand-purple/20",
    teal: "from-brand-teal to-brand-teal-light border-brand-teal/30 group-hover:border-brand-teal shadow-brand-teal/20",
    blue: "from-blue-600 to-blue-400 border-blue-500/30 group-hover:border-blue-500 shadow-blue-500/20",
    pink: "from-pink-600 to-pink-400 border-pink-500/30 group-hover:border-pink-500 shadow-pink-500/20",
  };

  return (
    <div className={`glass-card relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent p-8 transition-all duration-700 hover:-translate-y-3 hover:border-white/20 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.7)] group ${themeColors[theme].split(' ')[1]}`}>
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />
      {/* Image Container - Circular and Animated */}
      <div className="relative mb-8 mx-auto h-56 w-56 overflow-hidden rounded-full border border-white/10 group-hover:border-white/30 transition-all duration-700 shadow-2xl shadow-black/80 group-hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]">
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/80 via-transparent to-transparent group-hover:opacity-0 transition-opacity duration-700 z-10" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={member.image} 
          alt={member.name} 
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-3"
        />
      </div>

      {/* Content */}
      <div className="text-center relative z-20">
        {member.department && (
          <div className="inline-block mb-3 rounded-full bg-white/10 border border-white/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-md">
            {member.department}
          </div>
        )}
        <h3 className="mb-1 text-xl font-bold text-white tracking-wide">{member.name}</h3>
        {member.designation && (
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
            {member.designation}
          </p>
        )}
        <p className={`text-sm font-bold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r ${themeColors[theme].split(' ')[0]} ${themeColors[theme].split(' ')[1]}`}>
          {member.role}
        </p>

        {/* Social Links */}
        <div className="mt-6 flex justify-center gap-3 opacity-70 transition-opacity group-hover:opacity-100">
          {member.linkedin && member.linkedin !== "#" && (
            <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-[#0077b5]/80 transition-colors">
              <LinkedinIcon className="h-4 w-4 text-white" />
            </a>
          )}
          {member.email && member.email !== "#" && (
            <a href={`mailto:${member.email}`} className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/20 transition-colors">
              <Mail className="h-4 w-4 text-white" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};


export default function TeamPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#030712] pb-32 pt-24 md:pt-32 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 h-[800px] w-[800px] bg-brand-purple/10 rounded-full blur-[150px] opacity-50" />
        <div className="absolute bottom-0 left-0 h-[800px] w-[800px] bg-brand-teal/10 rounded-full blur-[150px] opacity-50" />
      </div>

      {/* Hero Section */}
      <div className="relative z-10 mb-20 px-6">
        <div className="container mx-auto max-w-5xl text-center">
          <FadeUp>
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h1 className="font-heading text-5xl md:text-7xl font-black text-white mb-6 tracking-tight drop-shadow-lg">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal-light to-brand-purple-light">Visionaries</span>
            </h1>
            <p className="text-xl text-gray-400 font-medium max-w-3xl mx-auto leading-relaxed">
              Meet the faculty, core board, and brilliant leads orchestrating the tech revolution at the NMIMS Indore ACM Student Chapter.
            </p>
          </FadeUp>
        </div>
      </div>

      <div className="container relative z-10 mx-auto px-6 max-w-7xl space-y-32">
        
        {/* 1. Faculty Coordinators */}
        <FadeUp delay={0.1}>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 mb-6">
              <Star className="h-4 w-4 text-yellow-400" />
              <span className="text-sm font-bold uppercase tracking-widest text-yellow-400">Mentorship</span>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white">Faculty Coordinators</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {facultyCoordinators.map((member, i) => (
              <TeamCard key={i} member={member} theme="blue" />
            ))}
          </div>
        </FadeUp>

        {/* 2. ACM Folder (Core Board) */}
        <FadeUp delay={0.2}>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-teal/30 bg-brand-teal/10 px-4 py-2 mb-6">
              <Shield className="h-4 w-4 text-brand-teal-light" />
              <span className="text-sm font-bold uppercase tracking-widest text-brand-teal-light">Executive Branch</span>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white">ACM Core Board</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {acmCore.map((member, i) => (
              <TeamCard key={i} member={member} theme="teal" />
            ))}
          </div>
        </FadeUp>

        {/* 3. ACM-W Folder (Core Board) */}
        <FadeUp delay={0.3}>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-pink-500/30 bg-pink-500/10 px-4 py-2 mb-6">
              <Sparkles className="h-4 w-4 text-pink-400" />
              <span className="text-sm font-bold uppercase tracking-widest text-pink-400">Women In Computing</span>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white">ACM-W Core Board</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {acmwCore.map((member, i) => (
              <TeamCard key={i} member={member} theme="pink" />
            ))}
          </div>
        </FadeUp>

        {/* 4. Leads */}
        <FadeUp delay={0.4}>
          <div className="relative rounded-[3rem] border border-white/10 bg-white/[0.02] p-8 md:p-16">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-purple/30 bg-brand-purple/10 px-4 py-2 mb-6">
                <Cpu className="h-4 w-4 text-brand-purple-light" />
                <span className="text-sm font-bold uppercase tracking-widest text-brand-purple-light">Operational Core</span>
              </div>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-white">Department Leads</h2>
              <p className="text-gray-400 mt-4 max-w-2xl mx-auto">The brilliant minds driving the technical, design, PR, and media execution across all our flagship events.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {leads.map((member, i) => (
                <TeamCard key={i} member={member} theme="purple" />
              ))}
            </div>
          </div>
        </FadeUp>

      </div>
    </div>
  );
}
