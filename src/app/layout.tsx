import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

import { ConditionalLayout } from "@/components/layout/ConditionalLayout";

export const metadata: Metadata = {
  title: "ACM Student Chapter | Premium Tech Community",
  description:
    "The official platform for the ACM Student Chapter. Join the most prestigious technical community.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}>
      <body className="bg-brand-900 flex min-h-screen flex-col font-sans text-white">
        <SmoothScrollProvider>
          <ConditionalLayout>{children}</ConditionalLayout>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
