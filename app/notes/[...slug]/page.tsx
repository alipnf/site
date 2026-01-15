import { getNote } from '@/lib/notes';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { ChevronRight, Calendar, Tag } from 'lucide-react';
import Footer from '@/components/footer';

type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function NotePage(props: Props) {
  const params = await props.params;
  const note = getNote(params.slug);

  if (!note) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="mb-8">
        <Link
          href="/notes"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ChevronRight className="w-4 h-4 rotate-180" />
          Kembali ke Daftar Catatan
        </Link>

        <h1 className="text-4xl font-bold mb-4">{note.title}</h1>

        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-8">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <time dateTime={note.date}>
              {new Date(note.date).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>
          {note.tags.length > 0 && (
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4" />
              <div className="flex gap-2">
                {note.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-secondary px-2 py-0.5 rounded-md text-xs"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <article
        className="prose dark:prose-invert max-w-none mb-20
                prose-headings:font-bold prose-headings:text-foreground
                prose-p:text-muted-foreground
                prose-a:text-accent prose-a:no-underline hover:prose-a:underline
                prose-code:text-primary prose-code:bg-secondary prose-code:px-1 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none
                prose-pre:bg-secondary prose-pre:text-secondary-foreground
            "
      >
        <MDXRemote source={note.content} />
      </article>

      <Footer className="max-w-4xl" showLanguageToggle={false} />
    </div>
  );
}
