"use client";

import { useEffect, useState, type PropsWithChildren } from "react";
import { Ambient } from "./ambient";
import { Header } from "./header";

export function HomeShell({ children }: PropsWithChildren) {
  const [navOpen, setNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 40);

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
      <Ambient />
      <Header isScrolled={isScrolled} navOpen={navOpen} setNavOpen={setNavOpen} />
      {children}
    </>
  );
}
