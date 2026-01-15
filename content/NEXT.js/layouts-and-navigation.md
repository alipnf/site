---
id: layouts-and-navigation
aliases: []
tags:
  - nextjs
  - pages
  - layouts
  - navigation
author: Alipnf
created_at: '2025-03-23'
---

# **Routing**

Di Next.js, kita tidak perlu mengatur routing secara manual seperti di
`react-router-dom`, karena Next.js sudah menggunakan **file system routing**.
Ini memungkinkan kita membuat route berdasarkan struktur direktori proyek.

## **Pages Routing**

Sebagai contoh, kita bisa membuat halaman `about` di dalam folder `app/`, dengan
file `page.tsx` sebagai entry point:

```plaintext
├── app
│   ├── about
│   │   └── page.tsx
```

Isi file `page.tsx`:

```tsx
export default function About() {
  return <div>About Page</div>;
}
```

Untuk mengakses halaman `about`, cukup buka: <http://localhost:3000/about> Agar
sebuah folder dianggap sebagai route, harus ada file `page.tsx`, `page.js`,
`page.jsx`, atau `page.ts` di dalamnya. Jika tidak, folder tersebut hanya
dianggap sebagai direktori biasa.

## **Nesting Pages**

Sama seperti routing biasa, kita bisa membuat nested route dengan membuat folder
di dalam folder `app/`.

Contoh struktur untuk nested route:

```plaintext
├── app
│   ├── about
│   │   ├── helo
│   │   │   └── page.tsx
│   │   └── page.tsx
```

- `http://localhost:3000/about` → halaman **about**
- `http://localhost:3000/about/helo` → halaman **helo**

## **Layouts**

Layouts adalah komponen yang digunakan sebagai **template** untuk beberapa
halaman. Misalnya:

- Halaman **user** menggunakan **navbar**.
- Halaman **admin** menggunakan **sidebar**.

Dengan menggunakan layout, kita bisa menghindari duplikasi kode dan mengelola
tampilan lebih efisien.

Contoh struktur layout:

```plaintext
├── app
│   ├── layout.tsx
│   ├── page.tsx
│   ├── about
│   │   └── page.tsx
```

Isi file `layout.tsx`:

```tsx
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <nav>Navbar</nav>
      <main>{children}</main>
    </div>
  );
}
```

Dengan ini, semua halaman di dalam `app/` akan menggunakan layout yang sama.

## **Navigation**

Navigasi biasanya menggunakan tag `<a>` untuk menuju halaman, tetapi di Next.js
kita dapat menggunakan `<Link>`. Bedanya, jika menggunakan `<Link>`, maka
langsung menuju halaman tersebut tanpa me-reload browser atau refresh. Proses
ini disebut client-side rendering.

```tsx
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav>
      Navbar:
      <Link href="/">Home</Link>
      {' | '}
      <Link href="/about">About</Link>
    </nav>
  );
}
```
