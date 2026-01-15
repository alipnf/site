---
id: metadata
aliases: []
tags:
  - nextjs
  - metadata
author: Alipnf
created_at: '2025-03-16'
---

# Metadata

## Static Metadata

Contoh penggunaan static metadata di `app/layout.tsx`:

```tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Belajar Next.js',
  description: 'Belajar Next.js cihuuuuuuuy',
};
```

Kita juga bisa pakai template untuk `title`:

```tsx
export const metadata: Metadata = {
  title: {
    template: '%s | Belajar Next.js',
    default: 'Untitled',
  },
  description: 'Belajar Next.js cihuuuuuuuy',
};
```

---

## Dynamic Metadata

Contoh metadata dinamis berdasarkan data dari server:

```tsx
import type { Metadata } from 'next';
import { PostData } from '@/app/type/Post';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPost(params.slug);
  return {
    title: post.slug,
    description: post.content,
  };
}

async function getPost(slug: string): Promise<PostData> {
  const res = await fetch(`http://localhost:3001/post/?slug=` + slug);
  const [post] = await res.json();
  return post;
}

export default async function DetailPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const postData = await getPost(params.slug);
  return (
    <div>
      <h2>{postData.title}</h2>
      <p>{postData.content}</p>
    </div>
  );
}
```

---

## File-based Metadata

Contohnya kayak `favicon.ico`, kalau ada gambar dengan nama itu di dalam folder
`/app`, maka otomatis bakal jadi icon tab browser.

Selain `favicon.ico`, file metadata lain yang juga bisa dipake secara otomatis
antara lain:

- `robots.txt` – buat ngatur akses bot crawler
- `sitemap.xml` – buat peta situs supaya SEO friendly
