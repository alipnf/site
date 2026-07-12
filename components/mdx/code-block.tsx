import { codeToHtml } from "shiki";
import { CodeCopyButton } from "./code-copy-button";

type CodeBlockProps = {
  code: string;
  language?: string;
};

const languageAliases: Record<string, string> = {
  js: "javascript",
  jsx: "jsx",
  plaintext: "text",
  sh: "bash",
  ts: "typescript",
  tsx: "tsx",
};

export async function CodeBlock({ code, language = "text" }: CodeBlockProps) {
  const normalizedLanguage = languageAliases[language] ?? language;
  const html = await codeToHtml(code.trimEnd(), {
    lang: normalizedLanguage,
    theme: "github-dark-default",
  });

  return (
    <div className="group relative my-7 overflow-hidden border border-border-soft bg-[#0d1117]">
      <div className="flex items-center justify-between border-b border-border-soft bg-bg-primary/70 px-4 py-2.5">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted">{language}</span>
        <CodeCopyButton code={code.trimEnd()} />
      </div>
      <div
        className="code-highlight overflow-x-auto text-sm leading-7 [&_code]:block [&_code]:w-max [&_pre]:!m-0 [&_pre]:min-w-full [&_pre]:!bg-transparent [&_pre]:!p-5 [&_pre]:font-mono [&_pre]:leading-7"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
