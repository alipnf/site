---
id: git-conflict-resolution
aliases: []
tags:
  - git
  - conflict
author: Alipnf
created_at: '2025-06-01'
---

# Git Conflict Resolution

## Kapan Konflik Terjadi?

- Saat melakukan **merge**
- Saat melakukan **rebase**
- Saat melakukan **git stash pop**

---

## Tanda-tanda Konflik

Jika terjadi konflik, Git akan menandai bagian yang bermasalah seperti ini:

```diff
<<<<<<< HEAD
kode lokal
=======
kode remote
>>>>>>> eaf5598 (commit remote)
```

---

## Cara Mengatasi Konflik

1. Buka file yang mengalami konflik.
2. Cari bagian dengan tanda konflik (`<<<<<<<`, `=======`, `>>>>>>>`).
3. Pilih kode yang ingin dipertahankan, bisa kode lokal, kode remote, atau
   gabungan keduanya.
4. Hapus semua tanda konflik tersebut.
5. Simpan perubahan.

---

## Setelah Memperbaiki Konflik

Tambahkan file yang sudah diperbaiki ke staging area:

```bash
git add <file>
```

Kemudian lakukan commit untuk menyelesaikan merge atau rebase:

```bash
git commit
```

---

## Tips Tambahan

- Untuk melihat file mana saja yang konflik, gunakan:

```bash
git status
```

- Untuk membatalkan merge/rebase jika bingung, gunakan:

```bash
git merge --abort
# atau
git rebase --abort
```
