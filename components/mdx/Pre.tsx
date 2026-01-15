'use client';

import { useState, useRef, ComponentProps } from 'react';
import { Check, Copy } from 'lucide-react';

export default function Pre({ children, ...props }: ComponentProps<'pre'>) {
  const [isCopied, setIsCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const handleCopy = async () => {
    if (preRef.current) {
      const code = preRef.current.innerText;
      try {
        await navigator.clipboard.writeText(code);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  return (
    <div className="relative group my-6 rounded-lg bg-secondary border border-border/50">
      <button
        onClick={handleCopy}
        className="absolute right-2 top-2 p-1.5 rounded-md bg-background/80 hover:bg-background text-muted-foreground hover:text-foreground transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 border border-border/50 z-10"
        aria-label="Copy code"
      >
        {isCopied ? (
          <Check className="w-3.5 h-3.5 text-green-500" />
        ) : (
          <Copy className="w-3.5 h-3.5" />
        )}
      </button>
      <div className="p-4 overflow-visible">
        <pre
          ref={preRef}
          {...props}
          className="!m-0 !p-0 !bg-transparent font-mono text-sm whitespace-pre-wrap break-words overflow-visible"
        >
          {children}
        </pre>
      </div>
    </div>
  );
}
