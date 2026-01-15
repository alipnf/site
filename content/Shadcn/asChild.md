---
id: asChild
aliases: []
tags:
  - shadcn
  - tailwind
  - typescript
  - ui
author: Alipnf
created_at: '2025-05-23'
---

# asChild (shadcn UI)

## Apa itu `asChild`?

`asChild` adalah sebuah prop yang biasa dipakai di komponen shadcn UI seperti
`DropdownMenuTrigger`, `DialogTrigger`, dll. Fungsinya untuk membuat komponen
trigger **menggantikan elemen default** dengan elemen lain yang kita tentukan,
tanpa kehilangan behavior atau event handling dari komponen aslinya.

---

## Kenapa butuh `asChild`?

Biasanya, komponen trigger dari shadcn UI secara default merender elemen HTML
tertentu, misalnya `<button>`. Tapi kalau kita pengen pakai komponen lain
(misal: custom `Button` dari UI kit kita), cukup membungkus trigger dengan
komponen itu gak cukup, karena bisa bikin struktur DOM jadi dobel, atau
event-nya gak jalan.

Dengan `asChild`, komponen trigger akan:

- **Tidak merender elemen defaultnya**,
- **Melainkan "menyuntikkan" behaviornya ke elemen anak yang kita beri**,
- Jadi, elemen anak tersebut bertindak sekaligus sebagai trigger.

---

## Contoh Penggunaan

```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button>Menu</Button>{' '}
    {/* Ini jadi trigger, bukan button bawaan dari DropdownMenuTrigger */}
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Option 1</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

Kalau tanpa `asChild`, `DropdownMenuTrigger` akan render `<button>` sendiri.
Dengan `asChild`, elemen `<Button>` kita yang dipakai sebagai trigger.

---

## Manfaat

- Memudahkan styling dan custom komponen trigger tanpa mengubah behavior asli
- Menghindari nested button atau elemen yang tidak valid secara HTML
- Membuat kode lebih bersih dan konsisten dengan desain sistem UI yang sudah
  dipakai

---

## Catatan Tambahan

- `asChild` biasanya hanya ada di komponen-komponen yang membutuhkan trigger
  atau wrapper khusus
- Jika elemen anak tidak menerima `ref` dan event handler, bisa bikin error atau
  behavior aneh
- Jadi pastikan komponen yang jadi anak bisa menerima `ref` dan forward event
  dengan benar

---

j Sumber:

- [Radix UI - Polymorphic components](https://www.radix-ui.com/docs/primitives/overview/polymorphic-components)
  (shadcn UI dibangun di atas Radix UI)
- Dokumentasi shadcn UI

---

## Kesimpulan

`asChild` itu kayak “mode khusus” supaya kita bisa pakai komponen custom sebagai
trigger tanpa kehilangan fungsi default dari komponen UI shadcn. Cocok banget
buat yang mau styling custom tapi tetap pengen fitur lengkap dari shadcn UI.
