"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeToggle } from "@/hooks/useThemeToggle";
import type { ThemeName } from "@/hooks/useThemeToggle";

const NAV_LINKS = [
  { href: "#home",            label: "Home" },
  { href: "#about",           label: "About" },
  { href: "#projects",        label: "Projects" },
  { href: "#certifications",  label: "Certifications" },
  { href: "#contact",         label: "Contact" },
];

const THEME_NAMES: Record<ThemeName, string> = {
  neutral:  "Neutral",
  ocean:    "Ocean",
  sunset:   "Sunset",
  forest:   "Forest",
  lavender: "Lavender",
};

export default function Navbar() {
  const [scrolled,      setScrolled]   = useState(false);
  const [mobileOpen,    setMobileOpen] = useState(false);
  const [activeSection, setActive]     = useState("home");
  const [pickerOpen,    setPickerOpen]  = useState(false);
  const { theme, mode, mounted, setThemeName, toggleMode, themes } = useThemeToggle();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = ["home", "about", "projects", "certifications", "contact"];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!pickerOpen) return;
    const close = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-theme-picker]")) setPickerOpen(false);
    };
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, [pickerOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 border-b ${
          scrolled
            ? "py-3 bg-card/80 backdrop-blur-xl shadow-sm border-slate-200/40 dark:border-slate-800/40"
            : "py-5 bg-transparent border-transparent"
        }`}
        aria-label="Main navigation"
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            className="text-lg font-display font-bold tracking-tight"
          >
            <span className="text-slate-800 dark:text-white">JM</span>
            <span className="text-brand-500">.</span>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {NAV_LINKS.map(({ href, label }) => {
              const id = href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <li key={href}>
                  <a
                    href={href}
                    className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                      isActive
                        ? "text-brand-600 dark:text-brand-400"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 bg-brand-500/10 dark:bg-brand-400/10 rounded-lg"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                      />
                    )}
                    <span className="relative z-10">{label}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Right: theme controls */}
          <div className="flex items-center gap-1">
            {mounted && (
              <div className="relative" data-theme-picker>
                <button
                  onClick={() => setPickerOpen(!pickerOpen)}
                  aria-label="Select theme"
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-card transition-all"
                  title={THEME_NAMES[theme]}
                >
                  <span className="w-3 h-3 rounded-full bg-brand-500" />
                </button>

                <AnimatePresence>
                  {pickerOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-36 py-1.5 bg-card rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg"
                    >
                      {themes.map((t) => (
                        <button
                          key={t}
                          onClick={() => { setThemeName(t); setPickerOpen(false); }}
                          className={`w-full flex items-center gap-2.5 px-3 py-1.5 text-xs font-medium transition-colors ${
                            theme === t
                               ? "text-brand-600 dark:text-brand-400 bg-brand-500/10 dark:bg-brand-400/10"
                              : "text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50"
                          }`}
                        >
                          <span className="w-2.5 h-2.5 rounded-full bg-brand-500" />
                          {THEME_NAMES[t]}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {mounted && (
              <button
                onClick={toggleMode}
                aria-label={`Switch to ${mode === "dark" ? "light" : "dark"}`}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-card transition-all"
              >
                <motion.span
                  key={mode}
                  initial={{ rotate: -30, opacity: 0, scale: 0.7 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {mode === "dark" ? (
                    <svg className="w-[16px] h-[16px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="5" strokeWidth="2" />
                      <path strokeWidth="2" strokeLinecap="round" d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                    </svg>
                  ) : (
                    <svg className="w-[16px] h-[16px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeWidth="2" strokeLinecap="round" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                    </svg>
                  )}
                </motion.span>
              </button>
            )}

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle mobile menu"
              aria-expanded={mobileOpen}
              className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-[5px] rounded-lg hover:bg-card transition-colors"
            >
              <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
              <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed top-16 inset-x-4 z-40 bg-card/95 backdrop-blur-xl rounded-2xl border border-slate-200/60 dark:border-slate-700/40 shadow-xl p-4 md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            {NAV_LINKS.map(({ href, label }, i) => (
              <motion.a
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="block px-4 py-3 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-brand-500 hover:bg-card transition-colors"
              >
                {label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
