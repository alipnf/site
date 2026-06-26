import fs from "fs";
import matter from "gray-matter";
import path from "path";

const NOTES_DIR = path.join(process.cwd(), "content");

export type Note = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  content: string;
  excerpt: string;
};

export type AdjacentNotes = {
  previous: Note | null;
  next: Note | null;
};

function readNoteFile(filePath: string, slug: string): Note {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  let title = typeof data.title === "string" ? data.title : "";
  let finalContent = content;
  const h1Match = content.match(/^#\s+(.*)$/m);

  if (h1Match) {
    title ||= h1Match[1];
    finalContent = content.replace(/^\s*#\s+.*$/m, "").trim();
  }

  if (!title) {
    title = path.basename(slug);
  }

  const plainContent = finalContent
    .replace(/#+\s.*?\n/g, "")
    .replace(/\[(.*?)\]\(.*?\)/g, "$1")
    .replace(/`{3}[\s\S]*?`{3}/g, "")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/(\*\*|__)(.*?)\1/g, "$2")
    .replace(/(\*|_)(.*?)\1/g, "$2")
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/^\s*\d+\.\s+/gm, "")
    .replace(/>\s+/g, "")
    .trim();

  const excerpt = plainContent.slice(0, 150) + (plainContent.length > 150 ? "..." : "");

  return {
    slug,
    title,
    date: typeof data.created_at === "string" ? data.created_at : new Date().toISOString(),
    tags: Array.isArray(data.tags) ? data.tags : [],
    content: finalContent,
    excerpt,
  };
}

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
        continue;
      }

      if (!item.endsWith(".md") && !item.endsWith(".mdx")) {
        continue;
      }

      const relativePath = path.relative(NOTES_DIR, itemPath);
      const slug = relativePath.replace(/\.mdx?$/, "");

      notes.push(readNoteFile(itemPath, slug));
    }
  }

  traverseDirectory(NOTES_DIR);

  return notes.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getNote(slug: string[]): Note | null {
  if (!slug.length) {
    return null;
  }

  const slugPath = slug.join("/");
  const markdownPath = path.join(NOTES_DIR, `${slugPath}.md`);
  const mdxPath = path.join(NOTES_DIR, `${slugPath}.mdx`);
  const filePath = fs.existsSync(markdownPath) ? markdownPath : mdxPath;

  if (!fs.existsSync(filePath)) {
    return null;
  }

  return readNoteFile(filePath, slugPath);
}

export function getRelatedNotes(currentSlug: string, tags: string[]): Note[] {
  if (!tags.length) {
    return [];
  }

  return getAllNotes()
    .filter((note) => note.slug !== currentSlug && note.tags.some((tag) => tags.includes(tag)))
    .sort((a, b) => {
      const aMatches = a.tags.filter((tag) => tags.includes(tag)).length;
      const bMatches = b.tags.filter((tag) => tags.includes(tag)).length;
      return bMatches - aMatches;
    })
    .slice(0, 3);
}

export function getReadingTime(content: string) {
  const plainText = content
    .replace(/`{3}[\s\S]*?`{3}/g, "")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/<[^>]*>/g, "")
    .replace(/[#>*_[\]()~`-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const wordCount = plainText ? plainText.split(" ").length : 0;
  const minutes = Math.max(1, Math.ceil(wordCount / 200));

  return {
    minutes,
    label: `${minutes} min read`,
    wordCount,
  };
}

export function getAdjacentNotes(currentSlug: string): AdjacentNotes {
  const notes = getAllNotes();
  const currentIndex = notes.findIndex((note) => note.slug === currentSlug);

  if (currentIndex === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: notes[currentIndex + 1] ?? null,
    next: notes[currentIndex - 1] ?? null,
  };
}
