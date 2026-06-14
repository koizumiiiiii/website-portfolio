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
      {/* Subtle grid background */}
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
        {/* Heading */}
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
            A selection of projects I&apos;ve built — spanning web apps, machine learning
            systems, and developer tools.
          </p>
        </motion.div>

        {/* Project grid — 5 cards: 3 top + 2 bottom centered */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.slice(0, 3).map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 lg:max-w-[66%] lg:mx-auto">
          {projects.slice(3).map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i + 3} />
          ))}
        </div>
      </div>
    </section>
  );
}
