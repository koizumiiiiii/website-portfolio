"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const { title, description, tags, image, gradient } = project;

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
      {/* ── Screenshot thumbnail ── */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          height: "420px",
          background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})`,
        }}
      >
        <Image
          src={image}
          alt={`${title} screenshot`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
          className="object-contain object-center transition-transform duration-500 group-hover:scale-[1.02]"
          priority={index < 2}
        />
      </div>

      {/* ── Body ── */}
      <div className="flex flex-col p-5 gap-3">

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
        <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white leading-snug">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          {description}
        </p>

      </div>

      {/* Subtle glow border on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ring-1 ring-brand-400/30 dark:ring-brand-500/30" />
    </motion.article>
  );
}