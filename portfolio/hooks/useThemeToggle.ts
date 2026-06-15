"use client";

import { useState, useEffect, useCallback } from "react";

export type ThemeName = "neutral" | "ocean" | "sunset" | "forest" | "lavender";
type Mode = "light" | "dark";

const THEMES: ThemeName[] = ["neutral", "ocean", "sunset", "forest", "lavender"];

function applyTheme(theme: ThemeName, mode: Mode) {
  const root = document.documentElement;
  root.setAttribute("data-theme", theme);
  if (mode === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}

export function useThemeToggle() {
  const [theme, setTheme] = useState<ThemeName>("neutral");
  const [mode, setMode] = useState<Mode>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const storedTheme = localStorage.getItem("theme") as ThemeName | null;
      const storedMode = localStorage.getItem("mode") as Mode | null;
      const t = storedTheme && THEMES.includes(storedTheme) ? storedTheme : "neutral";
      const m = storedMode === "dark" || storedMode === "light" ? storedMode
        : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      setTheme(t);
      setMode(m);
      applyTheme(t, m);
    } catch {
      applyTheme("neutral", "light");
    }
  }, []);

  const setThemeName = useCallback((name: ThemeName) => {
    setTheme(name);
    applyTheme(name, mode);
    try { localStorage.setItem("theme", name); } catch {}
  }, [mode]);

  const toggleMode = useCallback(() => {
    setMode((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      applyTheme(theme, next);
      try { localStorage.setItem("mode", next); } catch {}
      return next;
    });
  }, [theme]);

  return { theme, mode, mounted, setThemeName, toggleMode, themes: THEMES };
}
