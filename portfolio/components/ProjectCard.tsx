"use client";

import { motion } from "framer-motion";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const { title, description, tags, emoji, githubUrl, liveUrl, gradient, metric, year } = project;

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.55,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      aria-label={title}
      className="group relative flex flex-col rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 overflow-hidden project-card-hover"
    >
      {/* Thumbnail */}
      <div
        className="relative h-44 flex items-center justify-center overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})` }}
      >
        {/* Dark overlay on hover */}
        <div className="absolute inset-0 bg-brand-600/0 group-hover:bg-brand-600/5 dark:group-hover:bg-brand-400/5 transition-colors duration-300" />

        {/* Emoji icon */}
        <span className="text-5xl select-none drop-shadow-sm relative z-10" role="img" aria-hidden="true">
          {emoji}
        </span>

        {/* Year badge */}
        <span className="absolute top-3 left-3 text-xs font-mono font-medium text-slate-500/70 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm px-2 py-0.5 rounded-full border border-slate-200/40 dark:border-slate-700/40">
          {year}
        </span>

        {/* Metric badge */}
        {metric && (
          <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/40 shadow-sm">
            <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{metric.value}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">{metric.label}</span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200/70 dark:border-slate-700/50"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white leading-snug group-hover:text-brand-700 dark:group-hover:text-brand-300 transition-colors duration-200">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed flex-1">
          {description}
        </p>

        {/* Links */}
        <div className="flex items-center gap-3 pt-1">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
            View Code
          </a>
          {liveUrl && (
            <>
              <span className="text-slate-300 dark:text-slate-700">·</span>
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
              >
                Live Demo
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M7 17L17 7M7 7h10v10" />
                </svg>
              </a>
            </>
          )}

          {/* Arrow accent */}
          <span className="ml-auto text-slate-300 dark:text-slate-700 group-hover:text-brand-400 dark:group-hover:text-brand-500 transition-colors">
            <svg className="w-4 h-4 translate-x-0 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M7 17L17 7M7 7h10v10" />
            </svg>
          </span>
        </div>
      </div>

      {/* Glow border effect on hover (overlay pseudo) */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ring-1 ring-brand-400/30 dark:ring-brand-500/30" />
    </motion.article>
  );
}
