"use client";

import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <section
      id="projects"
      aria-label="Featured Projects"
      className="relative py-24 sm:py-32"
    >
      {/* Subtle grid background — matches the rest of the site */}
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
        {/* ── Section heading ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <span className="section-label">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500 dark:bg-brand-400" />
            Portfolio
          </span>
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-slate-900 dark:text-white tracking-tight">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="mt-4 text-slate-500 dark:text-slate-400 text-lg leading-relaxed">
            A selection of systems I&apos;ve designed and built — spanning property
            management, cybersecurity, food-tech, and e-commerce.
          </p>
        </motion.div>

        {/*
         * ── Project grid ────────────────────────────────────────────────────
         *
         * 4 projects:  2 × 2 on desktop  |  2 col on tablet  |  1 col on mobile
         *
         * The middle pair is nudged down slightly (mt-8) to break the perfect
         * symmetry and add the same visual rhythm used in the original layout.
        *)
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Top row — projects 1 & 2 */}
          <ProjectCard project={projects[0]} index={0} />
          <ProjectCard project={projects[1]} index={1} />

          {/* Bottom row — projects 3 & 4, shifted down for visual asymmetry */}
          <div className="sm:mt-8">
            <ProjectCard project={projects[2]} index={2} />
          </div>
          <div className="sm:mt-8">
            <ProjectCard project={projects[3]} index={3} />
          </div>
        </div>

        {/* ── Subtle footer note (no GitHub CTA) ─────────────────────────── */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="text-center mt-14 text-sm text-slate-400 dark:text-slate-500"
        >
          More projects are in progress — stay tuned.
        </motion.p>
      </div>
    </section>
  );
}