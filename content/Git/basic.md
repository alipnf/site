---
id: basic
aliases: []
tags:
  - basic
  - git
author: Alipnf
created_at: '2025-06-01'
---

# Git Dasar

Catatan ini berisi perintah-perintah dasar Git yang umum digunakan dalam
manajemen versi kode sumber.

---

## 1. Inisialisasi Repository

Digunakan untuk mengubah direktori proyek menjadi repository Git.

```bash
git init
```

Perintah ini akan membuat folder `.git` di dalam direktori proyek yang berisi
semua informasi metadata Git.

---

## 2. Menambahkan File ke Staging Area

Staging area digunakan untuk menyiapkan perubahan sebelum dilakukan commit.

```bash
git add <file>     # Menambahkan file tertentu
git add .          # Menambahkan semua perubahan yang terdeteksi
```

Gunakan `git add .` dengan hati-hati agar tidak menyertakan file yang tidak
diperlukan.

---

## 3. Commit Perubahan

Commit digunakan untuk menyimpan snapshot dari perubahan yang sudah ditambahkan
ke staging area.

```bash
git commit -m "pesan commit"
```

Contoh:

```bash
git commit -m "Menambahkan fitur login"
```

---

## 4. Melihat Status dan Riwayat Commit

Perintah berikut digunakan untuk memantau status file serta riwayat commit.

```bash
git status          # Menampilkan status file (staged, unstaged, untracked)
git log --oneline   # Menampilkan riwayat commit secara ringkas
git log --graph     # Menampilkan riwayat commit dengan visualisasi cabang
```

---

## 5. Konfigurasi Nama dan Email

Pastikan konfigurasi nama dan email sudah diatur sebelum melakukan commit.

```bash
git config --global user.name "Nama Kamu"
git config --global user.email "email@example.com"
```

---

## 6. File .gitignore

Gunakan file `.gitignore` untuk mengecualikan file atau folder tertentu agar
tidak dilacak oleh Git.

Contoh isi `.gitignore`:

```bash
node_modules/
.env
dist/
```
