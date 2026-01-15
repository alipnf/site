---
id: middleware
aliases: []
tags:
  - nextjs
  - middleware
  - webdev
author: Alipnf
created_at: '2025-05-16'
---

# Middleware

Middleware di Next.js dipakai buat **intercept request sebelum masuk ke route**.
Ini powerful banget buat:

- Redirect
- Auth check
- Logging
- Rewrite URL
- Cek user-agent, geo, dst.

---

## Dasar Middleware

```ts
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  return NextResponse.next(); // lanjut ke route berikutnya
}
```

---

## Contoh: Redirect dari `/admin` ke `/login`

```ts
export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.get('token');

  if (!isLoggedIn) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*', // hanya aktif di route `/admin`
};
```

---

## `matcher` config

Untuk menentukan URL mana aja yang kena middleware.

```ts
export const config = {
  matcher: ['/admin', '/dashboard/:path*', '/api/private/:path*'],
};
```

Wildcard `:path*` artinya include semua sub-route di dalamnya.

---

## Catatan penting

- Middleware **hanya jalan di server**, bukan client.
- Middleware dieksekusi **sebelum page rendering**.
- Bisa baca cookies, header, query params, dan redirect/rewrite URL.

---

## Use-case umum

- Redirect user yang belum login
- Blok akses berdasarkan role
- Arahkan domain tertentu ke route spesifik
- Tracking/logging user path
- Geo-based redirect
