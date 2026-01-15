---
id: git-stash-vs-add
aliases: []
tags:
  - git
  - stash
  - add
author: Alipnf
created_at: '2025-06-01'
---

# Perbedaan `git add` vs `git stash`

Catatan ini menjelaskan perbedaan utama antara `git add` dan `git stash`, serta
kapan sebaiknya menggunakan masing-masing perintah.

---

## `git add`

Digunakan untuk menambahkan perubahan ke **staging area**, yaitu tahap persiapan
sebelum melakukan commit.

- Perubahan tetap ada di **working directory**
- Tidak menyembunyikan perubahan
- Umumnya digunakan sebelum `git commit`

Contoh:

```bash
git add <file>
git add .
```

---

## `git stash`

Digunakan untuk **menyimpan sementara** semua perubahan yang belum di-commit,
baik yang sudah di-_stage_ maupun belum.

- Perubahan disimpan dan **dihilangkan** dari working directory
- Cocok saat ingin menyimpan pekerjaan tanpa commit
- Berguna ketika perlu berpindah branch atau melakukan pull

Contoh:

```bash
git stash
```

---

## Kapan Menggunakan `git stash`

Gunakan `git stash` ketika:

- Ingin pindah branch tapi ada perubahan yang belum di-commit
- Perlu pull perubahan dari remote tanpa kehilangan perubahan lokal
- Ingin menyimpan kerjaan untuk sementara waktu tanpa membuat commit

---

## Perintah Umum `git stash`

```bash
git stash           # Simpan perubahan (staged & unstaged)
git stash list      # Lihat daftar stash yang disimpan
git stash show -p   # Tampilkan isi detail dari stash terakhir
git stash apply     # Ambil perubahan dari stash (tidak menghapus stash)
git stash pop       # Ambil dan hapus stash terakhir
git stash drop      # Hapus stash tertentu
```

---

## Kesimpulan

| Perintah    | Tujuan                            | Perubahan Tetap Ada? | Siap untuk Commit? |
| ----------- | --------------------------------- | -------------------- | ------------------ |
| `git add`   | Menyiapkan perubahan untuk commit | Ya                   | Ya                 |
| `git stash` | Menyimpan sementara perubahan     | Tidak                | Tidak              |

---
