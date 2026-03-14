---
id: island-architecture
aliases: []
tags:
  - astro
  - client-island
  - server-island
author: Alipnf
created_at: "2025-06-27"
---

# Island Architecture

**Island Architecture** di Astro adalah pola di mana hanya bagian-bagian
tertentu dari halaman web yang dibuat interaktif atau dinamis, sementara sisanya
tetap HTML statis.

Contoh bagian yang termasuk "island":

- Komponen yang **interaktif** (misalnya tombol, form, carousel)
- Komponen yang **menampilkan data dinamis** (misalnya hasil fetch dari API)

Terdapat dua jenis island:

## 1. Client Island

- Komponen yang **interaktif**, memerlukan JavaScript dan fitur seperti
  `useState`, `useEffect`, dsb.
- Ditulis dalam file **`.tsx` atau `.jsx`** (bukan `.astro`)
- Akan di-_hydrate_ (diaktifkan) secara **terpisah** di browser menggunakan
  directive seperti `client:load`, `client:visible`, dll. contoh

```tsx
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const decrement = () => {
    setCount((prevCount) => prevCount - 1);
  };
  return (
    <div>
      {count}
      <button onClick={increment}>tambah</button>
      <button onClick={decrement}>kurang</button>
    </div>
  );
}
```

```astro
---
import Layout from '../layouts/Layout.astro';
import Counter from '../components/Counter.tsx';
---

<Layout>
    <h1>hello wolrd</h1>
    <Counter client:load/>
</Layout>
```

## 2. Server Island

- Komponen yang digunakan untuk **menampilkan data dinamis dari server**, tanpa
  interaksi pengguna.
- Ditulis dalam file **`.astro`**
- Tidak di-_hydrate_, hanya dirender di server → lebih cepat dan ringan.

```astro
---
const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3');
const articles = await response.json();
---

<section>
  <h2>Artikel Terbaru</h2>
  <ul>
    {articles.map(article => (
      <li>
        <strong>{article.title}</strong>
        <p>{article.body}</p>
      </li>
    ))}
  </ul>
</section>
```

## Catatan

- **Hydration** adalah proses mengaktifkan kembali HTML statis menggunakan
  JavaScript agar menjadi interaktif di browser.
- Gunakan **Client Island** untuk bagian yang butuh interaksi.
- Gunakan **Server Island** untuk bagian yang hanya menampilkan data, tanpa
  perlu interaktif.
