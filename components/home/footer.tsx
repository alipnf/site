"use client";

import { motion, useReducedMotion } from "motion/react";
import { Container } from "./ui";
import { fadeUp, stagger } from "./ui";

export function Footer() {
  const reduceMotion = useReducedMotion();

  return (
    <footer className="relative z-[2] bg-footer-bg pt-35" id="contact">
      <Container>
        <motion.h2 variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} className="mb-9 text-[clamp(2.4rem,7vw,6rem)] font-bold leading-[1.02] tracking-[-0.05em] sm:leading-[0.98]">
          {["LET'S BUILD", "CLEAN INTERFACES", "TOGETHER."].map((line) => (
            <span className="block overflow-hidden py-0.5" key={line}>
              <motion.span
                variants={
                  reduceMotion
                    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
                    : { hidden: { y: "110%" }, visible: { y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } } }
                }
                className="block"
              >
                {line}
              </motion.span>
            </span>
          ))}
        </motion.h2>
        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-14 max-w-130 leading-[1.6] text-text-secondary">
          Available for frontend developer opportunities, internships, freelance projects, and collaboration.
        </motion.p>

        <div className="grid gap-10 pb-16 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr]">
          <div>
            <div className="mb-2.5 text-2xl font-bold tracking-[-0.04em]">alipnf</div>
            <div className="font-mono text-xs uppercase tracking-[0.08em] text-text-muted">Frontend Developer</div>
          </div>
          <FooterCol title="Socials" items={[{ href: "https://github.com/alipnf", label: "GitHub" }, { href: "https://linkedin.com/in/alipnf", label: "LinkedIn" }]} />
          <FooterCol title="Contact" items={[{ href: "mailto:alipnf@proton.me", label: "alipnf@proton.me" }, { href: "/cv/alipnf_cv.pdf", label: "Download CV" }]} />
        </div>
      </Container>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  return (
    <div>
      <span className="mb-4.5 block font-mono text-xs uppercase tracking-[0.12em] text-text-muted">{title}</span>
      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <li key={item.href}>
            <a href={item.href} className="footer-link text-[0.95rem] text-text-secondary hover:text-text-primary" target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
