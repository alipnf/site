---
id: optional-properties
aliases: []
tags:
  - typescript
  - optional
  - readonly
author: Alipnf
created_at: '2025-04-17'
---

# Properties

## Optional Properties

Di TypeScript, kita bisa bikin properti dalam object jadi **opsional** alias
boleh ada, boleh nggak.  
Caranya tinggal tambahin tanda `?` setelah nama propertinya.

```ts
type Mahasiswa = {
  nama: string;
  umur?: number; // umur bersifat opsional
};

const mhs1: Mahasiswa = { nama: 'Alif' };
const mhs2: Mahasiswa = { nama: 'Udin', umur: 20 };

console.log(mhs1, mhs2);
```

## Readonly Properties

Selain properti opsional, kita juga bisa bikin properti jadi **readonly** alias
cuma bisa dibaca, gak bisa diubah setelah di-assign.

Caranya cukup tambahin keyword `readonly` sebelum nama propertinya.

```ts
type Buku = {
  readonly id: number;
  judul: string;
};

const buku1: Buku = {
  id: 1,
  judul: 'Belajar TypeScript',
};

buku1.judul = 'Belajar TypeScript Lanjutan'; // ✅ masih bisa diubah
// buku1.id = 2; // ❌ Error: Cannot assign to 'id' because it is a read-only property
```
