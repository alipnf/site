"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

type CodeCopyButtonProps = {
  code: string;
};

export function CodeCopyButton({ code }: CodeCopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      window.setTimeout(() => setIsCopied(false), 1800);
    } catch (error) {
      console.error("Failed to copy code", error);
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="border border-border-soft bg-bg-primary/90 p-2 text-text-muted opacity-0 transition group-hover:opacity-100 hover:border-border-strong hover:text-text-primary focus:opacity-100"
      aria-label="Copy code"
    >
      {isCopied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  );
}
