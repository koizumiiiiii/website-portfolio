"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const ThreeHero = dynamic(() => import("./ThreeHero"), { ssr: false });

const PHRASES = [
  "Building robust web apps",
  "Solving real problems",
  "CS Student @ UM",
  "Open for OJT",
];

function Typewriter() {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [displayed,  setDisplayed] = useState("");
  const [deleting,   setDeleting]  = useState(false);
  const [paused,     setPaused]    = useState(false);

  useEffect(() => {
    const phrase = PHRASES[phraseIdx];
    if (paused) {
      const t = setTimeout(() => { setPaused(false); setDeleting(true); }, 1800);
      return () => clearTimeout(t);
    }
    if (!deleting) {
      if (displayed.length < phrase.length) {
        const t = setTimeout(() => setDisplayed(phrase.slice(0, displayed.length + 1)), 65);
        return () => clearTimeout(t);
      } else {
        setPaused(true);
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
        return () => clearTimeout(t);
      } else {
        setDeleting(false);
        setPhraseIdx((i) => (i + 1) % PHRASES.length);
      }
    }
  }, [displayed, deleting, paused, phraseIdx]);

  return (
    <span className="font-mono text-brand-600 dark:text-brand-400 text-lg sm:text-xl font-medium">
      {displayed}
      <span className="inline-block w-0.5 h-5 bg-brand-500 dark:bg-brand-400 ml-0.5 align-middle animate-pulse" />
    </span>
  );
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  return (
    <section
      id="home"
      aria-label="Hero"
      className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden"
    >
      {/* Mesh gradient background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-mesh-gradient opacity-60 dark:opacity-30 pointer-events-none"
      />

      {/* Radial glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(58,103,255,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full lg:pl-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-14 items-center lg:items-center">

          {/* ── LEFT: Text content ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6 lg:self-center lg:translate-x-3 lg:max-w-[36rem] xl:max-w-[40rem]"
          >
            {/* Label */}
            <motion.div variants={itemVariants}>
              <span className="section-label">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-500 dark:bg-brand-400 animate-pulse" />
                Available for OJT
              </span>
            </motion.div>

            {/* Greeting + Name */}
            <motion.div variants={itemVariants} className="space-y-1">
              <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">Hi, I&apos;m</p>
              <h1 className="font-display font-black leading-none tracking-tight">
                <span className="block text-5xl sm:text-6xl lg:text-[4.6rem] xl:text-[5.1rem] shimmer-text">
                  JAMES OLIVER
                </span>
                <span className="block text-5xl sm:text-6xl lg:text-[4.6rem] xl:text-[5.1rem] shimmer-text tracking-[0.02em]">
                  MENDOZA
                </span>
              </h1>
            </motion.div>

            {/* Typewriter */}
            <motion.div variants={itemVariants} className="h-8">
              <Typewriter />
            </motion.div>

            {/* Bio — all apostrophes escaped */}
            <motion.p
              variants={itemVariants}
              className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed max-w-lg"
            >
              I&apos;m a CS student who loves turning ideas into code. I&apos;ve built a few{" "}
              <span className="text-slate-900 dark:text-slate-200 font-medium">full&#8209;stack apps</span>,{" "}
              started exploring machine learning, and always try to learn by doing. Outside
              the laptop, I hike and play guitar. Right now I&apos;m looking for an OJT where I can{" "}
              <span className="text-brand-600 dark:text-brand-400 font-medium">contribute, learn from a team, and ship real features</span>.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-medium text-sm shadow-glow-sm hover:shadow-glow-md transition-all duration-200 hover:-translate-y-0.5"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M9 3v18M3 9h18" />
                </svg>
                View Projects
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 font-medium text-sm transition-all duration-200 hover:-translate-y-0.5"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                Contact Me
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 font-medium text-sm transition-all duration-200 hover:-translate-y-0.5"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 0-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Resume
              </a>
            </motion.div>

            {/* Social icons */}
            <motion.div variants={itemVariants} className="flex items-center gap-4 pt-2">
              <span className="text-xs text-slate-400 dark:text-slate-600 uppercase tracking-widest font-mono">Follow</span>
              <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
              {[
                {
                  href:  "https://linkedin.com/in/dranreb-jay-arzadon-593189414",
                  label: "LinkedIn",
                  icon:  (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  ),
                },
                {
                  href:  "https://github.com/koizumiiiiii",
                  label: "GitHub",
                  icon:  (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                    </svg>
                  ),
                },
                {
                  href:  "https://facebook.com/dranrebjay.arzadon",
                  label: "Facebook",
                  icon:  (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  ),
                },
                {
                  href:  "https://instagram.com/drnrbj",
                  label: "Instagram",
                  icon:  (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  ),
                },
              ].map(({ href, label, icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200/80 dark:border-slate-700/60 text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 hover:border-brand-300 dark:hover:border-brand-700 hover:bg-brand-50 dark:hover:bg-brand-950/40 transition-all duration-200"
                >
                  {icon}
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT: 3D icosahedron + orb ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="flex justify-center items-center relative lg:justify-center lg:self-center lg:translate-x-8"
          >
            {/* Slow-spin orb */}
            <div
              aria-hidden="true"
              className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full animate-spin-slow pointer-events-none"
              style={{
                background: "conic-gradient(from 0deg, rgba(58,103,255,0.12), rgba(139,92,246,0.08), rgba(58,103,255,0.12))",
                filter: "blur(1px)",
              }}
            />

            {/* Outer glow ring */}
            <div
              aria-hidden="true"
              className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full border border-brand-400/20 dark:border-brand-500/20 animate-float-slow"
            />
            <div
              aria-hidden="true"
              className="absolute w-56 h-56 sm:w-72 sm:h-72 rounded-full border border-accent-400/15 dark:border-accent-400/20"
            />

            {/* Canvas wrapper */}
            <div className="relative z-10 w-52 h-52 sm:w-64 sm:h-64 lg:w-76 lg:h-76 xl:w-80 xl:h-80 animate-float">
              {/* Backdrop blur card */}
              <div className="absolute inset-0 rounded-3xl bg-white/30 dark:bg-slate-900/30 backdrop-blur-sm border border-white/40 dark:border-slate-700/30 shadow-card dark:shadow-card-dark" />
              <div className="relative z-10 w-full h-full p-4 flex items-center justify-center">
                <ThreeHero />
              </div>
            </div>

            {/* Year decoration */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1, duration: 0.5 }}
              className="absolute -top-2 right-2 sm:-top-3 sm:right-3 px-3 py-1.5 rounded-full bg-brand-600/10 dark:bg-brand-400/10 border border-brand-200/50 dark:border-brand-800/50 text-xs font-mono font-medium text-brand-600 dark:text-brand-400 shadow-sm"
            >
              2026
            </motion.div>
          </motion.div>

        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 pointer-events-none md:bottom-4"
        >
          <span className="text-xs text-slate-400 dark:text-slate-600 tracking-widest uppercase font-mono">Scroll</span>
          <div className="w-5 h-8 rounded-full border border-slate-300 dark:border-slate-700 flex justify-center pt-1.5">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-1.5 rounded-full bg-brand-500"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}