---
id: tipe-data-any
aliases: []
tags:
  - typescript
  - any
author: Alipnf
created_at: '2025-04-14'
---

# Tipe Data any

Tipe data any adalah tipe paling fleksibel di TypeScript.  
Dengan any, **variabel bisa diisi nilai apa pun** tanpa pengecekan tipe oleh
TypeScript.

```ts
const person: any = {
  id: 1,
  nama: 'Alif',
  umur: 20,
};

person.alamat = 'Indonesia'; // valid
//walaupun properti alamat tidak dideklarasikan sebelumnya
```
