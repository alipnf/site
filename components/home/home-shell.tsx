"use client";

import { useEffect, useState, type PropsWithChildren } from "react";
import { Ambient } from "./ambient";
import { Header } from "./header";

export function HomeShell({ children }: PropsWithChildren) {
  const [navOpen, setNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 40);

        const doc = document.documentElement;
        const max = doc.scrollHeight - doc.clientHeight;
        setScrollProgress(max > 0 ? (window.scrollY / max) * 100 : 0);

        frame = 0;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <Ambient scrollProgress={scrollProgress} />
      <Header isScrolled={isScrolled} navOpen={navOpen} setNavOpen={setNavOpen} />
      {children}
    </>
  );
}
