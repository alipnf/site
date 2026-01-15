---
id: setup-typescript
aliases: []
tags:
  - typescript
  - setup
author: Alipnf
created_at: '2025-03-29'
---

# Setup TypeScript

## Kompilasi ke JavaScript

1. Buat proyek baru dan jalankan perintah berikut:

   ```sh
   npm init
   ```

   Pastikan `type` diatur menjadi `"module"` dalam `package.json`.

2. Instal TypeScript:

   ```sh
   npm install --save-dev typescript
   ```

   **Mengapa menggunakan `--save-dev`?**  
   Karena TypeScript hanya digunakan dalam mode pengembangan, sehingga tidak
   perlu diinstal sebagai dependensi utama.

3. Inisialisasi konfigurasi TypeScript:

   ```sh
   npx tsc --init
   ```

   Ubah properti `module` dalam file `tsconfig.json` menjadi `"ES6"`.

4. Sekarang, Anda dapat mengompilasi file TypeScript (`.ts`) menjadi JavaScript
   (`.js`) dengan:

   ```sh
   npx tsc
   ```

5. Agar hasil kompilasi lebih rapi, atur direktori output di `tsconfig.json`:

   ```json
   {
     "compilerOptions": {
       "outDir": "dist/"
     }
   }
   ```

   Dengan pengaturan ini, semua file `.js` hasil kompilasi akan disimpan di
   folder `dist/`.

## Menjalankan TypeScript Langsung Seperti Node.js

1. Instal `ts-node`:

   ```sh
   npm install --save-dev ts-node
   ```

2. Jalankan file TypeScript tanpa perlu kompilasi manual:

   ```sh
   npx ts-node hello.ts
   ```

   Perintah ini akan langsung mengeksekusi kode TypeScript di konsol seperti
   menggunakan Node.js.
