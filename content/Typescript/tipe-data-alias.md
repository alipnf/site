---
id: tipe-data-alias
aliases: []
tags:
  - typescript
  - alias
author: Alipnf
created_at: '2025-04-16'
---

# Tipe Data Alias

Tipe data alias digunakan untuk **memberi nama baru pada struktur tipe data**,
terutama saat bekerja dengan objek.  
Dengan alias, kita bisa membuat tipe data yang lebih jelas, reusable, dan rapi —
tanpa harus pakai `any` lagi ([[tipe-data-any]]).

---

## Contoh Penggunaan

```ts
// Membuat alias bernama Person
export type Person = {
  nama: string;
  umur: number;
  alamat: string;
};

// Menggunakan alias sebagai tipe data
const person1: Person = {
  nama: 'Alif',
  umur: 20,
  alamat: 'Indonesia',
};

console.log(person1);
```

## Tipe Data Alias untuk Union

Tipe alias juga bisa digunakan untuk **menyederhanakan union types**  
([[tipe-data-union]]) supaya kode lebih clean dan mudah dipahami.

Contoh:

```ts
type Gaji = string | number | boolean;

let gajiBulanan: Gaji = '5.000.000';
gajiBulanan = 5000000;
gajiBulanan = true;
```
