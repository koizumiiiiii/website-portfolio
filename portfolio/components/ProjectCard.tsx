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

        {/* View Image Button - appears on hover */}
        <motion.a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 flex items-center justify-center gap-2 bg-brand-600/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer z-20"
          initial={{ scale: 0.8, opacity: 0 }}
          whileHover={{ scale: 1 }}
          animate={{ opacity: 0 }}
          whileInView={{ opacity: 0 }}
          onHoverStart={() => {}}
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 300,
              damping: 20,
              delay: 0.05
            }}
            className="flex items-center gap-2 text-white font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M2.5 12.5L7 8m0 0l4 4m-4-4v8a2 2 0 002 2h8a2 2 0 002-2v-4" />
            </svg>
            View Image
          </motion.div>
        </motion.a>
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
      </div>

      {/* Glow border effect on hover (overlay pseudo) */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ring-1 ring-brand-400/30 dark:ring-brand-500/30" />
    </motion.article>
  );
}
