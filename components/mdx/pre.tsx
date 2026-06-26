"use client";

import { Check, Copy } from "lucide-react";
import { type ComponentProps, useRef, useState } from "react";

export function Pre({ children, ...props }: ComponentProps<"pre">) {
  const [isCopied, setIsCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  async function handleCopy() {
    if (!preRef.current) return;

    try {
      await navigator.clipboard.writeText(preRef.current.innerText);
      setIsCopied(true);
      window.setTimeout(() => setIsCopied(false), 1800);
    } catch (error) {
      console.error("Failed to copy code", error);
    }
  }

  return (
    <div className="group relative my-7 overflow-hidden border border-border-soft bg-bg-elevated">
      <button
        type="button"
        onClick={handleCopy}
        className="absolute right-3 top-3 z-10 border border-border-soft bg-bg-primary/90 p-2 text-text-muted opacity-0 transition group-hover:opacity-100 hover:border-border-strong hover:text-text-primary focus:opacity-100"
        aria-label="Copy code"
      >
        {isCopied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      </button>
      <pre ref={preRef} {...props} className="m-0 overflow-x-auto p-5 font-mono text-sm leading-7 text-text-secondary">
        {children}
      </pre>
    </div>
  );
}
