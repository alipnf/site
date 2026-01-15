---
id: error-handling
aliases: []
tags:
  - nextjs
  - error-handling
author: Alipnf
created_at: '2025-05-17'
---

# Error Handling

## Konsep Dasar

Di Next.js versi 13+ dengan App Router (`/app` directory), error handling
dilakukan dengan membuat file `error.tsx` di dalam folder route. File ini akan
menangkap error yang terjadi di file `page.tsx`, `layout.tsx`, atau
`loading.tsx` dalam folder yang sama.

## Struktur File

```bash
app/
├─ dashboard/
│  ├─ page.tsx
│  ├─ error.tsx

```

## Contoh `error.tsx`

```tsx
'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
      <p className="mb-2">{error.message}</p>
      <button
        onClick={reset}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Try again
      </button>
    </div>
  );
}
```

## Cara Men-trigger Error

Untuk keperluan testing, kamu bisa bikin error manual seperti ini:

```tsx
// app/page-parallel/page.tsx

export default function PageParallel() {
  throw new Error('Intentional Error for Testing');
}
```

## Fungsi `reset()`

Fungsi `reset()` akan mencoba me-render ulang layout dan page dalam satu segmen.
Cocok digunakan saat error-nya masih bisa di-recover, misalnya error fetch data.

## Tips Testing

- `error.tsx` harus berada di folder yang sama dengan file yang menyebabkan
  error
- Wajib pakai `'use client'` di paling atas file `error.tsx`
- Gunakan `error.message` untuk menampilkan pesan error
- Gunakan `reset()` untuk mencoba ulang render
- Restart dev server jika `error.tsx` tidak terdeteksi
