"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mouse   = useRef({ x: -100, y: -100 });
  const ring    = useRef({ x: -100, y: -100 });
  const rafRef  = useRef<number>(0);

  const [clicking,  setClicking]  = useState(false);
  const [hovering,  setHovering]  = useState(false);
  const [hidden,    setHidden]    = useState(false);

  useEffect(() => {
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
      ring.current.x = lerp(ring.current.x, mouse.current.x, 0.12);
      ring.current.y = lerp(ring.current.y, mouse.current.y, 0.12);

      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${mouse.current.x}px, ${mouse.current.y}px) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%, -50%)`;
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
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[99999] rounded-full will-change-transform transition-opacity duration-300"
        style={{
          width: clicking ? "6px" : "8px",
          height: clicking ? "6px" : "8px",
          backgroundColor: hovering ? "rgb(58,103,255)" : "rgb(58,103,255)",
          opacity: hidden ? 0 : 1,
          transition: "width 0.15s, height 0.15s, opacity 0.3s",
          boxShadow: hovering ? "0 0 10px rgba(58,103,255,0.8)" : "none",
        }}
      />

      {/* Ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[99998] rounded-full border will-change-transform"
        style={{
          width:  hovering ? "56px" : clicking ? "28px" : "36px",
          height: hovering ? "56px" : clicking ? "28px" : "36px",
          borderWidth: "1.5px",
          borderColor: hovering
            ? "rgba(58,103,255,0.8)"
            : clicking
            ? "rgba(58,103,255,0.6)"
            : "rgba(58,103,255,0.4)",
          opacity: hidden ? 0 : 1,
          backgroundColor: hovering ? "rgba(58,103,255,0.08)" : "transparent",
          transition: "width 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275), height 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275), border-color 0.2s, opacity 0.3s, background-color 0.2s",
        }}
      />

      {/* Click pulse ring */}
      {clicking && (
        <div
          aria-hidden="true"
          className="fixed top-0 left-0 pointer-events-none z-[99997] rounded-full border border-brand-400/40 animate-pulse-ring"
          style={{
            width: "36px",
            height: "36px",
            transform: `translate(${mouse.current.x}px, ${mouse.current.y}px) translate(-50%, -50%)`,
          }}
        />
      )}
    </>
  );
}
