---
id: tipe-data-generic
aliases: []
tags:
  - typescript
  - generic
author: Alipnf
created_at: '2025-05-07'
---

# Tipe Generic (Generic Types)

## Definisi

**Tipe generic** adalah fitur TypeScript yang memungkinkan kita membuat komponen
(fungsi, interface, class) yang bekerja dengan **berbagai jenis data** tanpa
mengorbankan keamanan tipe (type safety).

Contoh dasar:

```ts
function identity<T>(value: T): T {
  return value;
}

// Penggunaan
const number = identity<number>(123); // Tipe number
const text = identity<string>('hello'); // Tipe string
```

---

## Sintaks Dasar

### 1. Fungsi Generic

```ts
function example<T>(param: T): T {
  return param;
}
```

- `T` adalah placeholder untuk tipe data yang akan ditentukan saat pemanggilan.

### 2. Interface Generic

```ts
interface Box<T> {
  value: T;
}

// Penggunaan
const numberBox: Box<number> = { value: 42 };
const stringBox: Box<string> = { value: 'text' };
```

### 3. Class Generic

```ts
class Container<T> {
  private item: T;

  constructor(item: T) {
    this.item = item;
  }

  getItem(): T {
    return this.item;
  }
}
```

---

## Kasus Penggunaan

### 1. Array dan Collection

```ts
const numbers: Array<number> = [1, 2, 3];
const strings: Array<string> = ['a', 'b', 'c'];
```

### 2. API Response

```ts
interface ApiResponse<T> {
  data: T;
  status: number;
  success: boolean;
}

async function fetchData<T>(url: string): Promise<ApiResponse<T>> {
  const res = await fetch(url);
  return res.json();
}
```

### 3. Utility Types Bawaan

TypeScript menyediakan generic types bawaan seperti:

- `Promise<T>` → Hasil async
- `Partial<T>` → Semua properti opsional
- `Required<T>` → Semua properti wajib
- `Record<K, T>` → Objek dengan kunci dari `K` dan nilai dari `T`

---

## Keuntungan

1. **Reusable Code**  
   Satu komponen bisa digunakan untuk berbagai tipe data.
2. **Type Safety**  
   Kesalahan tipe terdeteksi saat compile-time.
3. **Menghindari `any`**  
   Mengurangi penggunaan `any` yang tidak aman.

---

## Best Practices

### 1. Gunakan Nama Tipe yang Bermakna

- `T` untuk tipe umum
- `K` untuk kunci (keys)
- `V` untuk nilai (values)
- `E` untuk elemen (elements)

### 2. Batasi Tipe dengan Constraint

Gunakan `extends` untuk membatasi tipe yang diperbolehkan:

```ts
function logLength<T extends { length: number }>(item: T): void {
  console.log(item.length); // Aman karena `length` pasti ada
}
```

### 3. Berikan Default Type

```ts
type ApiResponse<T = unknown> = {
  data: T;
  status: number;
};
```

### 4. Hindari Nested Generics

Gunakan alias tipe untuk menyederhanakan:

```ts
type UserResponse = ApiResponse<User>;
```

---

## Contoh Nyata

### 1. Fungsi Swap (Tukar Nilai)

```ts
function swap<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]];
}

swap([1, 'hello']); // ["hello", 1]
```

### 2. Repository Pattern

```ts
interface Repository<T> {
  findById(id: string): T | null;
  save(item: T): void;
}

class UserRepository implements Repository<User> {
  findById(id: string): User | null {
    /* ... */
  }
  save(user: User): void {
    /* ... */
  }
}
```

---

## Referensi Tambahan

- [TypeScript Generics Docs](https://www.typescriptlang.org/docs/handbook/generics.html)
- [Advanced Generics in TypeScript](https://basarat.gitbook.io/typescript/type-system/generics)

---
