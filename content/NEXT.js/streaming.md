---
id: streaming
aliases: []
tags:
  - nextjs
  - streaming
author: Alipnf
created_at: '2025-05-13'
---

# Streaming di Next.js

Ketika sebuah halaman membutuhkan waktu lama untuk _fetching_ data, kita bisa
memberikan efek loading agar pengalaman pengguna tetap nyaman.

## Streaming Tingkat Halaman

Next.js menyediakan cara mudah untuk menampilkan loading saat data sedang
dimuat. Cukup buat file `loading.tsx` di dalam folder route yang sesuai.

Contoh

```tsx
// app/posts/[slug]/loading.tsx
export default function Loading() {
  return <div>Loading...</div>;
}
```

File `loading.tsx` akan otomatis ditampilkan saat halaman `DetailPostPage` masih
dalam proses _fetching_ data.

### Simulasi Fetching Data Lama

Untuk melihat efek loading secara nyata, kita bisa mensimulasikan delay dengan
`setTimeout`.

Contoh

```tsx
export default async function DetailPostPage({
  params,
}: {
  params: { slug: string };
}) {
  // Simulasi loading selama 5 detik
  await new Promise((resolve) => setTimeout(resolve, 5000));

  const postData = await getPost(params.slug);

  return (
    <div>
      <h2>{postData.title}</h2>
      <p>{postData.content}</p>
    </div>
  );
}
```

## Streaming komponen spesifik

Mari buat file baru

```tsx
// content.tsx
async function fakeDelay() {
  await new Promise((resolve) => setTimeout(resolve, 5000));
}
export default async function Content() {
  await fakeDelay();
  return <div>ngetes loading</div>;
}
```

Tambahkan komponen di `page.tsx`

```tsx
import { PostData } from '@/app/type/Post';
import type { Metadata } from 'next';
import Content from './content';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPost(params.slug);
  return { title: post.slug, description: post.content };
}

async function getPost(slug: string): Promise<PostData> {
  const res = await fetch(`http://localhost:3001/post/?slug=` + slug);
  const [post] = await res.json();
  return post;
}

export default async function DetailPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  const { slug } = await params;
  const postData = await getPost(slug);

  return (
    <div>
      ini detailnya
      <h2>{postData.title}</h2>
      <p>{postData.content}</p>
      <Content />
    </div>
  );
}
```

Nah, ketika dicoba kembali, komponen `content.tsx` menyebabkan semua menjadi
loading. Hal ini disebabkan `loading.tsx` juga berlaku di bawah direktori yang
sama.

Kita coba membungkus dengan `Suspense`

```tsx
import { PostData } from '@/app/type/Post';
import type { Metadata } from 'next';
import Content from './content';
import { Suspense } from 'react';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPost(params.slug);
  return { title: post.slug, description: post.content };
}

async function getPost(slug: string): Promise<PostData> {
  const res = await fetch(`http://localhost:3001/post/?slug=` + slug);
  const [post] = await res.json();
  return post;
}

export default async function DetailPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  const { slug } = await params;
  const postData = await getPost(slug);

  return (
    <div>
      ini detailnya
      <h2>{postData.title}</h2>
      <p>{postData.content}</p>
      <Suspense fallback={<p>loading content</p>}>
        <Content />
      </Suspense>
    </div>
  );
}
```

Nah, jadi selain komponen `Content` di-_preview_ dahulu sembari komponen
`Content` selesai di-_fetching_.
