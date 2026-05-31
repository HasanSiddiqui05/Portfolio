"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;

    if (!glow) return;

    const xTo = gsap.quickTo(glow, "x", {
      duration: 0.9,
      ease: "power3.out",
    });

    const yTo = gsap.quickTo(glow, "y", {
      duration: 0.9,
      ease: "power3.out",
    });

    const moveGlow = (e: MouseEvent) => {
      xTo(e.clientX - 36);
      yTo(e.clientY - 36);

      const target = e.target as HTMLElement;

      const hideCursor =
        target.closest("button") ||
        target.closest("img") ||
        target.closest("a") ||
        target.closest("svg") ||
        target.closest(".skill-card");

        gsap.to(glow, {
        opacity: hideCursor ? 0 : 1,
        scale: hideCursor ? 0 : 1,
        duration: 0.60,
        ease: "power3.out",
        });
    };

    window.addEventListener("mousemove", moveGlow);

    return () => {
      window.removeEventListener("mousemove", moveGlow);
    };
  }, []);

  return (
    <div ref={glowRef} className=" pointer-events-none fixed top-0 left-0 w-18 h-18 rounded-full bg-[rgb(230,195,255)] shadow-[0px_0px_30px_0px_rgb(175,131,255)] mix-blend-difference z-50 "/>
  );
}