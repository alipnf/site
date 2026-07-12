import NotesList from "./NotesList";
import { getAllNotes } from "@/lib/notes";
import { siteConfig } from "@/lib/site";
import type { Metadata } from "next";
import Link from "next/link";

const description = "Technical notes about frontend development, Linux, Git, PostgreSQL, TypeScript, and troubleshooting.";

export const metadata: Metadata = {
  title: "Notes",
  description,
  alternates: {
    canonical: "/notes",
  },
  openGraph: {
    title: "Notes | Alipnf",
    description,
    url: "/notes",
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: "Alipnf technical notes archive" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Notes | Alipnf",
    description,
    images: [siteConfig.ogImage],
  },
};

export default function NotesPage() {
  const notes = getAllNotes();

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary">
      <div className="bg-grid" />
      <div className="bg-noise" />
      <section className="relative z-[2] mx-auto w-full max-w-[1280px] px-5 py-10 sm:px-8 md:py-16">
        <Link href="/#notes" className="mb-14 inline-flex font-mono text-xs uppercase tracking-[0.14em] text-text-muted transition hover:text-text-primary">
          Back / Notes Section
        </Link>

        <div className="mb-14 grid gap-8 border-y border-border-soft py-10 lg:grid-cols-[1fr_0.65fr] lg:items-end">
          <div>
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.16em] text-text-muted">Notes Archive</p>
            <h1 className="max-w-4xl text-[clamp(2.6rem,6vw,6.4rem)] font-bold leading-[0.88] tracking-[-0.075em]">Technical Notes</h1>
          </div>
          <p className="max-w-xl text-base leading-7 text-text-secondary md:text-lg">
            Catatan teknis seputar frontend, Linux, Git, PostgreSQL, TypeScript, dan debugging. Beberapa isinya masih berupa learning log, jadi CMIIW kalau ada yang ngaco.
          </p>
        </div>

        <NotesList initialNotes={notes} />
      </section>
    </main>
  );
}
