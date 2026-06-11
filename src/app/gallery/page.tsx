"use client";

import { useState, useEffect } from "react";
import { FadeUp } from "@/components/animations/FadeUp";
import { Play, X, ChevronLeft, ChevronRight, Download, Maximize2, Video } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import Image from "next/image";
import { galleryItems } from "./galleryData";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 15 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 120,
      damping: 18,
    },
  },
};

function GalleryVideoCard({ video, onClick }: { video: any; onClick: () => void }) {
  const [isPortrait, setIsPortrait] = useState(false);

  return (
    <div
      onClick={onClick}
      className={clsx(
        "glass-card group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/5 transition-all duration-500 hover:-translate-y-1 hover:border-brand-purple/40 hover:shadow-[0_15px_30px_rgba(109,74,255,0.15)]",
        isPortrait ? "row-span-2" : ""
      )}
    >
      <div className={clsx(
        "relative w-full overflow-hidden transition-all duration-500",
        isPortrait ? "aspect-[9/16]" : "aspect-video"
      )}>
        <video
          src={video.src}
          className="h-full w-full transform object-cover transition-transform duration-700 group-hover:scale-105"
          muted
          loop
          playsInline
          onLoadedMetadata={(e) => {
            const { videoWidth, videoHeight } = e.currentTarget;
            if (videoWidth < videoHeight) {
              setIsPortrait(true);
            }
          }}
          onMouseOver={(e) => e.currentTarget.play()}
          onMouseOut={(e) => e.currentTarget.pause()}
        />
        <div className="absolute inset-0 bg-black/30 transition-colors duration-300 group-hover:bg-black/10" />
        
        {/* Play icon overlay */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center z-10">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/60 backdrop-blur-md transition-transform group-hover:scale-110">
            <Play className="ml-0.5 h-4.5 w-4.5 text-white" />
          </div>
        </div>

        {/* Compact info strip inside the thumbnail */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/85 to-transparent z-10">
          <h4 className="text-xs font-bold text-white truncate">{video.title}</h4>
          <span className="text-[8px] font-medium text-brand-purple-light uppercase tracking-wider block mt-0.5">
            {video.event}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function GalleryPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("all");

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [lightboxIndex]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex]);

  // Separate videos and images
  const allVideos = galleryItems.filter((item) => item.type === "video");
  const allImages = galleryItems.filter((item) => item.type === "image");

  // Separate team work images (those located in /gallery/work/)
  const teamWorkImages = allImages.filter((item) => item.src.includes("/work/"));
  const otherImages = allImages.filter((item) => !item.src.includes("/work/"));

  // Filter photographic archive by active tab
  const filteredImages = otherImages.filter((item) => {
    if (activeTab === "all") return true;
    if (activeTab === "summit") return item.event.toLowerCase().includes("summit");
    if (activeTab === "webinar") return item.event.toLowerCase().includes("webinar");
    if (activeTab === "launch") return item.event.toLowerCase().includes("launch");
    return true;
  });

  // For Lightbox, we use the combined array so users can cycle through everything,
  // or we can restrict lightbox to just images/videos depending on what was clicked.
  // We'll use the full array for the lightbox context.
  const handleNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % galleryItems.length);
    }
  };

  const handlePrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + galleryItems.length) % galleryItems.length);
    }
  };

  const openLightbox = (id: number) => {
    const index = galleryItems.findIndex((item) => item.id === id);
    if (index !== -1) setLightboxIndex(index);
  };

  return (
    <div className="flex min-h-screen flex-col pb-24 bg-[#030712]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-44 pb-28">
        {/* Background Image with Dark Overlay - lightened and centered to make members visible */}
        <div className="absolute inset-0 z-0">
          <img
            src="/gallery/team_all.png"
            alt="Gallery Team Background"
            className="h-full w-full object-cover object-center opacity-70 filter brightness-110 contrast-100 saturate-[1.15]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-[#030712]/60 to-[#030712]" />
        </div>

        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay z-0 pointer-events-none" />

        <div className="container relative z-10 mx-auto px-6">
          <FadeUp>
            <div className="mb-6 text-center">
              <h1 className="font-heading mb-4 text-5xl font-black tracking-tight text-white md:text-7xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                <span className="from-brand-purple-light to-brand-teal-light bg-gradient-to-br bg-clip-text text-transparent">
                  Gallery
                </span>{" "}
                Section
              </h1>
              <p className="mx-auto max-w-2xl text-lg font-medium text-gray-300 drop-shadow-[0_2px_5px_rgba(0,0,0,0.9)]">
                The visual truth-source of the chapter, documenting everything from extreme
                hackathon sprints to high-level executive summits.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Multi-Dimensional Filter Hub for Images */}
      <section className="container mx-auto mb-24 px-6">
        <FadeUp>
          <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-6">
            <h2 className="font-heading text-3xl font-black text-white">Photographic Archive</h2>
            <div className="flex flex-wrap gap-2 bg-white/5 p-1 rounded-full border border-white/10 backdrop-blur-sm">
              {[
                { id: "all", label: "All Photos" },
                { id: "summit", label: "Chapter Summit" },
                { id: "webinar", label: "Webinars" },
                { id: "launch", label: "ACM-W Launch" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={clsx(
                    "relative px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-colors duration-300",
                    activeTab === tab.id ? "text-black" : "text-gray-400 hover:text-white"
                  )}
                >
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeFilterTab"
                      className="absolute inset-0 bg-white rounded-full z-0"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* Masonry Grid Layout for Images */}
        <AnimatePresence mode="popLayout">
          {filteredImages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-20 text-center"
            >
              <h3 className="mb-2 text-2xl font-bold text-white">No photos found</h3>
              <p className="text-gray-400">
                Try adjusting your filter parameters to see more images.
              </p>
            </motion.div>
          ) : (
            <motion.div
              layout
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="columns-1 gap-4 space-y-4 sm:columns-2 lg:columns-3 xl:columns-4"
            >
              {filteredImages.map((item) => (
                <motion.div
                  layout
                  variants={itemVariants}
                  key={item.id}
                  onClick={() => openLightbox(item.id)}
                  className="glass-card group relative cursor-pointer break-inside-avoid overflow-hidden rounded-2xl border border-white/5 transition-all duration-700 hover:border-brand-teal/30 hover:shadow-[0_20px_45px_-10px_rgba(0,229,192,0.15)] hover:-translate-y-1.5"
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    loading="lazy"
                    className="max-h-96 w-full transform object-cover transition-transform duration-700 group-hover:scale-108 group-hover:rotate-0.5"
                  />
                  {/* Hover Info Badge Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 p-4 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 z-10">
                    <div className="glass border border-white/10 rounded-xl p-3 backdrop-blur-md bg-[#030712]/70 shadow-lg">
                      <span className="text-brand-teal-light text-[9px] font-bold tracking-wider uppercase block mb-1">
                        {item.event}
                      </span>
                      <h3 className="text-white text-sm font-semibold truncate">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                  <div className="pointer-events-none absolute top-3 right-3 rounded-lg bg-black/50 p-2 opacity-0 backdrop-blur-md transition-opacity delay-75 group-hover:opacity-100 z-10">
                    <Maximize2 className="h-4.5 w-4.5 text-white" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Team Work Section */}
      {teamWorkImages.length > 0 && (
        <section className="container mx-auto mb-24 px-6">
          <FadeUp>
            <div className="mb-10 border-b border-white/10 pb-6">
              <h2 className="font-heading text-3xl font-black text-white">Team Work</h2>
            </div>
          </FadeUp>
          
          <motion.div
            layout
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="columns-1 gap-4 space-y-4 sm:columns-2 lg:columns-3 xl:columns-4"
          >
            {teamWorkImages.map((item) => (
              <motion.div
                layout
                variants={itemVariants}
                key={item.id}
                onClick={() => openLightbox(item.id)}
                className="glass-card group relative cursor-pointer break-inside-avoid overflow-hidden rounded-2xl border border-white/5 transition-all duration-700 hover:border-brand-teal/30 hover:shadow-[0_20px_45px_-10px_rgba(0,229,192,0.15)] hover:-translate-y-1.5"
              >
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  className="max-h-96 w-full transform object-cover transition-transform duration-700 group-hover:scale-108 group-hover:rotate-0.5"
                />
                {/* Hover Info Badge Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 z-10">
                  <div className="glass border border-white/10 rounded-xl p-3 backdrop-blur-md bg-[#030712]/70 shadow-lg">
                    <span className="text-brand-teal-light text-[9px] font-bold tracking-wider uppercase block mb-1">
                      {item.event}
                    </span>
                    <h3 className="text-white text-sm font-semibold truncate">
                      {item.title}
                    </h3>
                  </div>
                </div>
                <div className="pointer-events-none absolute top-3 right-3 rounded-lg bg-black/50 p-2 opacity-0 backdrop-blur-md transition-opacity delay-75 group-hover:opacity-100 z-10">
                  <Maximize2 className="h-4.5 w-4.5 text-white" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>
      )}

      {/* Video Highlights Section */}
      <section className="container mx-auto mb-24 px-6">
        <FadeUp>
          <div className="mb-10 flex items-center gap-3 border-b border-white/10 pb-4">
            <Video className="text-brand-purple-light h-8 w-8" />
            <h2 className="font-heading text-3xl font-black text-white">Video Highlights</h2>
          </div>
        </FadeUp>

        <div className="grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          {allVideos.map((video) => (
            <FadeUp key={video.id} className="h-full">
              <GalleryVideoCard video={video} onClick={() => openLightbox(video.id)} />
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Lightbox Modal Layer */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl"
          >
            {/* Top Bar */}
            <div className="absolute inset-x-0 top-0 z-20 flex h-20 items-center justify-between bg-gradient-to-b from-black/80 to-transparent px-6">
              <span className="font-mono text-sm text-gray-400">
                Asset {lightboxIndex + 1} of {galleryItems.length}
              </span>
              <div className="flex gap-4">
                <a
                  href={galleryItems[lightboxIndex].src}
                  download
                  target="_blank"
                  className="hover:text-brand-teal-light flex items-center gap-2 text-white transition-colors"
                >
                  <Download className="h-5 w-5" />
                  <span className="hidden text-sm font-bold sm:block">Raw Asset</span>
                </a>
                <button
                  onClick={() => setLightboxIndex(null)}
                  className="rounded-full bg-white/10 p-2 transition-colors hover:bg-white/20"
                >
                  <X className="h-6 w-6 text-white" />
                </button>
              </div>
            </div>

            {/* Media Container */}
            <div
              className="relative z-10 flex h-full w-full items-center justify-center p-6 md:p-20"
              onClick={() => setLightboxIndex(null)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={lightboxIndex}
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="max-h-[75vh] max-w-full flex items-center justify-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  {galleryItems[lightboxIndex].type === "video" ? (
                    <video
                      src={galleryItems[lightboxIndex].src}
                      className="max-h-full max-w-full rounded-2xl object-contain shadow-[0_0_100px_rgba(0,0,0,0.8)] border border-white/10"
                      controls
                      autoPlay
                      muted
                    />
                  ) : (
                    <img
                      src={galleryItems[lightboxIndex].src}
                      alt={galleryItems[lightboxIndex].title}
                      className="max-h-full max-w-full rounded-2xl object-contain shadow-[0_0_100px_rgba(0,0,0,0.8)] border border-white/10"
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute top-1/2 left-6 z-20 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-md transition-all hover:bg-white/20"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute top-1/2 right-6 z-20 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-md transition-all hover:bg-white/20"
            >
              <ChevronRight className="h-8 w-8" />
            </button>

            {/* Inline Context Mapping (Bottom Bar) */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black via-black/80 to-transparent p-6 md:p-10"
            >
              <div className="mx-auto flex max-w-4xl flex-col items-end justify-between gap-6 md:flex-row">
                <div>
                  <div className="mb-4 flex gap-3">
                    <span className="bg-brand-purple/20 border-brand-purple/30 text-brand-purple-light rounded-md border px-3 py-1 text-[10px] font-bold tracking-wider uppercase">
                      {galleryItems[lightboxIndex].event}
                    </span>
                    <span className="bg-brand-teal/20 border-brand-teal/30 text-brand-teal-light hidden rounded-md border px-3 py-1 text-[10px] font-bold tracking-wider uppercase sm:block">
                      {galleryItems[lightboxIndex].track}
                    </span>
                  </div>
                  <h2 className="mb-3 text-3xl font-bold text-white">
                    {galleryItems[lightboxIndex].title}
                  </h2>
                  <p className="max-w-2xl text-lg text-gray-300">
                    {galleryItems[lightboxIndex].context}
                  </p>
                </div>
                <div className="hidden text-right md:block">
                  <p className="mb-1 text-xs font-bold tracking-widest text-gray-500 uppercase">
                    Taxonomy Path
                  </p>
                  <p className="font-mono text-sm text-gray-400">
                    [{galleryItems[lightboxIndex].year}] / [{galleryItems[lightboxIndex].wing}]
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
