import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-brand-900 relative mt-auto overflow-hidden border-t border-white/10 pt-20 pb-10">
      {/* Background glow effects - optimized */}
      <div
        className="pointer-events-none absolute top-0 left-1/4 h-96 w-96 rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(109,74,255,0.8) 0%, rgba(109,74,255,0) 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute right-1/4 bottom-0 h-96 w-96 rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(0,229,192,0.8) 0%, rgba(0,229,192,0) 70%)",
        }}
      />

      <div className="relative z-10 container mx-auto px-6">
        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="group mb-6 flex inline-flex items-center gap-2">
              <div className="relative flex h-8 w-8 items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <Image src="/logo.png" alt="ACM NMIMS Indore Logo" width={32} height={32} className="object-contain" />
              </div>
              <span className="font-heading group-hover:text-brand-teal-light text-xl font-bold tracking-tight text-white transition-colors">
                ACM Chapter
              </span>
            </Link>
            <p className="mb-6 max-w-sm leading-relaxed text-gray-400">
              Empowering students through technology, innovation, and community. The premier
              computer science society at our university.
            </p>
            {/* Social links removed because they were non-functional */}
          </div>

          <div>
            <h4 className="mb-6 font-semibold text-white">Quick Links</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/events" className="text-gray-400 transition-colors hover:text-white">
                  Events Archive
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-gray-400 transition-colors hover:text-white">
                  Project Showcase
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-gray-400 transition-colors hover:text-white">
                  Our Team
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="text-gray-400 transition-colors hover:text-white">
                  Bulletins & Newsletters
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 font-semibold text-white">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin className="text-brand-purple h-5 w-5 shrink-0" />
                <a
                  href="https://maps.google.com/?q=SVKM's+NMIMS+Indore,+Super+Corridor,+Indore,+Madhya+Pradesh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  SVKM's NMIMS INDORE
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Mail className="text-brand-teal h-5 w-5 shrink-0" />
                <a
                  href="mailto:acm.indore@nmims.edu"
                  className="transition-colors hover:text-white"
                >
                  acm.indore@nmims.edu
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-center text-sm text-gray-500 md:text-left">
            &copy; {new Date().getFullYear()} ACM Student Chapter. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link href="/privacy" className="transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
