import { CodeBlock } from "@/components/mdx/code-block";
import { JsonLd } from "@/components/json-ld";
import { getAdjacentNotes, getAllNotes, getNote, getReadingTime, getRelatedNotes } from "@/lib/notes";
import { siteConfig, siteUrl } from "@/lib/site";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MarkdownAsync, type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

type NotePageProps = {
  params: Promise<{ slug: string[] }>;
};

const markdownComponents: Components = {
  pre: ({ node, children }) => {
    void node;
    return <>{children}</>;
  },
  code: async ({ node, className, children, ...props }) => {
    void node;

    const code = String(children).replace(/\n$/, "");
    const language = /language-(\w+)/.exec(className ?? "")?.[1];

    if (language) {
      return <CodeBlock code={code} language={language} />;
    }

    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export function generateStaticParams() {
  return getAllNotes().map((note) => ({ slug: note.slug.split("/") }));
}

function cleanDescription(description: string) {
  return description.replace(/\s+/g, " ").trim().slice(0, 160);
}

export async function generateMetadata({ params }: NotePageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = getNote(slug);

  if (!note) {
    return { title: "Note not found" };
  }

  const description = cleanDescription(note.excerpt);
  const url = `/notes/${note.slug}`;
  const ogImage = `/notes-og/${note.slug}`;

  return {
    title: note.title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${note.title} | Alipnf`,
      description,
      url,
      siteName: siteConfig.name,
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${note.title} note preview` }],
      type: "article",
      publishedTime: note.date,
      tags: note.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: `${note.title} | Alipnf`,
      description,
      images: [ogImage],
    },
  };
}

export default async function NotePage({ params }: NotePageProps) {
  const { slug } = await params;
  const note = getNote(slug);

  if (!note) {
    notFound();
  }

  const relatedNotes = getRelatedNotes(note.slug, note.tags);
  const adjacentNotes = getAdjacentNotes(note.slug);
  const readingTime = getReadingTime(note.content);
  const description = cleanDescription(note.excerpt);
  const noteUrl = `${siteUrl}/notes/${note.slug}`;
  const noteOgImage = `${siteUrl}/notes-og/${note.slug}`;

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: note.title,
          description,
          datePublished: note.date,
          dateModified: note.date,
          url: noteUrl,
          mainEntityOfPage: noteUrl,
          image: noteOgImage,
          keywords: note.tags,
          author: {
            "@type": "Person",
            name: siteConfig.author,
            url: siteConfig.url,
          },
          publisher: {
            "@type": "Person",
            name: siteConfig.author,
            url: siteConfig.url,
          },
        }}
      />
      <div className="bg-grid" />
      <div className="bg-noise" />
      <article className="relative z-[2] mx-auto w-full max-w-4xl px-5 py-10 sm:px-8 md:py-16">
        <Link href="/notes" className="mb-12 inline-flex font-mono text-xs uppercase tracking-[0.14em] text-text-muted transition hover:text-text-primary">
          Back / Notes
        </Link>

        <header className="border-y border-border-soft py-10">
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.16em] text-text-muted">{note.slug}</p>
          <h1 className="text-[clamp(2.8rem,8vw,6.8rem)] font-bold leading-[0.88] tracking-[-0.075em]">{note.title}</h1>
          <div className="mt-8 flex flex-wrap items-center gap-3 text-text-muted">
            <time className="font-mono text-xs uppercase tracking-[0.12em]" dateTime={note.date}>
              {formatDate(note.date)}
            </time>
            <span className="font-mono text-xs uppercase tracking-[0.12em]">/</span>
            <span className="font-mono text-xs uppercase tracking-[0.12em]">{readingTime.label}</span>
            {note.tags.map((tag) => (
              <span key={tag} className="border border-border-soft px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em]">
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div
          className="mt-12 max-w-none text-text-secondary
            [&_a]:text-text-primary [&_a]:underline [&_a]:decoration-border-strong [&_a]:underline-offset-4 [&_a:hover]:decoration-text-primary
            [&_blockquote]:border-l [&_blockquote]:border-border-strong [&_blockquote]:pl-5 [&_blockquote]:text-text-primary
            [&_h2]:mb-4 [&_h2]:mt-12 [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:tracking-[-0.04em] [&_h2]:text-text-primary
            [&_h3]:mb-3 [&_h3]:mt-9 [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:tracking-[-0.03em] [&_h3]:text-text-primary
            [&_li]:my-2 [&_li>code]:border [&_li>code]:border-border-soft [&_li>code]:bg-bg-elevated [&_li>code]:px-1.5 [&_li>code]:py-0.5 [&_li>code]:font-mono [&_li>code]:text-[0.9em] [&_li>code]:text-text-primary
            [&_ol]:my-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:my-5 [&_p]:leading-8 [&_p>code]:border [&_p>code]:border-border-soft [&_p>code]:bg-bg-elevated [&_p>code]:px-1.5 [&_p>code]:py-0.5 [&_p>code]:font-mono [&_p>code]:text-[0.9em] [&_p>code]:text-text-primary
            [&_strong]:text-text-primary [&_ul]:my-5 [&_ul]:list-disc [&_ul]:pl-6"
        >
          <MarkdownAsync remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {note.content}
          </MarkdownAsync>
        </div>

        {(adjacentNotes.previous || adjacentNotes.next) && (
          <nav className="mt-20 grid gap-4 border-y border-border-soft py-6 md:grid-cols-2" aria-label="Note navigation">
            {adjacentNotes.previous ? (
              <Link href={`/notes/${adjacentNotes.previous.slug}`} className="group border border-border-soft bg-bg-elevated p-5 transition hover:-translate-y-1 hover:border-border-strong">
                <span className="mb-4 block font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted">Previous Note</span>
                <span className="block text-xl font-bold leading-tight tracking-[-0.03em] text-text-primary group-hover:text-white">{adjacentNotes.previous.title}</span>
                <span className="mt-3 block line-clamp-2 text-sm leading-6 text-text-secondary">{adjacentNotes.previous.excerpt}</span>
              </Link>
            ) : (
              <div className="hidden md:block" />
            )}

            {adjacentNotes.next ? (
              <Link href={`/notes/${adjacentNotes.next.slug}`} className="group border border-border-soft bg-bg-elevated p-5 transition hover:-translate-y-1 hover:border-border-strong md:text-right">
                <span className="mb-4 block font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted">Next Note</span>
                <span className="block text-xl font-bold leading-tight tracking-[-0.03em] text-text-primary group-hover:text-white">{adjacentNotes.next.title}</span>
                <span className="mt-3 block line-clamp-2 text-sm leading-6 text-text-secondary">{adjacentNotes.next.excerpt}</span>
              </Link>
            ) : null}
          </nav>
        )}

        {relatedNotes.length > 0 && (
          <aside className="mt-20 border-t border-border-soft pt-10">
            <h2 className="mb-6 font-mono text-xs uppercase tracking-[0.16em] text-text-muted">Related Notes</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {relatedNotes.map((relatedNote) => (
                <Link key={relatedNote.slug} href={`/notes/${relatedNote.slug}`} className="border border-border-soft bg-bg-elevated p-4 transition hover:-translate-y-1 hover:border-border-strong">
                  <h3 className="font-bold leading-tight tracking-[-0.02em] text-text-primary">{relatedNote.title}</h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-text-secondary">{relatedNote.excerpt}</p>
                </Link>
              ))}
            </div>
          </aside>
        )}
      </article>
    </main>
  );
}
