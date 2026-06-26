import { motion, type Variants } from "motion/react";
import Link from "next/link";
import type { PropsWithChildren } from "react";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 34 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};

export const softFadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
};

export const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } },
};

export function Container({ children, className = "" }: PropsWithChildren<{ className?: string }>) {
  return <div className={`mx-auto w-full max-w-[1280px] px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Section({ children, className = "", id }: PropsWithChildren<{ className?: string; id?: string }>) {
  return (
    <section id={id} className={`relative z-[2] py-24 md:py-35 ${className}`}>
      {children}
    </section>
  );
}

export function Eyebrow({ index, label }: { index: string; label: string }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <span className="font-mono text-xs text-text-muted">{index}</span>
      <span className="h-px max-w-16 flex-1 bg-border-strong" />
      <span className="font-mono text-xs uppercase tracking-[0.14em] text-text-muted">{label}</span>
    </div>
  );
}

export function SectionHeading({ children, className = "" }: PropsWithChildren<{ className?: string }>) {
  return (
    <motion.h2
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      className={`text-[clamp(2.4rem,5.2vw,4.6rem)] font-bold leading-[0.95] tracking-[-0.05em] ${className}`}
    >
      {children}
    </motion.h2>
  );
}

export function ButtonLink({ children, className = "", href, variant = "ghost" }: PropsWithChildren<{ className?: string; href: string; variant?: "primary" | "ghost" }>) {
  const variantClass =
    variant === "primary"
      ? "border-text-primary bg-text-primary !text-[#050505] hover:bg-transparent hover:!text-text-primary"
      : "hover:border-text-primary hover:bg-text-primary hover:!text-[#050505]";
  const linkClass = `border border-border-strong px-6 py-4 font-mono text-xs uppercase tracking-[0.1em] transition-colors duration-300 ease-out ${variantClass} ${className}`;

  if (href.startsWith("/") && !href.startsWith("/cv/")) {
    return (
      <Link href={href} className={linkClass}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={linkClass}
    >
      {children}
    </a>
  );
}

export function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 17L17 7M9 7h8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
