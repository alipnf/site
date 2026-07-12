"use client";

import type { GitHubActivity as GitHubActivityItem, GitHubContributions } from "@/lib/github";
import { motion } from "motion/react";
import { ArrowIcon, Container, Eyebrow, Section, SectionHeading, fadeUp, stagger } from "./ui";

const contributionColors = ["bg-[#161b22]", "bg-[#0e4429]", "bg-[#006d32]", "bg-[#26a641]", "bg-[#39d353]"];

export function GitHubActivity({ activity, contributions }: { activity: GitHubActivityItem[]; contributions: GitHubContributions | null }) {
  if (activity.length === 0 && !contributions) return null;

  return (
    <Section id="github" className="bg-gradient-to-b from-bg-secondary to-bg-primary">
      <Container>
        <div className="mb-16 grid items-end gap-9 lg:grid-cols-[1fr_minmax(280px,440px)]">
          <div>
            <Eyebrow index="04" label="GitHub Activity" />
            <SectionHeading>Recent work, shipped in public.</SectionHeading>
          </div>
          <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="leading-[1.6] text-text-secondary">
            A focused log of public commits and pull requests from my GitHub profile.
          </motion.p>
        </div>

        {contributions ? (
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} className="mb-12 border border-border-soft bg-bg-elevated p-5 sm:p-7">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="block font-mono text-xs uppercase tracking-[0.12em] text-text-muted">Contribution Calendar</span>
                <span className="mt-2 block text-2xl font-bold tracking-[-0.04em] text-text-primary">{contributions.total.toLocaleString("en-US")} contributions</span>
              </div>
              <span className="font-mono text-xs uppercase tracking-[0.12em] text-text-muted">{contributions.year}</span>
            </div>
            <div className="overflow-x-auto pb-2">
              <div className="grid w-max grid-flow-col grid-rows-7 gap-1" aria-label={`${contributions.total} GitHub contributions in ${contributions.year}`}>
                {contributions.days.map((day) => (
                  <span
                    className={`h-2.5 w-2.5 rounded-[2px] sm:h-3 sm:w-3 ${contributionColors[day.level]}`}
                    key={day.date}
                    title={day.label}
                  />
                ))}
              </div>
            </div>
            <div className="mt-4 flex items-center justify-end gap-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-text-muted">
              <span>Less</span>
              {contributionColors.map((color) => (
                <span className={`h-2.5 w-2.5 rounded-[2px] ${color}`} key={color} />
              ))}
              <span>More</span>
            </div>
          </motion.div>
        ) : null}

        {activity.length > 0 ? (
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} className="border-t border-border-soft">
            {activity.map((item, index) => (
            <motion.a
              variants={fadeUp}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="group relative grid gap-4 border-b border-border-soft bg-[linear-gradient(90deg,rgba(255,255,255,0.035),transparent_55%)] py-6 transition hover:bg-[linear-gradient(90deg,rgba(255,255,255,0.06),transparent_65%)] lg:grid-cols-[72px_minmax(0,1fr)_auto] lg:items-center lg:hover:translate-x-2"
              key={`${item.repository}-${item.type}-${item.url}`}
            >
              <div className="absolute left-0 top-[-1px] h-px w-30 bg-text-primary opacity-0 transition-opacity group-hover:opacity-100" />
              <span className="font-mono text-xs text-text-muted">{String(index + 1).padStart(2, "0")}</span>
              <span className="min-w-0">
                <span className="mb-2 block font-mono text-xs uppercase tracking-[0.1em] text-text-secondary">{item.repository}</span>
                <span className="block break-words text-[clamp(1.2rem,2vw,1.65rem)] font-bold leading-[1.15] tracking-[-0.03em] text-text-primary">{item.summary}</span>
              </span>
              <span className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.1em] text-text-muted lg:justify-end">
                <span>{item.date}</span>
                <span className="border border-border-soft px-2 py-1 text-text-secondary">{item.type}</span>
                <span className="rounded-full border border-border-soft p-2 transition group-hover:border-text-primary group-hover:text-text-primary">
                  <ArrowIcon />
                </span>
              </span>
            </motion.a>
            ))}
          </motion.div>
        ) : null}

        <div className="mt-10 flex justify-center">
          <a
            href="https://github.com/alipnf"
            target="_blank"
            rel="noreferrer"
            className="border border-border-strong px-6 py-4 font-mono text-xs uppercase tracking-[0.1em] transition-colors hover:border-text-primary hover:bg-text-primary hover:!text-[#050505]"
          >
            View GitHub
          </a>
        </div>
      </Container>
    </Section>
  );
}
