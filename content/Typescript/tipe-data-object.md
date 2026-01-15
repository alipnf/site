---
id: tipe-data-object
aliases: []
tags:
  - typescript
  - object
author: Alipnf
created_at: '2025-04-16'
---

# Tipe Data Object

Tipe data object cocok digunakan untuk kasus-kasus sederhana,  
jadi gak perlu repot bikin alias type ([[tipe-data-alias]]).

---

## Contoh Penggunaan

```ts
const person1: { nama: string; umur: number } = {
  nama: 'Alif',
  umur: 20,
};

console.log(person1);
```
