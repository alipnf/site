---
id: intro-tanstack-query
aliases: []
tags: []
author: Alipnf
created_at: "2026-01-03"
---

# TanStack Query

tanstack query adalah sebuah library untuk melakukan fetching, caching,
sinkronisasi, dan pembaruan data server state di aplikasi React. Library ini
sangat berguna untuk mengelola data yang berasal dari server, seperti API, dan
membantu mengurangi kompleksitas dalam pengelolaan state.

ada tiga konsep utama dalam tanstack query:

- Queries: Digunakan untuk mengambil data dari server.
- Mutation: Digunakan untuk mengubah data di server.
- Query Invalidation: Digunakan untuk memperbarui data yang di-cache setelah
  melakukan mutasi.

## Waktunya ngoding

disini aku menggunakan react tepatnya nextjs versi 16.1.1 untuk mencobanya untuk
instalasinya gini

```bash
pnpm create next-app@16.1.1 learn-tanstack-query --yes
cd learn-tanstack-query
pnpm pnpm add @tanstack/react-query @tanstack/eslint-plugin-query
pnpm dev
```

untuk struktur nya nanti seperti ini

```bash
➜ tree
.
├── app
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── eslint.config.mjs

```

oke langkah selanjutnya menambahkan provider seperti di dokumentasi
[tanstak query](https://tanstack.com/query/latest/docs/framework/react/quick-start)

```tsx
// app/page.tsx

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <h1>hello world </h1>
    </QueryClientProvider>
  );
}
```

tetapi ketika mengimplementasinya di next js itu akan error seperti ini

```bash
✓ Compiled in 201ms
 GET / 200 in 314ms (compile: 212ms, render: 102ms)
⨯ Error: Only plain objects, and a few built-ins, can be passed to Client Components from Server Components. Classes or null prototypes are not supported.
  <... client={{}} children={{...}}>
              ^^^^
    at stringify (<anonymous>)
    at stringify (<anonymous>) {
  digest: '3483965277'
}

```

karena secara default next js itu server components sedangkan provides itu
client components jadi untuk solve error ini aku pecah ke kompnen baru
providex.tsx dan menggunakan 'use client' disana

```ts
// app/providers.tsx
'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function Provider({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
```

```ts
// app/page.tsx

import Provider from './provider';

export default function Home() {
  return (
    <Provider>
      <h1>hello world</h1>
    </Provider>
  );
}
```
