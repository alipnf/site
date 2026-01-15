---
id: tipe-data-enum
aliases: []
tags:
  - typescript
  - enum
author: Alipnf
created_at: '2025-04-17'
---

# Tipe Data Enum

`enum` (enumeration) adalah tipe data khusus di TypeScript yang digunakan untuk
menyimpan sekumpulan nilai konstan yang memiliki nama. Cocok buat data yang
kategorinya tetap, misalnya status user, jenis role, dll.

---

## Contoh Enum Default (Numeric)

```ts
export enum CustomerType {
  REGULAR,
  GOLD,
  PLATINUM,
}

export type Customer = {
  id: number;
  name: string;
  type: CustomerType;
};

const customer1: Customer = {
  id: 1,
  name: 'alif',
  type: CustomerType.GOLD,
};

console.log(customer1);
```

output

```shell
{
  id: 1,
  name: 'alif',
  type: 1
}
```

kenapa hasilnya angka?? Karena enum default di TypeScript adalah numeric enum,
yang otomatis memberikan nilai angka mulai dari 0 ke atas: REGULAR = 0 GOLD = 1
PLATINUM = 2

jika ingin mengkonversikan menjadi string ubah menjadi seperti ini

```ts
export enum CustomerType {
  REGULAR = 'REGULAR',
  GOLD = 'GOLD',
  PLATINUM = 'PLATINUM',
}
```

output

```shell
{
  id: 1,
  name: 'alif',
  type: 'GOLD'
}
```
