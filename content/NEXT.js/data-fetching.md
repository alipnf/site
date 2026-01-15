---
id: data-fetching
aliases: []
tags:
  - nextjs
  - fetch
  - cache
author: Alipnf
created_at: '2025-05-06'
---

# Data Fetching

## Setup Backend

Sebelum melakukan data fetching, siapkan backend sederhana menggunakan **JSON
Server** dengan langkah berikut:

- Buat file `database.json` dengan konten:

```json
{
  "post": [
    {
      "id": "1",
      "title": "post 1",
      "slug": "post-1",
      "content": "content post 1"
    },
    {
      "id": "2",
      "title": "post 2",
      "slug": "post-2",
      "content": "content post 2"
    },
    {
      "id": "3",
      "title": "post 3",
      "slug": "post-3",
      "content": "content post 3"
    }
  ]
}
```

- Jalankan JSON Server:

```bash
npx json-server ./database.json -p 3001
```

Backend akan tersedia di `http://localhost:3001` dengan endpoint `/post`.

> **Catatan**:
>
> - Port `3001` digunakan untuk menghindari konflik dengan Next.js dev server
>   (default port `3000`).
> - Endpoint `/post` sesuai dengan kunci `"post"` di `database.json`.

---

## Data Fetching di Next.js

### Konteks App Router (Next.js 13+)

Contoh ini menggunakan **App Router** (versi Next.js 13+). Untuk Pages Router
(versi lama), pendekatan berbeda diperlukan (misalnya `getServerSideProps`).

### Contoh Kode

```tsx
import { PostData } from '@/app/type/Post';
import Link from 'next/link';

// Fungsi fetching dengan error handling
async function getPost(): Promise<PostData[]> {
  const res = await fetch('http://localhost:3001/post');

  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }

  return res.json();
}

export default async function PostPage() {
  try {
    const posts = await getPost();

    return (
      <div>
        <h1>Posts</h1>
        {posts.map((post) => (
          <article key={post.id}>
            <Link href={`/post/${post.slug}`}>{post.title}</Link>
          </article>
        ))}
      </div>
    );
  } catch (error) {
    return <div>Error loading posts</div>;
  }
}
```

### Tipe Data

```ts
// @/app/type/Post
export type PostData = {
  id: string;
  title: string;
  slug: string;
  content: string;
};
```

---

## Catatan Penting

1. **Error Handling**  
   Tambahkan penanganan kesalahan dengan `try/catch` untuk menghindari crash
   server jika permintaan gagal.

2. **Caching Otomatis**  
   Di Next.js, `fetch` dalam server component secara otomatis **dihapus dari
   cache**. Untuk data dinamis, gunakan `revalidate`:

   ```tsx
   fetch('http://localhost:3001/post', { next: { revalidate: 60 } });
   ```

3. **Rute Dinamis**  
   Pastikan halaman detail tersedia di `app/post/[slug]/page.tsx`:

   ```tsx
   // app/post/[slug]/page.tsx
   import { PostData } from '@/app/type/Post';

   async function getPostBySlug(slug: string): Promise<PostData> {
     const res = await fetch(`http://localhost:3001/post?slug=${slug}`);
     const [post] = await res.json();
     return post;
   }

   export default async function PostDetail({
     params,
   }: {
     params: { slug: string };
   }) {
     const post = await getPostBySlug(params.slug);

     return (
       <div>
         <h1>{post.title}</h1>
         <p>{post.content}</p>
       </div>
     );
   }
   ```

4. **Konfigurasi Produksi**  
   Ganti `http://localhost:3001` dengan URL backend sebenarnya saat deployment.

5. **Struktur Proyek**  
   Pastikan jalur `@/app/type/Post` sesuai dengan konfigurasi `tsconfig.json`
   Anda.

---

## Cache di Next.js

### Bagaimana Cache Bekerja?

Di Next.js, `fetch` dalam server component secara default **dihapus dari
cache**. Namun, Anda bisa mengontrol perilaku cache dengan opsi berikut:

### 1. **Revalidate (ISR)**

Gunakan `revalidate` untuk memperbarui cache secara berkala:

```tsx
fetch('http://localhost:3001/post', { next: { revalidate: 60 } });
```

- `60` = cache diperbarui setiap 60 detik.
- Berguna untuk data semi-statik (misalnya blog, produk).

### 2. **No Store (No Cache)**

Gunakan `no-store` untuk data sensitif atau selalu berubah:

```tsx
fetch('http://localhost:3001/post', { cache: 'no-store' });
```

- Cocok untuk data pengguna, dashboard, atau API yang sering berubah.

### 3. **Default Cache**

Jika tidak menentukan opsi, Next.js akan menggunakan cache default:

```tsx
fetch('http://localhost:3001/post');
```

- Data akan di-cache selamanya hingga server restart.

### 4. **Cache di Client Components**

Di client components, gunakan `useEffect` atau library seperti SWR/React Query
untuk mengelola cache:

```tsx
useEffect(() => {
  fetch('/api/data')
    .then((res) => res.json())
    .then(setData);
}, []);
```

## Best Practices

1. **Gunakan Revalidate untuk Data Dinamis**

   - Contoh: `next: { revalidate: 60 }` untuk artikel yang sering diperbarui.

2. **Hindari `any` dengan Type Safety**

   - Gunakan `as T` atau casting eksplisit:

     ```ts
     const data = (await res.json()) as PostData[];
     ```

3. **Testing di Lingkungan Produksi**
   - Pastikan cache tidak menyebabkan data usang di lingkungan produksi.

## Data Fetching di Client Component

Jika ada kondisi tertentu yang mengharuskan interaksi dinamis (misalnya klik
tombol, polling), maka kamu bisa melakukan fetching di client side.

Namun, kamu harus ingat bahwa:

> ❗ Client Components **tidak boleh async**, jadi kamu tidak bisa langsung
> menggunakan `await`.

### Salah: Async di Client Component

```tsx
'use client';

export async function Header() {
  const setting = await getSetting(); // ❌ ERROR!
  return <div>{setting.sitename}</div>;
}
```

Error:

`<Header> is an async Client Component. Only Server Components can be async.`

---

## Solusi: Pisahkan Logika Server & Client

### 1. Server Component: Kirim Promise

```tsx
// components/Header.tsx
import SiteName from './SiteName';
import { getSetting } from './queries/getSetting';

export default function Header() {
  const settingPromise = getSetting(); // Jangan await

  return <SiteName settingPromise={settingPromise} />;
}
```

### 2. Client Component: Gunakan `use()` untuk baca Promise

```tsx
// components/SiteName.tsx
'use client';
import { use } from 'react';
import { Setting } from './type/Setting';

export default function SiteName({
  settingPromise,
}: {
  settingPromise: Promise<Setting>;
}) {
  const setting = use(settingPromise); // Baca promise

  return <div>Ini nama situs: {setting.sitename}</div>;
}
```

### 3. Wrap dengan `<Suspense>` di `page.tsx`

```tsx
// app/page.tsx
import { Header } from '../components/Header';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback="Loading...">
      <Header />
    </Suspense>
  );
}
```

> 💡 Ini adalah pola terbaik jika kamu ingin tetap menggunakan **SSR/ISR** tapi
> tetap punya komponen interaktif di client side.

---

## Alternatif: Gunakan SWR / React Query

Kalau kamu butuh fitur tambahan seperti caching, polling, deduplikasi, gunakan
library seperti **SWR** atau **React Query**.

Contoh dengan SWR:

```tsx
// components/SiteNameWithSWR.tsx
'use client';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function SiteNameWithSWR() {
  const { data, error } = useSWR('/api/setting', fetcher);

  if (error) return <div>Gagal memuat data</div>;
  if (!data) return <div>Loading...</div>;

  return <div>Nama Situs: {data.sitename}</div>;
}
```

---

## Link

- [[server-and-client-components]]
