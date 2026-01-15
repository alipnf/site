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
  category: string;
  subcategory?: string;
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

        const parts = relativePath.split(path.sep);
        // Category is the top-level folder name
        const category = parts[0];
        // Subcategory is the second folder name if it exists and is not the file itself
        const subcategory = parts.length > 2 ? parts[1] : undefined;

        // Extract excerpt (first 150 chars or first paragraph)
        const plainContent = content
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
          title: data.title || path.basename(slug),
          date: data.created_at || new Date().toISOString(),
          tags: data.tags || [],
          content,
          excerpt,
          category,
          subcategory,
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

  // Category is the first part of the slug
  const category = slug[0];
  const subcategory = slug.length > 2 ? slug[1] : undefined;

  // Extract excerpt
  const plainContent = content
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
    title: data.title || slug[slug.length - 1],
    date: data.created_at || new Date().toISOString(),
    tags: data.tags || [],
    content,
    excerpt,
    category,
    subcategory,
  };
}
