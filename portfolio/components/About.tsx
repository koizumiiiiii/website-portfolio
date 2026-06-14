"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

// ── Count-up hook ──
function useCountUp(target: number, duration = 1400, enabled = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, enabled]);

  return count;
}

// ── Stat card ──
function StatCard({
  target,
  suffix = "",
  label,
  enabled,
  isText = false,
  textValue = "",
}: {
  target?: number;
  suffix?: string;
  label: string;
  enabled: boolean;
  isText?: boolean;
  textValue?: string;
}) {
  const count = useCountUp(target ?? 0, 1400, enabled && !isText);

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col items-center justify-center p-5 rounded-2xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border border-slate-200/60 dark:border-slate-800/40 shadow-card dark:shadow-card-dark text-center"
    >
      <span className="font-display font-black text-3xl sm:text-4xl gradient-text leading-none mb-1">
        {isText ? textValue : `${count}${suffix}`}
      </span>
      <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">{label}</span>
    </motion.div>
  );
}

// ── Skills data ──
const SKILLS: { category: string; chips: string[] }[] = [
  {
    category: "Frontend",
    chips: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"],
  },
  {
    category: "Backend",
    chips: ["PHP", "Laravel", "Java", "Python"],
  },
  {
    category: "Database",
    chips: ["MySQL"],
  },
  {
    category: "Tools",
    chips: ["Git", "GitHub", "VS Code", "IntelliJ IDEA", "Figma", "Jupyter"],
  },
];

// ── Tech icons mapping ──
const TECH_ICONS: { [key: string]: string } = {
  "HTML": "🌐",
  "CSS": "🎨",
  "JavaScript": "⚡",
  "TypeScript": "📘",
  "React": "⚛️",
  "Next.js": "▲",
  "Tailwind CSS": "🌊",
  "PHP": "🐘",
  "Laravel": "🎭",
  "Java": "☕",
  "Python": "🐍",
  "MySQL": "🗄️",
  "Git": "📦",
  "GitHub": "💻",
  "VS Code": "📝",
  "IntelliJ IDEA": "🔧",
  "Figma": "🎯",
  "Jupyter": "📊",
};

// ── Stagger variants ──
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};
const itemVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function About() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section
      id="about"
      aria-label="About Me"
      className="relative py-24 sm:py-32"
    >
      {/* Section bg accent */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-slate-50/80 dark:bg-slate-950/50 pointer-events-none"
      />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-6">

        {/* ── Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="section-label">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500 dark:bg-brand-400" />
            Who I Am
          </span>
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-slate-900 dark:text-white tracking-tight">
            About <span className="gradient-text">Me</span>
          </h2>
        </motion.div>

        {/* ── Two columns ── */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Left: Profile photo + Bio + Stats */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-8"
          >

            {/* ── Profile photo + name block ── */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col items-center gap-6 text-center"
            >
              {/* Box avatar with gradient border */}
              <motion.div
                whileHover={{ scale: 1.03, y: -4 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex-shrink-0"
              >
                {/* Gradient border container */}
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-brand-500 via-brand-600 to-purple-600 dark:from-brand-400 dark:via-brand-500 dark:to-purple-500 opacity-100 blur-xl group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Main image box */}
                <div
                  className={[
                    "relative flex-shrink-0",
                    "w-[350px] h-[350px] rounded-3xl",
                    "ring-2 ring-brand-200 dark:ring-brand-800",
                    "shadow-[0_20px_50px_rgba(58,103,255,0.25)]",
                    "dark:shadow-[0_20px_50px_rgba(93,138,255,0.2)]",
                    "overflow-hidden",
                    "border border-brand-300/30 dark:border-brand-600/30",
                  ].join(" ")}
                >
                  {/* REPLACE WITH YOUR ACTUAL PROFILE PHOTO URL */}
                  <Image
                    src="/profile.jpg"
                    alt="James Oliver Mendoza – profile photo"
                    fill
                    sizes="350px"
                    className="object-cover"
                    priority
                  />
                </div>
              </motion.div>

              {/* Name + status badge below the photo */}
              <div className="space-y-3 w-full">
                <p className="font-display font-bold text-3xl text-slate-900 dark:text-white leading-tight">
                  James Oliver Mendoza
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                  CS Student · University of Mindanao
                </p>
                {/* Available for OJT pill */}
                <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium tracking-wide text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60 border border-brand-200/60 dark:border-brand-800/40 px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  Available for OJT
                </span>
              </div>
            </motion.div>

            {/* Bio */}
            <motion.div variants={itemVariants} className="space-y-4">
              <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
                I'm James Oliver Mendoza, a Computer Science student at the University of Mindanao. I'm passionate about{" "}
                <span className="text-slate-900 dark:text-slate-200 font-medium">frontend development</span> and turning ideas into{" "}
                <span className="text-brand-600 dark:text-brand-400 font-medium">clean, reliable full‑stack applications</span>.
              </p>
              <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
                I've worked with{" "}
                <span className="text-slate-900 dark:text-slate-200 font-medium">modern JavaScript frameworks</span>, PHP backends, and database design. I've also explored machine learning in academic projects – but my main focus is writing{" "}
                <span className="text-brand-600 dark:text-brand-400 font-medium">maintainable, well‑structured code</span> for the web. I believe the best software solves real problems and feels natural to use.
              </p>
            </motion.div>

            {/* Education Timeline */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-sm font-mono font-semibold uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500">
                Education
              </h3>
              
              {/* Education item 1 */}
              <motion.div
                className="flex items-start gap-4 p-4 rounded-xl bg-brand-50/60 dark:bg-brand-950/30 border border-brand-100 dark:border-brand-900/50"
              >
                <div className="w-8 h-8 rounded-lg bg-brand-500/10 dark:bg-brand-400/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-brand-600 dark:text-brand-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path d="M12 3L2 8v4h20V8l-10-5z" />
                    <path d="M3 12h18v7c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2v-7z" />
                    <line x1="12" y1="15" x2="12" y2="20" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Currently at</p>
                  <p className="text-base font-semibold text-brand-700 dark:text-brand-300">BS Computer Science</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">University of Mindanao • 2022 – Present</p>
                </div>
              </motion.div>

              {/* Education item 2 */}
              <motion.div
                className="flex items-start gap-4 p-4 rounded-xl bg-slate-100/40 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-500/10 dark:bg-slate-400/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-slate-600 dark:text-slate-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path d="M12 3L2 8v4h20V8l-10-5z" />
                    <path d="M3 12h18v7c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2v-7z" />
                    <line x1="12" y1="15" x2="12" y2="20" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Senior High School</p>
                  <p className="text-base font-semibold text-slate-900 dark:text-slate-200">Assumption College of Davao</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Completed</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right: Skills */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-6"
          >
            <motion.div variants={itemVariants}>
              <span className="section-label">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-500 dark:bg-accent-400" />
                Tech Stack
              </span>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white">
                Skills &amp; Tools
              </h3>
            </motion.div>

            {SKILLS.map(({ category, chips }) => (
              <motion.div key={category} variants={itemVariants} className="space-y-3">
                <p className="text-xs font-mono font-semibold uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500">
                  {category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {chips.map((chip) => (
                    <motion.span
                      key={chip}
                      whileHover={{ scale: 1.05, y: -1 }}
                      className="skill-chip text-xs sm:text-sm"
                    >
                      {chip}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}