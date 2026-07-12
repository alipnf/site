"use client";

import { skills } from "@/lib/home-data";
import { motion } from "motion/react";
import { Container, Eyebrow, Section, SectionHeading, fadeUp, stagger } from "./ui";
import { Marquee } from "./marquee";

export function Skills() {
  return (
    <Section id="skills">
      <Container>
        <Eyebrow index="05" label="Skills System" />
        <SectionHeading className="mb-14">A technical index, not a sticker sheet.</SectionHeading>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} className="grid gap-px border border-border-soft bg-border-soft sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((skill) => (
            <motion.div variants={fadeUp} className="bg-bg-elevated px-6 py-8 transition hover:-translate-y-0.5 hover:bg-[#141414]" key={skill.label}>
              <span className="mb-4 block font-mono text-xs uppercase tracking-[0.12em] text-text-muted">{skill.label}</span>
              <div className="text-[1.15rem] font-semibold leading-normal tracking-[-0.02em] text-text-primary">{skill.names}</div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-12">
          <Marquee compact />
        </div>
      </Container>
    </Section>
  );
}
