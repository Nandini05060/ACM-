"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Events", href: "/events" },
  { name: "Gallery", href: "/gallery" },
  { name: "Team", href: "/team" },
  { name: "Projects", href: "/projects" },
  { name: "Achievements", href: "/achievements" },
  { name: "Live Events", href: "/live" },
  { name: "Newsletter", href: "/blogs" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-4 z-50 transition-all duration-500 ease-out flex justify-center px-4 md:px-8 pointer-events-none"
      )}
    >
      <div className={clsx(
        "flex items-center justify-between w-full max-w-7xl rounded-full border pointer-events-auto transition-all duration-500",
        scrolled
          ? "bg-[#030712]/60 py-3 px-6 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] border-white/10 backdrop-blur-2xl"
          : "bg-transparent py-4 px-2 border-transparent"
      )}>
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2">
          <div className="relative flex h-10 w-10 items-center justify-center transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            <Image src="/logo.png" alt="ACM NMIMS Indore Logo" width={40} height={40} className="object-contain" />
          </div>
          <span className="font-heading group-hover:text-brand-teal-light text-xl font-bold tracking-tight text-white transition-colors duration-300">
            ACM Chapter
          </span>
        </Link>

        <nav className={clsx("hidden items-center gap-1 rounded-full px-6 py-2 transition-all duration-500 md:flex", scrolled ? "bg-white/5 border border-white/5" : "glass")}>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={clsx(
                  "relative px-4 py-2 text-sm font-medium transition-colors rounded-full",
                  isActive ? "text-white" : "text-gray-400 hover:text-white"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="navbar-indicator"
                    className="absolute inset-0 z-[-1] rounded-full bg-white/10 border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Link
            href="/membership"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-6 py-2.5 font-bold text-black transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] active:scale-95"
          >
            <span className="relative z-10">Join ACM</span>
            <ChevronRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-purple-light to-brand-teal-light opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_0%,transparent_100%)] blur-md mix-blend-overlay" />
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="p-2 text-white md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="glass-card absolute top-full right-4 left-4 mt-4 rounded-3xl border border-white/10 md:hidden overflow-hidden pointer-events-auto shadow-2xl"
          >
            <div className="flex flex-col gap-4 px-6 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-medium text-gray-300 hover:text-white"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/membership"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-4 rounded-full bg-white px-6 py-3 text-center font-bold text-black"
              >
                Join ACM
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
