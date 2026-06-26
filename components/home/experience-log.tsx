"use client";

import { experience } from "@/lib/home-data";
import { motion } from "motion/react";
import { Container, Eyebrow, Section, SectionHeading, fadeUp, stagger } from "./ui";

export function ExperienceLog() {
  return (
    <Section id="journey" className="bg-gradient-to-b from-bg-primary to-bg-secondary">
      <Container>
        <div className="mb-16 grid items-end gap-9 lg:grid-cols-[1fr_minmax(280px,440px)]">
          <div>
            <Eyebrow index="03" label="Experience" />
            <SectionHeading>Experience Log</SectionHeading>
          </div>
          <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="leading-[1.6] text-text-secondary">
            A compact record of frontend internships, team-based training, and Informatics Engineering education.
          </motion.p>
        </div>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} className="border-t border-border-soft">
          {experience.map((item, index) => (
            <motion.article
              variants={fadeUp}
              className="group relative grid gap-6 border-b border-border-soft bg-[linear-gradient(90deg,rgba(255,255,255,0.035),transparent_55%)] py-7 transition hover:translate-x-0 hover:bg-[linear-gradient(90deg,rgba(255,255,255,0.06),transparent_65%)] md:grid-cols-[72px_150px_1fr] lg:hover:translate-x-2"
              key={`${item.period}-${item.title}`}
            >
              <div className="absolute left-0 top-[-1px] h-px w-30 bg-text-primary opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="font-mono text-xs text-text-muted">{String(index + 1).padStart(2, "0")}</div>
              <div className="max-w-30 font-mono text-[13px] uppercase tracking-[0.1em] text-text-primary md:max-w-none">{item.period}</div>
              <div>
                <div className="mb-4 flex items-start justify-between gap-5 max-sm:flex-col">
                  <div>
                    <h3 className="mb-2 text-[clamp(1.35rem,2.2vw,2rem)] font-bold leading-[1.08] tracking-[-0.035em]">{item.title}</h3>
                    <span className="block font-mono text-xs uppercase tracking-[0.08em] text-text-secondary">{item.org}</span>
                  </div>
                </div>
                <p className="max-w-180 leading-[1.65] text-text-secondary">{item.desc}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {item.stack.map((stack) => (
                    <span className="border border-border-soft px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-text-secondary" key={stack}>
                      {stack}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
