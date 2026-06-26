"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import { Container } from "./ui";

const links = [
  { href: "#projects", label: "Projects" },
  { href: "#journey", label: "Experience" },
  { href: "#notes", label: "Notes" },
  { href: "#contact", label: "Contact" },
];

export function Header({ isScrolled, navOpen, setNavOpen }: { isScrolled: boolean; navOpen: boolean; setNavOpen: (open: boolean) => void }) {
  const navClass = "font-mono text-xs uppercase tracking-[0.1em] text-text-secondary transition-colors hover:text-text-primary";

  useEffect(() => {
    document.body.style.overflow = navOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [navOpen]);

  return (
    <>
      <AnimatePresence>
        {navOpen ? (
          <motion.button
            type="button"
            aria-label="Close navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[890] bg-bg-primary/70 backdrop-blur-md md:hidden"
            onClick={() => setNavOpen(false)}
          />
        ) : null}
      </AnimatePresence>

      <header
        className={`fixed inset-x-0 top-0 z-[900] border-b transition-all duration-300 ${
          isScrolled || navOpen ? "border-border-soft bg-bg-primary/70 py-4 backdrop-blur-xl" : "border-transparent py-7"
        }`}
      >
      <Container className="flex items-center justify-between">
        <a href="#top" className="text-[22px] font-bold tracking-[-0.04em]" onClick={() => setNavOpen(false)}>
          alipnf
        </a>
        <button
          className="relative z-[930] h-6 w-8 md:hidden"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={navOpen}
          onClick={() => setNavOpen(!navOpen)}
        >
          <motion.span animate={navOpen ? { rotate: 45, y: 12 } : { rotate: 0, y: 0 }} className="absolute inset-x-0 top-0 h-px bg-text-primary" />
          <motion.span animate={navOpen ? { opacity: 0 } : { opacity: 1 }} className="absolute inset-x-0 top-1/2 h-px bg-text-primary" />
          <motion.span animate={navOpen ? { rotate: -45, y: -12 } : { rotate: 0, y: 0 }} className="absolute inset-x-0 top-full h-px bg-text-primary" />
        </button>

        <nav className="hidden items-center gap-9 md:flex" aria-label="Primary">
          {links.map((link) => (
            <a className={`nav-underline ${navClass}`} href={link.href} key={link.href}>
              {link.label}
            </a>
          ))}
          <a className="border border-border-strong px-4 py-2.5 font-mono text-xs uppercase tracking-[0.1em] transition-colors hover:border-text-primary hover:bg-text-primary hover:text-[#050505]" href="/cv/alipnf_cv.pdf">
            Download CV
          </a>
        </nav>
      </Container>

      <AnimatePresence>
        {navOpen ? (
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="fixed right-0 top-0 z-[910] flex h-screen w-[78%] max-w-[340px] flex-col justify-center gap-7 border-l border-border-soft bg-bg-secondary px-9 md:hidden"
              aria-label="Mobile primary"
            >
              {links.map((link, index) => (
                <motion.a
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + index * 0.04, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className={navClass}
                  href={link.href}
                  key={link.href}
                  onClick={() => setNavOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.24, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="w-fit border border-border-strong px-4 py-2.5 font-mono text-xs uppercase tracking-[0.1em]"
                href="/cv/alipnf_cv.pdf"
                onClick={() => setNavOpen(false)}
              >
                Download CV
              </motion.a>
            </motion.nav>
        ) : null}
      </AnimatePresence>
      </header>
    </>
  );
}
