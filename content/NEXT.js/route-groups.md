---
id: route-groups
aliases: []
tags:
  - nextjs
  - routing
  - layout
author: Alipnf
created_at: '2025-04-20'
---

# Route Groups

**Route Groups** di Next.js digunakan buat _mengelompokkan route_ agar bisa
menggunakan satu **layout bersama**, tanpa harus nambah direktori atau struktur
URL baru.

kapan digunakan:

- Menggunakan **satu layout** untuk beberapa halaman.
- Tetap mempertahankan **struktur URL yang clean** (tanpa nama folder layout).
- Bikin struktur folder project lebih rapi & modular.

---

## Struktur Folder

```shell
app/
├── (dashboard)/
│   ├── layout.tsx
│   ├── admin/
│   │   └── page.tsx
│   └── user/
│       └── page.tsx
```

Folder (dashboard) adalah route group. Tanda kurung () menandakan bahwa folder
ini tidak akan muncul di URL, tapi isinya tetap berfungsi seperti biasa.

layout.tsx

```tsx
export default function DahboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <p>DahboardLayout </p>
      {children}
    </div>
  );
}
```

page.tsx

```tsx
export default function page() {
  - [ ] return <div>page user / admin</div>;
}
```

jadi nanti `/user` dan `/admin` akan menggunakan layout dari dashboard dan
`/dashboard` tidak akan muncul
