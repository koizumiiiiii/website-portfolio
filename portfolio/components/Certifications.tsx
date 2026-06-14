"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// ─────────────────────────────────────────────────────────
// Certification data
// Replace the src values with your actual certification
// image URLs or local paths (e.g. "/images/cert-1.jpg").
// ─────────────────────────────────────────────────────────
interface Cert {
  id: string;
  title: string;
  issuer: string;
  dateCompleted: string;
  /** REPLACE WITH YOUR ACTUAL CERTIFICATION IMAGE URL */
  src: string;
}

const CERTS: Cert[] = [
  {
    id: "cert-1",
    title: "Database",
    issuer: "Certification",
    dateCompleted: "2025",
    src: "/Images/Database_Certification.png",
  },
  {
    id: "cert-2",
    title: "Network Security",
    issuer: "Certification",
    dateCompleted: "2026",
    src: "/Images/NetworkSecurity_Certification.png",
  },
];

// ─────────────────────────────────────────────────────────
// Lightbox modal
// ─────────────────────────────────────────────────────────
function Lightbox({ cert, onClose }: { cert: Cert; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <motion.div
      key="lightbox-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${cert.title} – enlarged view`}
    >
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        aria-hidden="true"
      />

      <motion.div
        key="lightbox-card"
        initial={{ opacity: 0, scale: 0.88, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 12 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl bg-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close lightbox"
          className="absolute top-3 right-3 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm transition-colors duration-150"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="relative w-full aspect-[3/2]">
          <Image
            src={cert.src}
            alt={cert.title}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-contain bg-slate-950"
            priority
          />
        </div>

        <div className="px-6 py-4 border-t border-slate-800">
          <p className="font-display font-semibold text-white text-base">
            {cert.title}
          </p>
          <p className="text-sm text-slate-400 mt-0.5">{cert.issuer}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────
// Stagger variants for cert cards
// ─────────────────────────────────────────────────────────
const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: i * 0.12,
      ease: [0.22, 1, 0.36, 1] as number[],
    },
  }),
};

// ─────────────────────────────────────────────────────────
// Individual cert card
// ─────────────────────────────────────────────────────────
function CertCard({
  cert,
  index,
  onOpen,
}: {
  cert: Cert;
  index: number;
  onOpen: () => void;
}) {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.22 }}
      onClick={onOpen}
      role="button"
      tabIndex={0}
      aria-label={`View ${cert.title} – click to enlarge`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
      className={[
        "group relative rounded-2xl overflow-hidden",
        "bg-white dark:bg-slate-900",
        "border border-slate-200/80 dark:border-slate-800/60",
        "shadow-card dark:shadow-card-dark",
        "transition-all duration-300 ease-out",
        "hover:shadow-[0_20px_60px_rgba(58,103,255,0.15)] dark:hover:shadow-[0_20px_60px_rgba(93,138,255,0.2)]",
        "hover:border-brand-300/60 dark:hover:border-brand-700/60",
        "cursor-zoom-in",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60",
      ].join(" ")}
    >
      {/* ── Thumbnail ── */}
      <div className="relative w-full aspect-[3/2] bg-slate-100 dark:bg-slate-800/50 overflow-hidden">
        {/* Certificate image */}
        <Image
          src={cert.src}
          alt={cert.title}
          fill
          sizes="(max-width: 640px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />

        {/*
         * ── "View Image" hover overlay ──
         *
         * Root cause of the original bug:
         *   1. No background on the overlay → text invisible against light images.
         *   2. Zero-width space characters (<​span>) in the original source
         *      caused JSX parse errors so the overlay never rendered at all.
         *
         * Fix:
         *   • Full-coverage dark gradient (bottom-up) → text always readable.
         *   • Frosted-glass pill badge with magnify icon.
         *   • Pill slides up 12px + fades in via Tailwind group-hover utilities —
         *     no extra Framer Motion needed (parent whileHover handles the card lift).
         *)
        */}
        <div
          aria-hidden="true"
          className={[
            "absolute inset-0",
            // Dark gradient so white text is readable over any certificate image
            "bg-gradient-to-t from-black/65 via-black/25 to-transparent",
            // Fade the whole overlay in
            "opacity-0 group-hover:opacity-100",
            "transition-opacity duration-250 ease-out",
            // Centre the pill
            "flex items-center justify-center",
          ].join(" ")}
        >
          {/* Frosted pill — slides up as it appears */}
          <span
            className={[
              "inline-flex items-center gap-2",
              "px-4 py-2 rounded-full",
              // Frosted glass look
              "bg-white/15 backdrop-blur-md",
              "border border-white/30",
              "text-white text-sm font-semibold tracking-wide",
              // Entrance motion via group-hover (no JS timer needed)
              "translate-y-3 group-hover:translate-y-0",
              "opacity-0 group-hover:opacity-100",
              "transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
            ].join(" ")}
          >
            {/* Magnify icon */}
            <svg
              className="w-4 h-4 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.2}
              strokeLinecap="round"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
              <path d="M11 8v6M8 11h6" />
            </svg>
            View Image
          </span>
        </div>
      </div>

      {/* ── Card footer ── */}
      <div className="px-5 py-4 space-y-2">
        <div>
          <p className="font-display font-semibold text-sm text-slate-800 dark:text-slate-100 truncate">
            {cert.title}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">{cert.issuer}</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 pt-1 border-t border-slate-200 dark:border-slate-700/50">
          <svg
            className="w-3.5 h-3.5 text-brand-500/70"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75 3.54-1.3-1.54c-.39-.48-1.03-.48-1.42 0-.39.48-.39 1.26 0 1.74l2 2.42c.39.48 1.03.48 1.42 0l4.15-5.16c.39-.48.39-1.26 0-1.74-.39-.48-1.03-.48-1.42 0z" />
          </svg>
          Completed: {cert.dateCompleted}
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────
// Section export
// ─────────────────────────────────────────────────────────
export default function Certifications() {
  const [activeCert, setActiveCert] = useState<Cert | null>(null);
  const openLightbox = useCallback((cert: Cert) => setActiveCert(cert), []);
  const closeLightbox = useCallback(() => setActiveCert(null), []);

  return (
    <>
      <section
        id="certifications"
        aria-label="Certifications"
        className="relative py-24 sm:py-32"
      >
        {/* Subtle grid bg (same as Projects section) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgb(100,116,139) 1px, transparent 1px), linear-gradient(to bottom, rgb(100,116,139) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          {/* ── Heading (scroll-reveal, consistent with rest of site) ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16 max-w-2xl mx-auto"
          >
            <span className="section-label">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500 dark:bg-brand-400" />
              Achievements
            </span>
            <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-slate-900 dark:text-white tracking-tight">
              Certifi<span className="gradient-text">cations</span>
            </h2>
            <p className="mt-4 text-slate-500 dark:text-slate-400 text-lg leading-relaxed">
              Credentials I&apos;ve earned — click any card to view the full
              certificate.
            </p>
          </motion.div>

          {/* ── Cert grid: side-by-side on sm+, stacked on mobile ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {CERTS.map((cert, i) => (
              <CertCard
                key={cert.id}
                cert={cert}
                index={i}
                onOpen={() => openLightbox(cert)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Lightbox (portalled via AnimatePresence) ── */}
      <AnimatePresence>
        {activeCert && (
          <Lightbox cert={activeCert} onClose={closeLightbox} />
        )}
      </AnimatePresence>
    </>
  );
}