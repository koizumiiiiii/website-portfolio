"use client";

import { useEffect, useRef, useState } from "react";

function getBrand(shade = 500): string {
  if (typeof window === "undefined") return "59,130,246";
  return getComputedStyle(document.documentElement)
    .getPropertyValue(`--brand-${shade}`).trim() || "59,130,246";
}

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mouse   = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafRef  = useRef<number>(0);

  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [hidden,   setHidden]   = useState(false);

  const [isTouch, setIsTouch] = useState(false);
  const [brand,   setBrand]   = useState("59,130,246");

  // Detect touch device + read brand color
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true);
      return;
    }
    setBrand(getBrand(500));
    const obs = new MutationObserver(() => setBrand(getBrand(500)));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-theme"] });
    return () => obs.disconnect();
  }, []);

  // Mouse event listeners
  useEffect(() => {
    if (isTouch) return;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      setHidden(false);
    };
    const onLeave  = () => setHidden(true);
    const onEnter  = () => setHidden(false);
    const onDown   = () => setClicking(true);
    const onUp     = () => setClicking(false);

    const onHoverIn = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest("a, button, [role='button'], label, input, textarea, select")) {
        setHovering(true);
      }
    };
    const onHoverOut = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest("a, button, [role='button'], label, input, textarea, select")) {
        setHovering(false);
      }
    };

    document.addEventListener("mousemove",   onMove);
    document.addEventListener("mouseleave",  onLeave);
    document.addEventListener("mouseenter",  onEnter);
    document.addEventListener("mousedown",   onDown);
    document.addEventListener("mouseup",     onUp);
    document.addEventListener("mouseover",   onHoverIn);
    document.addEventListener("mouseout",    onHoverOut);

    const animate = () => {
      ringPos.current.x = lerp(ringPos.current.x, mouse.current.x, 0.1);
      ringPos.current.y = lerp(ringPos.current.y, mouse.current.y, 0.1);

      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${mouse.current.x}px, ${mouse.current.y}px) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener("mousemove",   onMove);
      document.removeEventListener("mouseleave",  onLeave);
      document.removeEventListener("mouseenter",  onEnter);
      document.removeEventListener("mousedown",   onDown);
      document.removeEventListener("mouseup",     onUp);
      document.removeEventListener("mouseover",   onHoverIn);
      document.removeEventListener("mouseout",    onHoverOut);
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[99999] rounded-full will-change-transform"
        style={{
          width: clicking ? "3px" : "5px",
          height: clicking ? "3px" : "5px",
          backgroundColor: `rgb(${brand})`,
          opacity: hidden ? 0 : 1,
          transition: "width 0.15s, height 0.15s, opacity 0.3s",
          boxShadow: `0 0 6px rgba(${brand},0.5)`,
        }}
      />

      {/* Ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[99998] rounded-full will-change-transform"
        style={{
          width:  hovering ? "56px" : clicking ? "28px" : "40px",
          height: hovering ? "56px" : clicking ? "28px" : "40px",
          border: `1px solid rgba(${brand},${hovering ? 0.7 : clicking ? 0.5 : 0.3})`,
          opacity: hidden ? 0 : 1,
          backgroundColor: hovering ? `rgba(${brand},0.06)` : "transparent",
          transition: "width 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), height 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.3s, background-color 0.2s",
        }}
      />

      {/* Click pulse */}
      {clicking && (
        <div
          aria-hidden="true"
          className="fixed top-0 left-0 pointer-events-none z-[99997] rounded-full animate-pulse-ring"
          style={{
            width: "40px",
            height: "40px",
            border: `1px solid rgba(${brand},0.4)`,
            transform: `translate(${mouse.current.x}px, ${mouse.current.y}px) translate(-50%, -50%)`,
          }}
        />
      )}
    </>
  );
}
