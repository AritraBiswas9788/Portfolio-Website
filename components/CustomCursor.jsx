"use client";

import React, { useEffect, useRef } from "react";

const CLICKABLE_SELECTOR =
  'a, button, input, select, textarea, [role="button"], [data-cursor="hover"], .cursor-pointer, summary';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  const mouseXRef = useRef(0);
  const mouseYRef = useRef(0);
  const ringXRef = useRef(0);
  const ringYRef = useRef(0);
  const ringScaleRef = useRef(1);
  const isHoveringClickableRef = useRef(false);
  const rafRef = useRef(0);

  useEffect(() => {
    // Disable on touch devices
    if (typeof window !== "undefined" && window.matchMedia && window.matchMedia('(pointer: coarse)').matches) {
      return; // Do not render custom cursor on touch devices
    }

    const dotEl = dotRef.current;
    const ringEl = ringRef.current;
    if (!dotEl || !ringEl) return;

    // Hide the default cursor while this component is mounted
    document.body.classList.add("cursor-none");


    const onPointerMove = (e) => {
      mouseXRef.current = e.clientX;
      mouseYRef.current = e.clientY;

      // Dot follows immediately
      dotEl.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    };

    const onPointerOver = (e) => {
      const isClickable = !!e.target.closest(CLICKABLE_SELECTOR);
      isHoveringClickableRef.current = isClickable;
      ringScaleRef.current = isClickable ? 1.8 : 1;
      ringEl.style.borderColor = isClickable ? "rgba(34,197,94,0.9)" : "rgba(34,197,94,0.9)"; // accent on hover
      dotEl.style.backgroundColor = isClickable ? "#22c55e" : "#22c55e"; // keep dot green
    };

    const animate = () => {
      // Lerp the ring towards the mouse
      const dx = mouseXRef.current - ringXRef.current;
      const dy = mouseYRef.current - ringYRef.current;
      ringXRef.current += dx * 0.18; // smoothing factor
      ringYRef.current += dy * 0.18;

      ringEl.style.transform = `translate(${ringXRef.current}px, ${ringYRef.current}px) translate(-50%, -50%) scale(${ringScaleRef.current})`;

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerover", onPointerOver, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.body.classList.remove("cursor-none");
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerover", onPointerOver);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* Small dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full"
        style={{
          backgroundColor: "#22c55e", // Tailwind green-500
          transform: "translate(-50%, -50%)",
          willChange: "transform",
          transition: "background-color 120ms ease",
        }}
      />

      {/* Outer ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full"
        style={{
          height: 32,
          width: 32,
          border: "2px solid #22c55e",
          transform: "translate(-50%, -50%) scale(1)",
          willChange: "transform, border-color",
          transition: "border-color 160ms ease",
          boxShadow: "0 0 20px rgba(34,197,94,0.25)",
        }}
      />
    </>
  );
}


