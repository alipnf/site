---
id: server-and-client-components
aliases: []
tags:
  - nextjs
  - server-components
  - client-components
author: Alipnf
created_at: '2025-03-22'
---

# Server Components dan Client Components

## Server Components

Server Components dirender di server dan mengirimkan hasilnya ke client. Untuk
mengujinya, Anda dapat menambahkan `console.log` di dalam komponen, dan log
tersebut akan muncul di terminal.

```tsx
export default function Home() {
  console.log('render');
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}
```

Contoh log yang muncul di terminal saat rendering:

```bash
✓ Starting...
✓ Ready in 1659ms
○ Compiling / ...
✓ Compiled / in 3.5s
render
render
GET / 200 in 1958ms
GET / 200 in 4071ms
```

### **Keunggulan Server Components**

#### 1. Data Fetching yang Efisien

Server Components memungkinkan data fetching langsung di server, sehingga proses
rendering menjadi lebih cepat dan efisien tanpa perlu request tambahan dari
client.

#### 2. Eksekusi Kode di Server

Server Components dapat langsung mengakses file system dan database tanpa harus
mengirimkan permintaan tambahan dari client.

#### 3. Tidak Menambahkan Ukuran Bundle

Library yang digunakan hanya diproses di server dan tidak dikirimkan ke client,
sehingga ukuran bundle tetap kecil dan performa aplikasi lebih optimal.

---

## Client Components

Client Components digunakan untuk interaktivitas seperti `useState`,
`useEffect`, event handlers, dan lainnya. Singkatnya, Client Components
digunakan ketika kita membutuhkan state atau event listener di dalam komponen.

> **Catatan:** Client Components sebenarnya juga dirender di server, tetapi
> mereka digunakan untuk elemen interaktif di dalam aplikasi.

### **Ilustrasi Perbedaan Server dan Client Components**

![Client vs Server Components](https://belajarfrontend.org/next-js-pragmatis-server-components-client-components/FPgwaSzmmdM6-iGDr9IjXA.webp)

Pada awalnya, elemen interaktif seperti tombol atau form tidak akan bisa diklik
sebelum proses rendering Server Components selesai.

#### **Contoh Kesalahan Menggunakan useState di Server Component**

Jika kita mencoba menggunakan `useState` di dalam Server Component, akan muncul
error:

```tsx
import { useState } from 'react';

export default function Home() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Hello World</h1>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

Output error di terminal:

```bash
> 1 | import { useState } from 'react';
    |          ^^^^^^^^
  2 |
  3 | export default function Home() {
  4 |   const [count, setCount] = useState(0);

"You're importing a component that needs `useState`. This React hook only works
in a client component. To fix, mark the file (or its parent) with the
`use client` directive."
```

Dari error tersebut terlihat bahwa jika ingin menggunakan `useState`, maka
komponen harus ditandai sebagai **Client Component** dengan menambahkan
directive `"use client"` di awal file:

```tsx
'use client';

import { useState } from 'react';

export default function Home() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Hello World</h1>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

## Cara kerja Rendering next.js

dari penjelasan diatas itu ada 2 jenis rendering yang pertama

1. React Server: bekerja di server, dan mengirimkan hasilnya ke client / browser
2. React Client: bekerja di client, dan me render hasil dari react server lalu
   ditampilakn ke pengguna
