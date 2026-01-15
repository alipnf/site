---
id: parallel-route
aliases: []
tags:
  - nextjs
  - parallel-route
  - routing
author: Alipnf
created_at: '2025-05-07'
---

# Parallel Routes

Di Next.js (App Router), **Parallel Route** digunakan untuk menampilkan beberapa
tampilan sekaligus dalam satu layout, **tanpa harus membuat URL path terpisah**.

Slot paralel menggunakan format `@slotName`, dan diakses di dalam layout
parent-nya sebagai prop.

---

## Struktur Dasar

```bash
/app
  parallel
    layout.tsx       # Layout utama
    @page1
      page.tsx       # Slot page1
    @page2
      page.tsx       # Slot page2
```

---

## Cara Kerja

- Slot seperti `@page1` dan `@page2` **tidak menambahkan segmen URL**.
- Untuk mengaksesnya, cukup buka `/parallel` saja.
- Slot tersebut di-_render_ **bersamaan** di dalam `layout.tsx`.

---

## Contoh layout.tsx

```tsx
// /app/parallel/layout.tsx

export default function ParallelLayout({
  page1,
  page2,
}: {
  page1: React.ReactNode;
  page2: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <aside className="w-1/3 border-r">{page1}</aside>
      <main className="w-2/3">{page2}</main>
    </div>
  );
}
```

---

## Penting

- Lo **tidak bisa** akses `/parallel/page1` atau `/parallel/page2` karena
  `@slot` bukan path URL.
- Kalau butuh path yang bisa dikunjungi langsung, **jangan pakai `@slot`**, tapi
  bikin folder biasa.

---

## Kapan Digunakan?

Parallel Routes cocok digunakan untuk:

- Split-screen layout (misalnya: sidebar + content)
- Dashboard admin
- Aplikasi chat (list chat di kiri, isi chat di kanan)
- Editor dengan panel preview
