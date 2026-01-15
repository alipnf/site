import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const NOTES_DIR = path.join(process.cwd(), 'content');

export type Note = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  content: string;
  excerpt: string;
};

export function getAllNotes(): Note[] {
  if (!fs.existsSync(NOTES_DIR)) {
    return [];
  }

  const notes: Note[] = [];

  function traverseDirectory(currentPath: string) {
    const items = fs.readdirSync(currentPath);

    for (const item of items) {
      const itemPath = path.join(currentPath, item);
      const stat = fs.statSync(itemPath);

      if (stat.isDirectory()) {
        traverseDirectory(itemPath);
      } else if (item.endsWith('.md') || item.endsWith('.mdx')) {
        const fileContent = fs.readFileSync(itemPath, 'utf-8');
        const { data, content } = matter(fileContent);

        // Calculate slug relative to NOTES_DIR
        const relativePath = path.relative(NOTES_DIR, itemPath);
        const slug = relativePath.replace(/\.mdx?$/, '');

        // Extract H1 title if not present in frontmatter
        let title = data.title;
        let finalContent = content;

        const h1Match = content.match(/^#\s+(.*)$/m);
        if (h1Match) {
          if (!title) {
            title = h1Match[1];
          }
          // Always remove the H1 from the content to avoid redundancy
          // Use regex that handles leading whitespace and multiline
          finalContent = content.replace(/^\s*#\s+.*$/m, '').trim();
        } else if (!title) {
          title = path.basename(slug);
        }

        // Extract excerpt (first 150 chars or first paragraph)
        const plainContent = finalContent
          .replace(/#+\s.*?\n/g, '') // Remove headers
          .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links
          .replace(/`{3}[\s\S]*?`{3}/g, '') // Remove code blocks
          .replace(/`([^`]+)`/g, '$1') // Remove inline code
          .replace(/(\*\*|__)(.*?)\1/g, '$2') // Remove bold
          .replace(/(\*|_)(.*?)\1/g, '$2') // Remove italics
          .replace(/^\s*[-*+]\s+/gm, '') // Remove list items
          .replace(/^\s*\d+\.\s+/gm, '') // Remove numbered lists
          .replace(/>\s+/g, '') // Remove blockquotes
          .trim();
        const excerpt =
          plainContent.slice(0, 150) + (plainContent.length > 150 ? '...' : '');

        notes.push({
          slug,
          title,
          date: data.created_at || new Date().toISOString(),
          tags: data.tags || [],
          content: finalContent,
          excerpt,
        });
      }
    }
  }

  traverseDirectory(NOTES_DIR);

  // Sort by date descending
  return notes.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getNote(slug: string[]): Note | null {
  if (!slug || slug.length === 0) return null;

  const slugPath = slug.join('/');
  const filePath = path.join(NOTES_DIR, `${slugPath}.md`);

  // Try .md first, then .mdx
  let finalPath = filePath;
  if (!fs.existsSync(finalPath)) {
    finalPath = path.join(NOTES_DIR, `${slugPath}.mdx`);
  }

  if (!fs.existsSync(finalPath)) {
    return null;
  }

  const fileContent = fs.readFileSync(finalPath, 'utf-8');
  const { data, content } = matter(fileContent);

  // Extract H1 title if not present in frontmatter
  let title = data.title;
  let finalContent = content;

  const h1Match = content.match(/^#\s+(.*)$/m);
  if (h1Match) {
    if (!title) {
      title = h1Match[1];
    }
    // Always remove the H1 from the content to avoid redundancy
    // Use regex that handles leading whitespace and multiline
    finalContent = content.replace(/^\s*#\s+.*$/m, '').trim();
  } else if (!title) {
    title = slug[slug.length - 1];
  }

  // Extract excerpt
  const plainContent = finalContent
    .replace(/#+\s.*?\n/g, '') // Remove headers
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links
    .replace(/`{3}[\s\S]*?`{3}/g, '') // Remove code blocks
    .replace(/`([^`]+)`/g, '$1') // Remove inline code
    .replace(/(\*\*|__)(.*?)\1/g, '$2') // Remove bold
    .replace(/(\*|_)(.*?)\1/g, '$2') // Remove italics
    .replace(/^\s*[-*+]\s+/gm, '') // Remove list items
    .replace(/^\s*\d+\.\s+/gm, '') // Remove numbered lists
    .replace(/>\s+/g, '') // Remove blockquotes
    .trim();
  const excerpt =
    plainContent.slice(0, 150) + (plainContent.length > 150 ? '...' : '');

  return {
    slug: slugPath,
    title,
    date: data.created_at || new Date().toISOString(),
    tags: data.tags || [],
    content: finalContent,
    excerpt,
  };
}

export function getRelatedNotes(currentSlug: string, tags: string[]): Note[] {
  if (!tags || tags.length === 0) return [];

  const allNotes = getAllNotes();

  return allNotes
    .filter((note) => {
      // Exclude current note
      if (note.slug === currentSlug) return false;
      // Check for matching tags
      return note.tags.some((tag) => tags.includes(tag));
    })
    .sort((a, b) => {
      // Sort by number of matching tags
      const aMatches = a.tags.filter((tag) => tags.includes(tag)).length;
      const bMatches = b.tags.filter((tag) => tags.includes(tag)).length;
      return bMatches - aMatches;
    })
    .slice(0, 3);
}
