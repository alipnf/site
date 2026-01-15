---
id: image
aliases: []
tags:
  - nextjs
  - image
author: Alipnf
created_at: '2025-05-04'
---

# Image

Di Next.js, selain pakai elemen `<img>`, kita juga bisa menggunakan komponen
bawaan `<Image>` dari `next/image`. Komponen ini punya beberapa keuntungan
dibanding tag HTML biasa.

## Kelebihan `next/image`

- **Lazy loading** otomatis
- **Optimasi gambar** secara default
- **Resize otomatis** sesuai device

## Menampilkan Gambar dari Local

```tsx
import Image from 'next/image';
import imageJepang from '@/public/jepang.jpg';

export default function Home() {
  return (
    <div>
      <Image src={imageJepang} alt="Gambar Jepang" />
    </div>
  );
}
```

## Menampilkan Gambar dari URL Eksternal

```tsx
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Image
        src="https://images.unsplash.com/photo-1590796583326-afd3bb20d22d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGFuaW1lfGVufDB8fDB8fHww"
        alt="Anime"
        width={300}
        height={300}
      />
    </div>
  );
}
```

> Kalau pakai gambar dari URL eksternal, wajib menyertakan width dan height, dan
> juga harus diizinkan di file konfigurasi Next.js.

```ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
```

> Konfigurasi ini penting supaya Next.js bisa mengakses dan mengoptimasi gambar
> dari domain tersebut.
