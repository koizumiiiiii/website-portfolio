"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
}

// ── Tag pill ──────────────────────────────────────────────────────────────────
function Tag({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[0.7rem] font-semibold tracking-wide bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/60">
      {label}
    </span>
  );
}

// ── Metric badge ──────────────────────────────────────────────────────────────
function MetricBadge({ value, label }: { value: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-gradient-to-r from-brand-50 to-accent-50 dark:from-brand-950/60 dark:to-accent-950/60 text-brand-700 dark:text-brand-300 border border-brand-100 dark:border-brand-900/50">
      <span className="text-brand-500 dark:text-brand-400">{value}</span>
      <span className="font-medium text-slate-500 dark:text-slate-400">·</span>
      <span className="font-medium text-slate-600 dark:text-slate-400">{label}</span>
    </span>
  );
}

// ── Main card ─────────────────────────────────────────────────────────────────
export default function ProjectCard({ project, index }: ProjectCardProps) {
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
      whileHover={{ y: -6, scale: 1.01 }}
      className={[
        "group flex flex-col h-full",
        "rounded-2xl overflow-hidden",
        "bg-white dark:bg-slate-900",
        "border border-slate-200/80 dark:border-slate-800/60",
        "shadow-[0_2px_12px_rgba(0,0,0,0.06)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.3)]",
        "hover:shadow-[0_20px_56px_rgba(37,99,235,0.13),0_6px_16px_rgba(0,0,0,0.07)]",
        "dark:hover:shadow-[0_20px_56px_rgba(37,99,235,0.22),0_6px_16px_rgba(0,0,0,0.4)]",
        "hover:border-brand-200/70 dark:hover:border-brand-800/70",
        "transition-[border-color,box-shadow] duration-300 ease-out",
      ].join(" ")}
      aria-label={project.title}
    >
      {/* ── Project image / thumbnail ───────────────────────────────────────── */}
      <div
        className="relative w-full aspect-[16/9] overflow-hidden flex-shrink-0"
        style={{
          background: `linear-gradient(135deg, ${project.gradient.from}, ${project.gradient.to})`,
        }}
      >
        {/*
         * REPLACE imageUrl in /data/projects.ts with your actual screenshot path.
         * e.g.  imageUrl: "/images/pandarawan.png"
         * Place images in the /public/images/ folder.
         *)
        */}
        <Image
          src={project.imageUrl}
          alt={`${project.title} screenshot`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          onError={(e) => {
            // Gracefully hide broken images — the gradient background shows instead
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />

        {/* Emoji fallback — visible when image is loading or missing */}
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center text-5xl opacity-30 select-none pointer-events-none"
        >
          {project.emoji}
        </div>

        {/* Year chip — top-right corner */}
        <span className="absolute top-3 right-3 z-10 px-2 py-0.5 rounded-md text-[0.68rem] font-bold tracking-widest bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm text-slate-500 dark:text-slate-400 border border-white/40 dark:border-slate-700/40">
          {project.year}
        </span>
      </div>

      {/* ── Card body ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 p-5 gap-4">
        {/* Metric badge */}
        {project.metric && (
          <MetricBadge value={project.metric.value} label={project.metric.label} />
        )}

        {/* Title */}
        <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-white leading-snug tracking-tight">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed flex-1">
          {project.description}
        </p>

        {/* Tag pills */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
      </div>
    </motion.article>
  );
}