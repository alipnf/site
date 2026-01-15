import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import Footer from '@/components/footer';
import { getAllNotes } from '@/lib/notes';
import NotesList from './NotesList';

export default async function Notes() {
  const notes = getAllNotes();

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="mb-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ChevronRight className="w-4 h-4 rotate-180" />
          Kembali ke Beranda
        </Link>
        <h1 className="text-4xl font-bold mb-4">Catatan</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mb-8">
          Isinya yapping saya doang. CMIIW kalau nemu yang ngaco, lempar
          Issue/PR aja di{' '}
          <Link
            href="https://github.com/alipnf/site"
            className="text-accent hover:underline"
          >
            GitHub
          </Link>{' '}
          :))
        </p>

        <NotesList initialNotes={notes} />
      </div>

      <Footer className="max-w-4xl mt-20" showLanguageToggle={false} />
    </div>
  );
}
