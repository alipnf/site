---
id: tipe-data-array
aliases: []
tags:
  - typescript
  - array
  - tuple
author: Alipnf
created_at: '2025-04-11'
---

# Tipe Data Array

Array di TypeScript bisa ditulis dengan dua cara:

## 1. Menggunakan Bracket Notation

```ts
const arrayNama: string[] = ['Alif', 'Udin'];
const angka: number[] = [1, 2, 3];
```

Tipe string[] berarti array yang hanya boleh berisi data string. Sama juga
dengan number[], artinya array yang hanya berisi angka.

## 2. Menggunakan Generic Notation

```ts
const bahasa: Array<string> = ['TypeScript', 'JavaScript'];
const nilai: Array<number> = [80, 90, 100];
```

Cara ini pakai `Array<T>` yang disebut generic. Tipe T bisa diganti sesuai
kebutuhan (misalnya string, number, dll).

---

## Tipe data tuple

Tuple mirip seperti array, tapi tipe data dan jumlah elemennya sudah ditentukan
dari awal.

```ts
const tuple: [string, string, string, number] = ['halo', 'ini', 'tuple', 2];
```

Index ke-0 sampai ke-2 harus bertipe string Index ke-3 harus bertipe number
