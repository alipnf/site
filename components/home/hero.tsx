"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ButtonLink, Container } from "./ui";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, reduceMotion ? 1 : 0.72]);

  return (
    <section ref={sectionRef} className="relative flex min-h-screen flex-col justify-start overflow-hidden pt-32 pb-15 sm:pt-36 md:pt-40 lg:pt-36 xl:pt-40 before:pointer-events-none before:absolute before:left-1/2 before:top-[-10%] before:z-0 before:h-[900px] before:w-[900px] before:-translate-x-1/2 before:bg-[radial-gradient(circle,rgba(255,255,255,0.07),transparent_65%)]">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{ opacity: contentOpacity }}
          className="relative z-[2]"
        >
          <div className="mb-8 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.12em] text-text-muted">
            <span>PORTFOLIO / FRONTEND DEVELOPER</span>
            <span className="hidden md:block">
              06°42′S / 111°20′E — ID
            </span>
          </div>

          <motion.h1 style={{ y: headlineY }} className="overflow-hidden text-[clamp(4.8rem,18vw,15.5rem)] font-bold leading-[0.85] tracking-[-0.08em]">
            <span className="block">alipnf</span>
          </motion.h1>

          <p className="mt-7 font-mono text-[clamp(14px,1.6vw,18px)] uppercase tracking-[0.1em] text-text-secondary">
            Frontend Developer
          </p>
          <p className="mt-5 max-w-160 text-[clamp(1rem,1.3vw,1.15rem)] leading-[1.6] tracking-[-0.02em] text-text-secondary">
            Frontend Developer specializing in React, Next.js, and TypeScript, with experience building responsive, production-ready web interfaces from Figma designs, integrating REST APIs, and managing complex client-side flows.
          </p>

          <div className="mt-11 flex flex-wrap gap-3.5">
            <ButtonLink href="#projects" variant="primary">
              View Projects
            </ButtonLink>
            <ButtonLink href="/cv/alipnf_cv.pdf">
              Download CV
            </ButtonLink>
            <ButtonLink href="#notes">
              Read Notes
            </ButtonLink>
          </div>
        </motion.div>
      </Container>

      <div className="absolute bottom-9 left-8 z-[2] hidden items-center gap-2.5 sm:flex" aria-hidden="true">
        <div className="relative h-12 w-px overflow-hidden bg-border-strong">
          <div className="scroll-drop absolute inset-x-0 top-0 h-[30%] bg-text-primary" />
        </div>
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-text-muted [writing-mode:vertical-rl]">SCROLL</span>
      </div>
    </section>
  );
}
