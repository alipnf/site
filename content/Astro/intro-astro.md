---
id: intro-astro
aliases: []
tags:
  - astro
author: Alipnf
created_at: "2025-06-26"
---

# Intro Astro

**Astro** adalah framework web untuk membangun **content-driven website**
seperti:

- Blog
- Landing page marketing
- E-commerce

Astro berfokus pada performa dengan mengutamakan **render di server**, dan hanya
mengirim JavaScript ketika benar-benar dibutuhkan melalui pendekatan **Island
Architecture**.

---

## Fitur-fitur Astro

- **Island Architecture**
- **UI agnostic** (mendukung React, Vue, Svelte, Solid, dll)
- **Server-first rendering**
- **Zero JS by default**
- **Content Collections** (untuk pengelolaan konten berbasis file)
- **Customizable** (dengan plugin dan adapter tambahan)

---

## Instalasi

### Buat proyek baru

```bash
pnpm create astro@latest
```

Ikuti wizard CLI untuk memilih template dan konfigurasi awal.

### Tambahkan integrasi (opsional)

- Tambahkan React:

  ```bash
  pnpm astro add react
  ```

- Tambahkan TypeScript plugin:

  ```bash
  pnpm add @astrojs/ts-plugin
  ```

- Tambahkan Prettier dan plugin Astro:

  ```bash
  pnpm add --save-dev --save-exact prettier prettier-plugin-astro
  ```

---

## Struktur Proyek

Proyek yang dihasilkan oleh `create astro` memiliki struktur dasar seperti
berikut:

### Direktori Utama

| Folder / File      | Deskripsi                                                         |
| ------------------ | ----------------------------------------------------------------- |
| `src/`             | Kode utama proyek (komponen, halaman, gambar, style, dsb)         |
| `public/`          | Aset statis (ikon, font, PDF) yang disajikan langsung oleh server |
| `astro.config.mjs` | File konfigurasi utama Astro (**disarankan**)                     |
| `tsconfig.json`    | Konfigurasi TypeScript (**disarankan**)                           |
| `package.json`     | Manifest proyek dan daftar dependensi                             |

---

## Contoh Struktur Folder

```bash
project-root/
├── public/
│   ├── robots.txt
│   ├── favicon.svg
│   └── my-cv.pdf
│
├── src/
│   ├── blog/
│   │   ├── post1.md
│   │   ├── post2.md
│   │   └── post3.md
│   │
│   ├── components/
│   │   ├── Header.astro
│   │   └── Button.jsx
│   │
│   ├── images/
│   │   ├── image1.jpg
│   │   ├── image2.jpg
│   │   └── image3.jpg
│   │
│   ├── layouts/
│   │   └── PostLayout.astro
│   │
│   ├── pages/
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── rss.xml.js
│   │   └── posts/
│   │       └── [post].astro
│   │
│   └── styles/
│       └── global.css
│
├── astro.config.mjs
├── tsconfig.json
└── package.json
```
