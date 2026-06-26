"use client";

import { motion } from "motion/react";
import { Container, Eyebrow, Section, SectionHeading, fadeUp, stagger } from "./ui";

const cards = [
  ["Focus", "React, Next.js, TypeScript"],
  ["Strength", "Responsive UI, reusable components, API integration"],
  ["Background", "Bachelor's degree in Informatics Engineering, Universitas Muria Kudus"],
  ["Writing", "Technical notes about frontend, Linux, Git, PostgreSQL, and troubleshooting"],
];

export function About() {
  return (
    <Section id="about">
      <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <Eyebrow index="01" label="About" />
          <SectionHeading className="mb-6">Snapshot of the builder behind the screen.</SectionHeading>
          <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-5 font-mono text-xs uppercase tracking-[0.08em] text-text-muted">
            Muhammad Alif Nur Firdaus / Indonesia
          </motion.p>
        </div>
        <div>
          <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="max-w-160 text-[1.05rem] leading-[1.65] tracking-[-0.01em] text-text-secondary">
            An Informatics Engineering graduate focused on building responsive, production-ready frontend interfaces from Figma designs, integrating REST APIs, managing client-side state, and collaborating with designers and backend engineers to deliver user-focused features.
          </motion.p>

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} className="mt-11 grid gap-px border border-border-soft bg-border-soft sm:grid-cols-2">
            {cards.map(([label, value]) => (
              <motion.div variants={fadeUp} className="bg-bg-elevated px-6 py-6 transition-colors hover:bg-[#141414]" key={label}>
                <span className="mb-2.5 block font-mono text-xs uppercase tracking-[0.12em] text-text-muted">{label}</span>
                <p className="text-[0.95rem] leading-normal text-text-primary">{value}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
