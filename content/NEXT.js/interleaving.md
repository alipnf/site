---
id: interleaving
aliases: []
tags:
  - nextjs
  - server-components
  - client-components
  - interleaving
author: Alipnf
created_at: '2025-03-16'
---

# **Interleaving dalam Server dan Client Components**

Alih-alih menandai semua file sebagai **Client Components** dalam kode di
[[server-components-dan-client-components]], kita dapat mengabstraksikan bagian
kode yang berbeda menjadi **komponen terpisah**, lalu menggabungkannya dalam
satu file utama.

## **Tanpa Interleaving (Semua Client Component)**

Di bawah ini adalah contoh di mana seluruh file ditandai sebagai _Client
Component_:

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

Namun, dalam banyak kasus, tidak semua bagian kode membutuhkan interaktivitas.

## **Dengan Interleaving (Memisahkan Client dan Server Components)**

Kita bisa membagi kode menjadi dua komponen:

- **Komponen Server** untuk elemen statis atau pengambilan data (_fetching_).
- **Komponen Client** hanya untuk bagian yang membutuhkan interaktivitas.

### **File `Home.jsx` (Server Component)**

```tsx
import Counter from './Counter';

export default function Home() {
  return (
    <div>
      <h1>Hello World</h1>
      <Counter />
    </div>
  );
}
```

### **File `Counter.jsx` (Client Component)**

```tsx
'use client';
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  return (
    <>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </>
  );
}
```

## **Kesimpulan**

Dengan pendekatan **interleaving**, kita tidak perlu menandai semua file sebagai
_Client Component_, melainkan hanya bagian yang benar-benar membutuhkannya.

- **Data fetching** dapat dilakukan di **Server Component** untuk performa yang
  lebih baik.
- **Interaktivitas** tetap bisa berjalan dengan **Client Component** yang
  terpisah.

---
