---
id: route-handler
aliases: []
tags:
  - nextjs
  - route-hanlder
  - routing
author: Alipnf
created_at: '2025-05-14'
---

# Route Hanlder

kita dapat melakukan endpoint masking agar tidak terliat api atau url backendnya
tidak terekpost di client

```tsx
//app/api/user/route.ts
export async function GET() {
  return Response.json({
    message: 'This is /api/user route',
  });
}
```

kita dapat menggunakan route.ts yah mirip mirip dengan cara membuat page.tsx
tetapi jika ada file route.ts dan page.tsx dalam satu folder maka akan
menyenankan konfli

kita juga dapat menamabahkah parameter request untuk melihat detail

```tsx
export async function GET(request: Request) {
  console.log(request.url);
  return Response.json({
    message: 'This is /api/user route',
  });
}
```

Mantap, ini aku lanjutin bagian tambahan buat route handler-nya — biar makin
lengkap catatan kamu. Masih pakai gaya santai kamu juga:

---

## Method Lain di Route Handler

Selain `GET`, kita juga bisa pakai method lain seperti `POST`, `PUT`, `PATCH`,
dan `DELETE`.

### POST

Biasanya dipakai buat _submit_ data (misal form atau create resource).

```tsx
export async function POST(request: Request) {
  const body = await request.json();

  return Response.json({
    message: 'Data berhasil dikirim',
    data: body,
  });
}
```

---

### PATCH

Buat update sebagian data (kayak ubah satu field doang).

```tsx
export async function PATCH(request: Request) {
  const body = await request.json();

  return Response.json({
    message: 'Data berhasil di-update',
    data: body,
  });
}
```

---

### DELETE

Buat hapus data.

```tsx
export async function DELETE() {
  return Response.json({
    message: 'Data berhasil dihapus',
  });
}
```
