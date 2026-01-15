---
id: tipe-data-union
aliases: []
tags:
  - typescript
  - union
author: Alipnf
created_at: '2025-04-14'
---

# Tipe Data Union

Union type digunakan ketika sebuah variabel bisa memiliki lebih dari satu jenis
tipe data.

Di TypeScript, kita bisa menentukan beberapa tipe data sekaligus dengan
menggunakan simbol `|` (pipe).

```ts
let gaji: string | number | boolean = '5.000.000';
console.log(typeof gaji); // string

gaji = 5000000;
console.log(typeof gaji); // number

gaji = true;
console.log(typeof gaji); // boolean
```

output

```shell
string
number
boolean
```
