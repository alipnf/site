---
id: dynamic-route
aliases: []
tags:
  - routing
  - nextjs
author: Alipnf
created_at: '2025-04-19'
---

# Dynamic Route

Di TypeScript (terutama pada framework seperti Next.js), **dynamic route**
digunakan untuk membuat route yang dinamis, yaitu route yang bisa menerima
parameter yang bervariasi.

Untuk membuat dynamic route, kita cukup mengikuti konvensi penamaan folder
menggunakan tanda kurung kotak `[]` seperti berikut:

---

## Struktur Folder

```bash
└── products
    └── [id]
        └── page.tsx
```

Pada struktur ini, `[id]` menandakan bahwa `id` adalah parameter dinamis yang
bisa berubah sesuai dengan URL yang diminta.

### Contoh kode `page.tsx`

```ts
export default async function Product({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resultParam = await params;
  return <div>{resultParam.id}</div>;
}
```

Jika URL yang diminta adalah `http://localhost:3000/products/helo`, maka halaman
akan menampilkan kata **helo** sesuai dengan `id` yang ada di URL. URL ini bisa
berubah-ubah, dan halaman akan menampilkan nilai yang berbeda-beda berdasarkan
parameter yang diberikan.

---

## Jenis Dynamic Route Lainnya

Next.js juga mendukung bentuk route yang lebih fleksibel lagi:

### 1. `[param]` → Route Dinamis

Digunakan untuk menangkap satu segmen dari URL.

**Contoh Struktur**:

```bash
/pages/blog/[slug].tsx
```

**URL yang cocok**:

- `/blog/nextjs-routing`
- `/blog/react-hooks`

**Akses parameternya**:

```ts
params.slug; // string
```

---

### 2. `[...param]` → Catch-All Route

Digunakan untuk menangkap **banyak segmen sekaligus**.

**Contoh Struktur**:

```bash
/pages/docs/[...slug].tsx
```

**URL yang cocok**:

- `/docs/nextjs`
- `/docs/nextjs/routing`
- `/docs/nextjs/routing/dynamic`

**Akses parameternya**:

```ts
params.slug; // string[]
```

> ⚠️ Wajib ada minimal satu segmen di URL.

---

### 3. `[[...param]]` → Optional Catch-All Route

Sama seperti `[...param]`, tapi bisa juga dipakai di URL **tanpa segmen**
sekalipun.

**Contoh Struktur**:

```bash
/pages/campaign/[[...params]].tsx
```

**URL yang cocok**:

- `/campaign`
- `/campaign/ramadhan`
- `/campaign/ramadhan/2025`

**Akses parameternya**:

```ts
params.params; // string[] | undefined
```

---

## Ringkasan

- **`[slug]`**

  - Dipakai buat **route dinamis biasa**.
  - Contoh URL: `/blog/post1`
  - Nilai `params.slug`: `'post1'`

- **`[...slug]`**

  - Ini disebut **catch-all route**, menangkap semua segmen setelah path
    tersebut.
  - Contoh URL: `/docs/a/b/c`
  - Nilai `params.slug`: `['a', 'b', 'c']`

- **`[[...slug]]`**

  - Ini **optional catch-all**, jadi bisa ada segmen tambahan atau nggak sama
    sekali.
  - Contoh URL: `/campaign` → `params.slug` = `undefined` Contoh lain:
    `/campaign/a/b` → `params.slug` = `['a', 'b']`

---

Dengan fitur-fitur ini, lo bisa bikin struktur route yang fleksibel dan powerful
di Next.js. Kalau pakai **App Router** (`/app` folder), konsepnya sama cuma beda
cara akses param-nya aja.
