"use client";

import type { Note } from "@/lib/notes";
import Link from "next/link";
import { useDeferredValue, useState } from "react";

type NotesListProps = {
  initialNotes: Note[];
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export default function NotesList({ initialNotes }: NotesListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const deferredQuery = useDeferredValue(searchQuery.trim().toLowerCase());

  const filteredNotes = initialNotes.filter((note) => {
    if (!deferredQuery) return true;

    return (
      note.title.toLowerCase().includes(deferredQuery) ||
      note.content.toLowerCase().includes(deferredQuery) ||
      note.tags.some((tag) => tag.toLowerCase().includes(deferredQuery))
    );
  });

  return (
    <div className="space-y-10">
      <div className="grid gap-4 border border-border-soft bg-bg-elevated/70 p-4 md:grid-cols-[1fr_auto] md:items-center">
        <label className="sr-only" htmlFor="notes-search">
          Cari catatan
        </label>
        <input
          id="notes-search"
          type="search"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Cari catatan, tag, atau isi..."
          className="w-full border border-border-soft bg-bg-primary px-4 py-3 font-mono text-sm text-text-primary outline-none transition placeholder:text-text-muted focus:border-border-strong"
        />
        <span className="font-mono text-xs uppercase tracking-[0.12em] text-text-muted">
          {filteredNotes.length} / {initialNotes.length} notes
        </span>
      </div>

      <div className="columns-1 gap-5 md:columns-2 xl:columns-3">
        {filteredNotes.map((note, index) => (
          <Link
            href={`/notes/${note.slug}`}
            key={note.slug}
            className="group mb-5 inline-block w-full break-inside-avoid border border-border-soft bg-bg-elevated p-5 align-top transition duration-300 hover:-translate-y-1 hover:border-border-strong hover:bg-highlight"
          >
            <div className="mb-8 flex items-start justify-between gap-4">
              <span className="font-mono text-xs text-text-muted">{String(index + 1).padStart(2, "0")}</span>
              <time className="font-mono text-[11px] uppercase tracking-[0.1em] text-text-muted" dateTime={note.date}>
                {formatDate(note.date)}
              </time>
            </div>

            <h2 className="text-2xl font-bold leading-tight tracking-[-0.04em] text-text-primary transition group-hover:text-white">{note.title}</h2>
            <p className="mt-4 text-sm leading-6 text-text-secondary">{note.excerpt}</p>

            {note.tags.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2">
                {note.tags.slice(0, 3).map((tag) => (
                  <button
                    type="button"
                    key={tag}
                    onClick={(event) => {
                      event.preventDefault();
                      setSearchQuery(tag);
                    }}
                    className="min-h-11 border border-border-soft px-3 py-2 font-mono text-[10px] uppercase tracking-[0.1em] text-text-muted transition hover:border-border-strong hover:text-text-primary"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </Link>
        ))}
      </div>

      {filteredNotes.length === 0 && (
        <div className="border border-border-soft bg-bg-elevated p-10 text-center text-text-secondary">Tidak ada catatan yang cocok.</div>
      )}
    </div>
  );
}
