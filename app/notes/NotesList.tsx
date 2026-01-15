'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Tag } from 'lucide-react';
import { Note } from '@/lib/notes';

type Props = {
  initialNotes: Note[];
};

export default function NotesList({ initialNotes }: Props) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNotes = initialNotes.filter((note) => {
    const query = searchQuery.toLowerCase();
    return (
      note.title.toLowerCase().includes(query) ||
      note.content.toLowerCase().includes(query) ||
      note.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  });

  return (
    <div className="space-y-8">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Cari catatan..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[0, 1, 2].map((columnIndex) => (
          <div key={columnIndex} className="space-y-4">
            {filteredNotes
              .filter((_, i) => i % 3 === columnIndex)
              .map((note) => (
                <Link
                  key={note.slug}
                  href={`/notes/${note.slug}`}
                  className="p-4 rounded-lg border bg-card hover:border-foreground/50 transition-colors group flex flex-col"
                >
                  <div className="mb-2">
                    <h3 className="font-bold text-lg mb-1 group-hover:text-accent transition-colors">
                      {note.title}
                    </h3>
                    <div className="text-xs text-muted-foreground mb-2">
                      <time dateTime={note.date}>
                        {new Date(note.date).toLocaleDateString('id-ID', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 grow">
                    {note.excerpt}
                  </p>

                  {note.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {note.tags.slice(0, 3).map((tag) => (
                        <button
                          key={tag}
                          onClick={(e) => {
                            e.preventDefault();
                            setSearchQuery(tag);
                          }}
                          className="text-xs bg-secondary px-2 py-1 rounded-md text-muted-foreground flex items-center gap-1 hover:bg-accent hover:text-accent-foreground transition-colors z-10"
                        >
                          <Tag className="w-3 h-3" />
                          {tag}
                        </button>
                      ))}
                    </div>
                  )}
                </Link>
              ))}
          </div>
        ))}
      </div>

      {filteredNotes.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          Tidak ada catatan yang ditemukan.
        </div>
      )}
    </div>
  );
}
