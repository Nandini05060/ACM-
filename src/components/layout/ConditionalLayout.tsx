"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { AdminAccessButton } from "../shared/AdminAccessButton";

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "";
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return (
      <main className="flex-grow">
        {children}
      </main>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-24">
        {children}
      </main>
      <Footer />
      <AdminAccessButton />
    </>
  );
}
