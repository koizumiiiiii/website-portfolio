"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeToggle } from "@/hooks/useThemeToggle";

const NAV_LINKS = [
  { href: "#home",            label: "Home" },
  { href: "#about",           label: "About" },
  { href: "#projects",        label: "Projects" },
  { href: "#certifications",  label: "Certifications" },
  { href: "#contact",         label: "Contact" },
];

export default function Navbar() {
  const [scrolled,      setScrolled]   = useState(false);
  const [mobileOpen,    setMobileOpen] = useState(false);
  const [activeSection, setActive]     = useState("home");
  const { theme, toggle, mounted }     = useThemeToggle();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      // Active section detection — keep in sync with NAV_LINKS
      const sections = ["home", "about", "projects", "certifications", "contact"];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-3 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl shadow-sm border-b border-slate-200/40 dark:border-slate-800/40"
            : "py-5 bg-transparent"
        }`}
        aria-label="Main navigation"
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            className="group relative inline-flex items-center rounded-2xl p-[1px]"
          >
            <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-brand-400 via-cyan-400 to-fuchsia-500 opacity-80 blur-[1px]" />
            <span className="relative flex items-center rounded-[15px] border border-slate-200/80 bg-white/90 px-3 py-1.5 shadow-[0_10px_30px_rgba(14,165,233,0.12)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-[0_14px_36px_rgba(168,85,247,0.18)] dark:border-slate-700/80 dark:bg-slate-950/90">
              <span className="bg-gradient-to-r from-brand-600 via-cyan-500 to-fuchsia-500 bg-clip-text text-xl font-black tracking-[0.18em] text-transparent dark:from-brand-300 dark:via-cyan-300 dark:to-fuchsia-300">JM</span>
            </span>
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
                        className="absolute inset-0 bg-brand-50 dark:bg-brand-950/60 rounded-lg"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                      />
                    )}
                    <span className="relative z-10">{label}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Right: theme toggle + hamburger */}
          <div className="flex items-center gap-3">
            {mounted && (
              <button
                onClick={toggle}
                aria-label="Toggle dark mode"
                className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              >
                <motion.div
                  key={theme}
                  initial={{ rotate: -30, opacity: 0, scale: 0.7 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {theme === "dark" ? (
                    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="5" strokeWidth="2" />
                      <path strokeWidth="2" strokeLinecap="round" d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                    </svg>
                  ) : (
                    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeWidth="2" strokeLinecap="round" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                    </svg>
                  )}
                </motion.div>
              </button>
            )}

            {/* Hamburger (mobile) */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle mobile menu"
              aria-expanded={mobileOpen}
              className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-[5px] rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
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
            className="fixed top-16 inset-x-4 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-2xl border border-slate-200/60 dark:border-slate-700/40 shadow-xl p-4 md:hidden"
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
                className="block px-4 py-3 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-brand-50 dark:hover:bg-brand-950/50 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
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