---
id: interface
aliases: []
tags:
  - typescript
  - interface
author: Alipnf
created_at: '2025-04-18'
---

# Interface

`interface` di TypeScript mirip dengan tipe data alias ([[tipe-data-alias]]),
tapi punya beberapa perbedaan penting. Interface digunakan untuk mendeskripsikan
bentuk dari sebuah objek. Ini berguna banget buat menjaga konsistensi struktur
data.

```ts
export interface Person {
  nama: string;
  umur: number;
}

const person1: Person = {
  nama: 'alif',
  umur: 21,
};

console.log(person1);
```

## Function Interface

Function interface digunakan untuk mendefinisikan tipe dari sebuah fungsi.
Berguna jika ingin memastikan fungsi punya parameter dan return type tertentu.

```ts
interface Greet {
  (nama: string): string;
}

const sapa: Greet = (nama) => {
  return `Halo, ${nama}!`;
};

console.log(sapa('Alif')); // Halo, Alif!
```

## indexable interface

digunakan jika ingin membuat objek atau array yang bisa diakses lewat index atau
key tertentu

```ts
interface NamaList {
  [index: number]: string;
}

const teman: NamaList = ['Alif', 'Udin', 'Budi'];

console.log(teman[0]); // Alif
```

Atau contoh untuk objek dengan key string:

```ts
interface NilaiMap {
  [key: string]: number;
}

const nilai: NilaiMap = { matematika: 90, fisika: 85 };

console.log(nilai['fisika']); // 85
```
