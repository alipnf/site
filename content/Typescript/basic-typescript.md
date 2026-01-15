---
id: basic-typescript
aliases: []
tags:
  - typescript
  - javascript
author: Alipnf
created_at: '2025-03-16'
---

# TypeScript

## Pengenalan

TypeScript adalah bahasa pemrograman berbasis OOP yang dikembangkan oleh
Microsoft. TypeScript memiliki sistem tipe yang kuat (_strongly typed_) dan
dikompilasi menjadi JavaScript sebelum dijalankan.

## Tipe Data Primitif

Tipe data di TypeScript menggunakan tipe data dari JavaScript. Jadi, tipe
seperti `number`, `string`, dan `boolean` tetap digunakan dan didukung oleh
TypeScript.

## Deklarasi Variabel

- Karena TypeScript adalah bahasa yang _strongly typed_, maka setiap variabel
  yang dibuat sebaiknya ditentukan tipe datanya.
- Setelah tipe data ditentukan, maka tidak boleh diubah menjadi tipe data lain.
- TypeScript juga bisa mendeteksi tipe data secara otomatis (_type inference_),
  tapi kita juga bisa menentukan secara eksplisit. Contohnya:

```ts
const nama: string = 'Alif';
```
