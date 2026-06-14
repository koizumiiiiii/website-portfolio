"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

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

// ── Stagger variants ──
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};
const itemVariants = {
  hidden:   { opacity: 0, y: 20 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
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

          {/* Left: Bio + Stats */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-8"
          >
            <motion.div variants={itemVariants} className="space-y-4">
              <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
                I&apos;m a driven Computer Science student with a deep passion for software development
                and problem-solving. I thrive on crafting full-stack applications that are both
                technically robust and user-friendly — clean architecture meets thoughtful design.
              </p>
              <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
                Beyond coding, I&apos;m enthusiastic about machine learning and network security —
                fields where software has tangible, real-world impact. I believe in writing maintainable
                code and continuously sharpening my skills through projects and collaboration.
              </p>
            </motion.div>

            {/* Stats grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4">
              <StatCard target={5} suffix="+" label="Projects Built"   enabled={inView} />
              <StatCard target={10} suffix="+" label="Technologies"     enabled={inView} />
              <StatCard isText textValue="CS" label="Major @ UM"       enabled={inView} />
            </motion.div>

            {/* Timeline accent */}
            <motion.div
              variants={itemVariants}
              className="flex items-start gap-4 p-4 rounded-xl bg-brand-50/60 dark:bg-brand-950/30 border border-brand-100 dark:border-brand-900/50"
            >
              <div className="w-8 h-8 rounded-lg bg-brand-500/10 dark:bg-brand-400/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-brand-600 dark:text-brand-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Currently at</p>
                <p className="text-base font-semibold text-brand-700 dark:text-brand-300">University of Mindanao</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">BS Computer Science • 2022 – Present</p>
              </div>
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
                Skills & Tools
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
