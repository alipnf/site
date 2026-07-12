"use client";

import { notes } from "@/lib/home-data";
import { motion } from "motion/react";
import Link from "next/link";
import { ArrowIcon, ButtonLink, Container, Eyebrow, Section, SectionHeading, fadeUp, stagger } from "./ui";

const MotionLink = motion.create(Link);

export function Notes() {
  return (
    <Section id="notes" className="bg-bg-secondary">
      <Container>
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow index="06" label="Notes" />
            <SectionHeading>Technical Notes</SectionHeading>
          </div>
          <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="max-w-120 leading-[1.6] text-text-secondary">
            A collection of technical notes about frontend development, Linux, Git, PostgreSQL, TypeScript, and troubleshooting.
          </motion.p>
        </div>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {notes.map((note) => (
            <MotionLink variants={fadeUp} href={note.href} className="note-card flex flex-col gap-3.5 border border-border-soft bg-bg-elevated px-5.5 py-6.5 transition hover:-translate-y-1 hover:border-border-strong" key={note.title}>
              <div className="flex items-center justify-between">
                <span className="border border-border-soft px-2 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-text-muted">{note.tag}</span>
                <span className="font-mono text-[11px] text-text-muted">{note.date}</span>
              </div>
              <h3 className="text-[1.15rem] font-bold leading-[1.3] tracking-[-0.02em]">{note.title}</h3>
              <p className="flex-1 text-sm leading-[1.55] text-text-secondary">{note.excerpt}</p>
              <span className="self-end rounded-full border border-border-soft p-2 transition group-hover:border-text-primary">
                <ArrowIcon />
              </span>
            </MotionLink>
          ))}
        </motion.div>

        <div className="mt-12 flex justify-center">
          <ButtonLink href="/notes">
            Explore Notes
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
