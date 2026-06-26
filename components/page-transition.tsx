"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { usePathname } from "next/navigation";
import { type PropsWithChildren, useEffect } from "react";

type TransitionPreset = {
  content: Variants;
  contentDuration: number;
};

const transitionPresets = {
  silk: {
    content: {
      initial: { opacity: 0, y: 8 },
      animate: { opacity: 1, y: 0 },
    },
    contentDuration: 0.62,
  },
  calm: {
    content: {
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
    },
    contentDuration: 0.42,
  },
  editorial: {
    content: {
      initial: { opacity: 0, y: 18, filter: "blur(6px)" },
      animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    },
    contentDuration: 0.52,
  },
  lift: {
    content: {
      initial: { opacity: 0, y: 28 },
      animate: { opacity: 1, y: 0 },
    },
    contentDuration: 0.45,
  },
  cut: {
    content: {
      initial: { opacity: 0, x: 18 },
      animate: { opacity: 1, x: 0 },
    },
    contentDuration: 0.36,
  },
} satisfies Record<string, TransitionPreset>;

const ACTIVE_TRANSITION: keyof typeof transitionPresets = "silk";
const ease = [0.16, 1, 0.3, 1] as const;

export function PageTransition({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const preset = transitionPresets[ACTIVE_TRANSITION];

  useEffect(() => {
    const hash = window.location.hash.slice(1);

    if (hash) {
      window.requestAnimationFrame(() => {
        document.getElementById(decodeURIComponent(hash))?.scrollIntoView({ block: "start", behavior: "auto" });
        if (window.location.pathname === "/") {
          window.history.replaceState(null, "", "/");
        }
      });
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, shouldReduceMotion]);

  if (shouldReduceMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div key={pathname} variants={preset.content} initial="initial" animate="animate" transition={{ duration: preset.contentDuration, ease }}>
      {children}
    </motion.div>
  );
}
