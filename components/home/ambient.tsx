"use client";

import { useEffect, useRef } from "react";

export function Ambient({ scrollProgress }: { scrollProgress: number }) {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (isTouch) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let frame = 0;

    const move = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      }
    };

    const animate = () => {
      ringX = ringX + (mouseX - ringX) * 0.18;
      ringY = ringY + (mouseY - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      }
      frame = window.requestAnimationFrame(animate);
    };

    const onOver = (event: MouseEvent) => {
      const target = (event.target as Element).closest("a, button, .project-card, .note-card");
      if (target) {
        document.body.classList.add("cursor-hover");
        if (target.classList.contains("project-card")) document.body.classList.add("cursor-view");
      }
    };

    const onOut = (event: MouseEvent) => {
      if ((event.target as Element).closest("a, button, .project-card, .note-card")) {
        document.body.classList.remove("cursor-hover", "cursor-view");
      }
    };

    animate();
    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.body.classList.remove("cursor-hover", "cursor-view");
    };
  }, []);

  return (
    <>
      <div className="bg-grid" aria-hidden="true" />
      <div className="bg-noise" aria-hidden="true" />
      <div className="cursor-dot" ref={dotRef} aria-hidden="true" />
      <div className="cursor-ring" ref={ringRef} aria-hidden="true" />
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} aria-hidden="true" />
    </>
  );
}
