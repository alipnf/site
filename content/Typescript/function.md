---
id: function
aliases: []
tags:
  - typescript
  - function
author: Alipnf
created_at: '2025-03-16'
---

# Function

Function di TypeScript memiliki dua bagian penting: **parameter** dan **return
type**.

```ts
function sayHello(helo: string): string {
  return `halo ${helo}`;
}

console.log(sayHello('world'));
```

- helo: string → parameter bertipe string.
- : string setelah tanda kurung → function mengembalikan nilai bertipe string.

## Function dengan void

```ts
function sayHello2(helo: string): void {
  console.log(`${helo}`);
}

sayHello2('helloworld');
```

- Return type void digunakan jika function tidak mengembalikan nilai.
- Cocok digunakan untuk function yang hanya menjalankan side effect, seperti
  console.log.
