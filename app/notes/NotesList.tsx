'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, FileText, Calendar, Tag } from 'lucide-react';
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

      <div className="grid gap-4 md:grid-cols-2">
        {filteredNotes.map((note) => (
          <Link
            key={note.slug}
            href={`/notes/${note.slug}`}
            className="block p-4 rounded-lg border bg-card hover:border-foreground/50 transition-colors group h-full flex flex-col"
          >
            <div className="mb-2">
              <h3 className="font-bold text-lg mb-1 group-hover:text-accent transition-colors flex items-center gap-2">
                <FileText className="w-4 h-4" />
                {note.title}
              </h3>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                <Calendar className="w-3 h-3" />
                <time dateTime={note.date}>
                  {new Date(note.date).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                {/* Optional: Show category/subcategory as a breadcrumb or badge if needed, 
                    but user asked for clean look. Maybe just tags are enough. 
                    Let's keep it simple as requested. */}
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-grow">
              {note.excerpt}
            </p>

            {note.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-auto">
                {note.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-secondary px-2 py-1 rounded-md text-muted-foreground flex items-center gap-1"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </Link>
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
