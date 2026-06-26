"use client";

import { projects } from "@/lib/home-data";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Container, Eyebrow, Section, SectionHeading, softFadeUp } from "./ui";

function ProjectLinks({ demoUrl, repositoryUrl }: { demoUrl: string; repositoryUrl: string }) {
  const links = [
    ["Demo", demoUrl],
    ["Repository", repositoryUrl],
  ] as const;

  return (
    <div className="mt-7 border-t border-border-soft pt-4">
      <span className="mb-3 block font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted">Links</span>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.12em]">
        {links.map(([label, href]) =>
          href ? (
            <Link className="text-text-primary underline-offset-4 transition hover:text-white hover:underline" href={href} key={label} target="_blank" rel="noreferrer">
              {label}
            </Link>
          ) : (
            <span className="cursor-not-allowed text-text-muted/45" key={label} aria-disabled="true">
              {label}
            </span>
          ),
        )}
      </div>
    </div>
  );
}

export function Projects() {
  const [activeProject, setActiveProject] = useState(0);
  const active = projects[activeProject];

  useEffect(() => {
    let frame = 0;

    const getClosestProject = () => {
      const cardEls = Array.from(document.querySelectorAll<HTMLElement>(".project-card"));
      if (!cardEls.length || window.innerWidth < 1280) return null;

      const viewportCenter = window.innerHeight * 0.5;
      return cardEls.reduce<{ distance: number; index: number }>(
        (current, card) => {
          const rect = card.getBoundingClientRect();
          const cardCenter = rect.top + rect.height / 2;
          const distance = Math.abs(cardCenter - viewportCenter);
          const index = Number(card.dataset.index);

          return distance < current.distance ? { distance, index } : current;
        },
        { distance: Number.POSITIVE_INFINITY, index: 0 },
      );
    };

    const updateActiveProject = () => {
      const closest = getClosestProject();
      if (!closest) return;

      setActiveProject((current) => (current === closest.index ? current : closest.index));
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        updateActiveProject();
        frame = 0;
      });
    };

    updateActiveProject();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <Section id="projects">
      <Container>
        <div className="mb-16">
          <Eyebrow index="02" label="Featured Projects" />
          <SectionHeading>Selected work, built end to end.</SectionHeading>
        </div>

        <div className="grid items-start gap-16 xl:grid-cols-[0.95fr_1.05fr] xl:gap-20">
          <div className="top-[120px] hidden min-h-[520px] h-fit xl:sticky xl:flex xl:flex-col xl:justify-center">
            <div className="mb-8 flex gap-2.5">
              {projects.map((project, index) => (
                <span className={`border-b pb-1.5 font-mono text-[11px] transition-colors ${activeProject === index ? "border-text-primary text-text-primary" : "border-transparent text-text-muted"}`} key={project.id}>
                  {project.num}
                </span>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="mb-3.5 block font-mono text-sm text-text-muted">{active.num} / {String(projects.length).padStart(2, "0")}</span>
                <h3 className="mb-4 text-[clamp(2rem,4.4vw,3.4rem)] font-bold leading-[1.02] tracking-[-0.04em]">{active.title}</h3>
                <p className="mb-7 max-w-[560px] text-[1rem] leading-[1.7] text-text-secondary">{active.desc}</p>
                <div className="mb-7 flex flex-wrap gap-2">
                  {active.stack.map((item, index) => (
                    <motion.span
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.045, duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                      className="border border-border-soft px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.06em] text-text-secondary"
                      key={item}
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
                <ProjectLinks demoUrl={active.demoUrl} repositoryUrl={active.repositoryUrl} />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex flex-col gap-16 xl:gap-20 xl:py-[calc((100vh-520px)/2)] xl:[scroll-snap-type:y_proximity]">
            {projects.map((project, index) => (
              <motion.div variants={softFadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-12%" }} className="xl:[scroll-snap-align:center]" key={project.id}>
                <div className="block px-1 pb-5 xl:hidden">
                  <span className="font-mono text-xs uppercase tracking-[0.12em] text-text-muted">{project.num} / {String(projects.length).padStart(2, "0")}</span>
                  <h3 className="mt-2.5 mb-4 text-[clamp(2rem,4.4vw,3.4rem)] font-bold leading-[1.02] tracking-[-0.04em]">{project.title}</h3>
                  <p className="mb-6 leading-[1.6] text-text-secondary">{project.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <span className="border border-border-soft px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.06em] text-text-secondary" key={item}>
                        {item}
                      </span>
                    ))}
                  </div>
                  <ProjectLinks demoUrl={project.demoUrl} repositoryUrl={project.repositoryUrl} />
                </div>
                <div className={`project-card group relative aspect-[16/10] cursor-pointer overflow-hidden border bg-bg-elevated transition duration-500 xl:aspect-[4/3] ${activeProject === index ? "xl:border-border-strong xl:ring-1 xl:ring-white/10" : "xl:border-border-soft"}`} data-index={index} role="img" aria-label={`${project.title} project preview`}>
                  <div className={`absolute inset-0 scale-[1.01] opacity-100 brightness-100 transition duration-700 group-hover:scale-[1.02] ${activeProject === index ? "xl:scale-[1.02] xl:opacity-100 xl:grayscale-0 xl:brightness-100" : "xl:opacity-72 xl:grayscale xl:brightness-[0.78]"}`}>
                    <Image src={project.image} alt={`${project.title} project preview`} fill sizes="(min-width: 1024px) 52vw, 100vw" className="object-cover" />
                    <div className="absolute inset-0 bg-bg-primary/10" aria-hidden="true" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
