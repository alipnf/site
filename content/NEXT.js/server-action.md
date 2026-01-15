---
id: server-action
aliases: []
tags:
  - nextjs
  - server-actions
  - forms
author: Alipnf
created_at: '2025-05-10'
---

# Server Action

## Apa itu Server Action?

Server Action adalah fitur di Next.js 13+ yang memungkinkan kita menjalankan
fungsi di server langsung dari komponen React di client, terutama digunakan
untuk menangani pengiriman form tanpa membuat API route terpisah.

---

## Contoh Penggunaan

Berikut adalah contoh sederhana penggunaan Server Action untuk membuat post:

```tsx
export default function CreatePost() {
  async function create(formData: FormData) {
    'use server';

    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const content = formData.get('content') as string;

    console.log(title, slug, content);

    await fetch('http://localhost:3001/post', {
      method: 'POST',
      body: JSON.stringify({ title, slug, content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  return (
    <section className="border border-white p-8">
      <h1 className="text-2xl">Create Post</h1>

      <form action={create}>
        <fieldset>
          <label htmlFor="title" className="block">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="text-black bg-white"
            required
          />
        </fieldset>

        <fieldset>
          <label htmlFor="slug" className="block">
            Slug
          </label>
          <input
            type="text"
            id="slug"
            name="slug"
            className="text-black bg-white"
            required
          />
        </fieldset>

        <fieldset>
          <label htmlFor="content" className="block">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            className="text-black bg-white"
            required
          ></textarea>
        </fieldset>

        <button type="submit" className="bg-blue-500 p-2">
          Create Post
        </button>
      </form>
    </section>
  );
}
```

---

## Penjelasan Penting

### formData.get('key') as string

Fungsi `formData.get()` mengembalikan tipe data berikut:

- `string` jika inputnya adalah text
- `File` jika inputnya adalah file upload
- `null` jika field tidak ditemukan atau kosong

Karena kita tahu bahwa `'title'`, `'slug'`, dan `'content'` berasal dari input
teks dan wajib diisi (`required`), maka aman untuk menggunakan `as string`.

Namun, untuk keamanan runtime, lebih baik lakukan pengecekan:

```ts
const title = formData.get('title');
if (typeof title !== 'string') {
  throw new Error('Invalid title');
}
```

---

## Komentar 'use server'

Baris `'use server'` harus ditambahkan di awal fungsi agar Next.js tahu bahwa
fungsi ini harus dijalankan di server. Fungsi ini tidak akan dijalankan di
browser.

---

## Cache Handling

Secara default, Next.js melakukan caching pada halaman. Jika kamu ingin
memastikan halaman tidak di-cache, tambahkan baris berikut di bagian atas file
page.tsx:

```ts
export const dynamic = 'force-dynamic';
```

Contoh:

```tsx
export const dynamic = 'force-dynamic';

export default function CreatePost() {
  // ...
}
```

Ini berguna ketika kamu ingin selalu mendapatkan data terbaru setelah submit
form.

---

## Kelebihan Server Actions

- Tidak perlu membuat file `/api/...` baru.
- Fungsi hanya dijalankan di server karena adanya `'use server'`.
- Mudah diintegrasikan dengan `<form action={...}>`.
- Otomatis menerima objek `FormData`.

---

## Hal yang Perlu Diperhatikan

- Server Action hanya tersedia di App Router, bukan Pages Router.
- Hanya bisa diakses dari dalam komponen halaman atau module yang di-import oleh
  halaman.
- Tidak semua library bisa digunakan di dalam Server Action (tergantung
  lingkungan eksekusi).

---

## Tips Tambahan: Validasi Form dengan Zod

Untuk validasi form yang lebih kuat, gunakan library seperti Zod:

```ts
import { z } from 'zod';

const schema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  content: z.string().min(10),
});

async function create(formData: FormData) {
  'use server';

  const data = Object.fromEntries(formData.entries());
  const parsed = schema.parse(data); // akan error jika invalid

  await fetch('...', {
    method: 'POST',
    body: JSON.stringify(parsed),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
```

## Memisahkan Server Action ke File Terpisah

Kita dapat memisahkan server action ke file terpisah agar lebih rapi dan
modular. Pastikan `'use server';` ada di baris paling atas file tersebut.

### File: `app/action.ts`

```ts
'use server';

export async function create(formData: FormData) {
  const title = formData.get('title') as string;
  const slug = formData.get('slug') as string;
  const content = formData.get('content') as string;
  console.log(title, slug, content);

  await fetch('http://localhost:3001/post', {
    method: 'POST',
    body: JSON.stringify({ title, slug, content }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
```

### File: `app/create-post/page.tsx`

```tsx
import { create } from '@/app/action';

export default function CreatePost() {
  return (
    <section className="border border-white p-8">
      <h1 className="text-2xl">Create Post</h1>

      <form action={create}>
        <fieldset>
          <label htmlFor="title" className="block">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="text-black bg-white"
            required
          />
        </fieldset>

        <fieldset>
          <label htmlFor="slug" className="block">
            Slug
          </label>
          <input
            type="text"
            id="slug"
            name="slug"
            className="text-black bg-white"
            required
          />
        </fieldset>

        <fieldset>
          <label htmlFor="content" className="block">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            className="text-black bg-white"
            required
          ></textarea>
        </fieldset>

        <button type="submit" className="bg-blue-500 p-2">
          Create Post
        </button>
      </form>
    </section>
  );
}
```

Dengan cara ini, kode menjadi lebih modular, mudah diatur, dan siap untuk reuse
di tempat lain.

## Menampilkan loading

kita dapat menampilkan loading ketika submit form menggunakan `useFormStatus`
contohnya

```tsx
'use client';

import { create } from '@/app/action';
import { useFormStatus } from 'react-dom';

export function CreatePostForm() {
  return (
    <form action={create}>
      <fieldset>
        <label htmlFor="title" className="block">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className="text-black bg-white"
        />
      </fieldset>

      <fieldset>
        <label htmlFor="slug" className="block">
          Slug
        </label>
        <input
          type="text"
          id="slug"
          name="slug"
          className="text-black bg-white"
          required
        />
      </fieldset>

      <fieldset>
        <label htmlFor="content" className="block">
          Content
        </label>
        <textarea
          id="content"
          name="content"
          className="text-black bg-white"
          required
        ></textarea>
      </fieldset>
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  if (pending) {
    return <p>Creating ...</p>;
  }

  return (
    <button type="submit" className="bg-blue-500 p-2">
      Create Post
    </button>
  );
}
```

> catatan hal ini bisa dilakukan hanya ketika didalam Form

## Menampilkan Nilai dari Server Action

Kita bisa menampilkan pesan respon dari Server Action dan juga _loading state_
menggunakan hook yang sama, yaitu `useActionState`. Contohnya seperti berikut:

### Client Component (`CreatePostForm.tsx`)

```tsx
'use client';

import { create } from '@/app/action';
import { useActionState } from 'react';

const initialState = {
  message: '',
};

export function CreatePostForm() {
  const [state, formAction, isPending] = useActionState(create, initialState);

  return (
    <form action={formAction}>
      <fieldset>
        <label htmlFor="title" className="block">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className="text-black bg-white"
        />
      </fieldset>

      <fieldset>
        <label htmlFor="slug" className="block">
          Slug
        </label>
        <input
          type="text"
          id="slug"
          name="slug"
          className="text-black bg-white"
          required
        />
      </fieldset>

      <fieldset>
        <label htmlFor="content" className="block">
          Content
        </label>
        <textarea
          id="content"
          name="content"
          className="text-black bg-white"
          required
        ></textarea>
      </fieldset>

      <SubmitButton pending={isPending} />

      {state?.message && <p>{state.message}</p>}
    </form>
  );
}

function SubmitButton({ pending }: { pending: boolean }) {
  if (pending) {
    return <p>Creating...</p>;
  }

  return (
    <button type="submit" className="bg-blue-500 p-2">
      Create Post
    </button>
  );
}
```

### Server Action (`action.ts`)

```tsx
'use server';

export type CreatePostResponse = {
  message: string;
};

export async function create(
  prevData: CreatePostResponse,
  formData: FormData
): Promise<CreatePostResponse> {
  const title = formData.get('title') as string;
  const slug = formData.get('slug') as string;
  const content = formData.get('content') as string;

  await fetch('http://localhost:3001/post', {
    method: 'POST',
    body: JSON.stringify({ title, slug, content }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return {
    message: 'Berhasil diposting!',
  };
}
```

bisa dilihat structur object initial state mirip dengen action.ts jadi kita bisa
memberikan type seperti ini

```ts
const initialState: CreatePostResponse = {
  message: '',
};
```
